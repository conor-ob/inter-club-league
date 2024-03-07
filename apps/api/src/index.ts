import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
import { config } from '@inter-club-league/config'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { ServerContext } from './context/ServerContext'
import { Database } from './database/Database'
import { FileReader } from './database/FileReader'
import { GcMapper } from './mapping/GcMapper'
import { StageMapper } from './mapping/StageMapper'
import { StageResultsMapper } from './mapping/StageResultsMapper'
import { resolvers } from './resolvers'
import { CurrentStageService } from './service/CurrentStageService'
import { GcService } from './service/GcService'
import { MarshallsService } from './service/MarshallsService'
import { StageResultsService } from './service/StageResultsService'
import { StagesService } from './service/StagesService'

async function bootstrap() {
  const fileReader = new FileReader()
  const database = new Database(fileReader)

  const stageMapper = new StageMapper(database)
  const stageResultsMapper = new StageResultsMapper(database)
  const gcMapper = new GcMapper(database)

  const currentStageService = new CurrentStageService(database)
  const stagesService = new StagesService(
    database,
    stageMapper,
    currentStageService
  )
  const gcService = new GcService(
    database,
    gcMapper,
    stagesService,
    currentStageService
  )
  const stageResultsService = new StageResultsService(
    database,
    stageResultsMapper,
    stagesService,
    gcService,
    currentStageService
  )
  const marshallsService = new MarshallsService(database)

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer<ServerContext>({
    typeDefs: fileReader.readFile('./src/generated/schema.graphql'),
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
  await server.start()

  app.use(
    config.graphqlEndpoint,
    cors({
      origin: function (origin, callback) {
        if (!origin) {
          // allow requests with no origin
          return callback(null, true)
        } else if (config.allowedOrigins.indexOf(origin) === -1) {
          return callback(null, false)
        } else {
          return callback(null, false)
        }
      }
    }),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        gcService: gcService,
        marshallsService: marshallsService,
        stageResultsService: stageResultsService,
        stagesService: stagesService
      })
    })
  )

  if (process.env.NODE_ENV === 'production') {
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: config.graphqlPort }, resolve)
    )
  }

  console.log(`🚀 Server ready at ${config.graphqlUri}`)

  return app
}

const app = bootstrap()
export const viteNodeApp = app
