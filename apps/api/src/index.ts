import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
import { config } from '@turbostack/config'
import cors from 'cors'
import express from 'express'
import { readFileSync } from 'fs'
import http from 'http'
import path from 'path'
import { ServerContext } from './context/ServerContext'
import { Database } from './database/Database'
import { resolvers } from './resolvers'
import { PgaTourApiService } from './service/PgaTourApiService'
import { PgaTourLeaderboardService } from './service/PgaTourLeaderboardService'
import { PgaTourTournamentService } from './service/PgaTourTournamentService'
import { PuttingPalsScheduleService } from './service/PuttingPalsScheduleService'
import { RedirectsService } from './service/RedirectsService'

async function bootstrap() {
  const database = new Database()
  const redirectsService = new RedirectsService(database)
  const pgaTourApiService = new PgaTourApiService(
    'https://orchestrator.pgatour.com/graphql',
    'da2-gsrx5bibzbb4njvhl7t37wqyl4'
  )
  const pgaTourTournamentService = new PgaTourTournamentService(
    pgaTourApiService
  )
  const pgaTourLeaderboardService = new PgaTourLeaderboardService(
    pgaTourApiService,
    pgaTourTournamentService
  )
  const puttingPalsScheduleService = new PuttingPalsScheduleService(database)

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer<ServerContext>({
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
        : ApolloServerPluginLandingPageLocalDefault(),
      {
        async requestDidStart(requestContext) {
          if (requestContext.request.operationName !== 'IntrospectionQuery') {
            console.log(
              JSON.stringify(
                {
                  query: requestContext.request.operationName,
                  variables: requestContext.request.variables
                },
                null,
                2
              )
            )
          }
        }
      }
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
          return callback(null, true) // TODO fix cors
        } else {
          return callback(null, true)
        }
      }
    }),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        pgaTourLeaderboardService: pgaTourLeaderboardService,
        pgaTourTournamentService: pgaTourTournamentService,
        puttingPalsScheduleService: puttingPalsScheduleService,
        redirectsService: redirectsService
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
