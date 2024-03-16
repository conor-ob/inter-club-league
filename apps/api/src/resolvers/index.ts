import { Resolvers } from '../generated/graphql'
import LeaderboardRowV2 from './leaderboardRowV2'
import { Query } from './query'

const resolvers: Resolvers = { Query, LeaderboardRowV2 }

export { resolvers }
