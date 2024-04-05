import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
import { config } from '@inter-club-league/config'
import cors from 'cors'
import { default as compression, default as express } from 'express'
import { readFileSync } from 'fs'
import http from 'http'
import next from 'next'
import path from 'path'
import { parse } from 'url'
import { ServerContext } from './context/ServerContext'
import { Database } from './database/Database'
import { FileReader } from './database/FileReader'
import { GcMapper } from './mapping/GcMapper'
import { StageMapper } from './mapping/StageMapper'
import { StageResultsMapper } from './mapping/StageResultsMapper'
import { resolvers } from './resolvers'
import { GcService } from './service/GcService'
import { MarshallsService } from './service/MarshallsService'
import { RedirectService } from './service/RedirectService'
import { StageResultsService } from './service/StageResultsService'
import { StagesService } from './service/StagesService'

async function startServer() {
  const dev = process.env.NODE_ENV !== 'production'
  const hostname = config.hostname
  const port = config.port

  const server = express()
  const httpServer = http.createServer(server)

  const apolloServer = new ApolloServer<ServerContext>({
    typeDefs: readFileSync(
      path.resolve(process.cwd(), './src/generated/schema.graphql'),
      {
        encoding: 'utf-8'
      }
    ),
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            footer: false
          })
        : ApolloServerPluginLandingPageLocalDefault()
    ]
  })
  await apolloServer.start()

  server.use(compression())
  server.use(
    '/graphql',
    cors({ origin: config.allowedOrigins }),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        const fileReader = new FileReader()
        const database = new Database(fileReader)

        const stageMapper = new StageMapper(database)
        const stageResultsMapper = new StageResultsMapper(database)
        const gcMapper = new GcMapper(database)

        const stagesService = new StagesService(database, stageMapper)
        const gcService = new GcService(database, gcMapper, stagesService)
        const stageResultsService = new StageResultsService(
          database,
          stageResultsMapper,
          stagesService,
          gcService
        )
        const marshallsService = new MarshallsService(database)
        const redirectService = new RedirectService(database, stagesService)

        return {
          gcService: gcService,
          marshallsService: marshallsService,
          stageResultsService: stageResultsService,
          stagesService: stagesService,
          redirectService: redirectService
        }
      }
    })
  )

  const app = next({
    dev,
    hostname,
    port
  })
  const handle = app.getRequestHandler()

  app
    .prepare()
    .then(() => {
      server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        return handle(req, res, parsedUrl)
      })

      httpServer.listen(port, () => {
        console.log(
          `🚀 Server ready at ${
            process.env.NODE_ENV === 'production' ? 'https' : 'http'
          }://${hostname}:${port}`
        )
      })
    })
    .catch((ex) => {
      console.error(ex.stack)
    })

  return server
}

const server = startServer()
export const viteNodeApp = server
