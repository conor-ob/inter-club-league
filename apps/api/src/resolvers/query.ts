import { QueryResolvers } from '../generated/graphql'

const Query: QueryResolvers = {
  leaderboardV2: (_, { id }, { pgaTourLeaderboardService }, { operation }) => {
    try {
      return pgaTourLeaderboardService.getLeaderboard(
        id,
        operation.loc?.source.body
      )
    } catch (e) {
      console.log(`Query 'leaderboardV2' failed for leaderboardV2Id=${id}`, e)
      throw e
    }
  },
  tournaments: (_, { ids }, { pgaTourTournamentService }, { operation }) => {
    try {
      return pgaTourTournamentService.getTournaments(
        ids ?? [],
        operation.loc?.source.body
      )
    } catch (e) {
      console.log(`Query 'tournaments' failed for ids=${ids}`, e)
      throw e
    }
  },
  puttingPalsTournaments: (_, __, { puttingPalsScheduleService }, ____) => {
    try {
      return puttingPalsScheduleService.getTournaments()
    } catch (e) {
      console.log(`Query 'puttingPalsSchedule' failed`, e)
      throw e
    }
  },
  redirects: (_, __, { redirectsService }, ____) => {
    try {
      return redirectsService.getRedirects()
    } catch (e) {
      console.log(`Query 'puttingPalsSchedule' failed`, e)
      throw e
    }
  }
}

export { Query }
