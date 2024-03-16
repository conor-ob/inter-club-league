import { LeaderboardRowV2Resolvers } from '../generated/graphql'

const LeaderboardRowV2: LeaderboardRowV2Resolvers = {
  __resolveType: (object) => {
    const keys = Object.keys(object)
    if (keys.includes('player')) {
      return 'PlayerRowV2'
    } else if (keys.includes('displayText')) {
      return 'InformationRow'
    } else {
      return null
    }
  }
}

export default LeaderboardRowV2
