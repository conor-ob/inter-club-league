import { LeaderboardV2 } from '../generated/graphql'
import { PgaTourApiService } from './PgaTourApiService'
import { PgaTourTournamentService } from './PgaTourTournamentService'

export class PgaTourLeaderboardService {
  private pgaTourApiService: PgaTourApiService
  private pgaTourTournamentService: PgaTourTournamentService

  constructor(
    pgaTourApiService: PgaTourApiService,
    pgaTourTournamentService: PgaTourTournamentService
  ) {
    this.pgaTourApiService = pgaTourApiService
    this.pgaTourTournamentService = pgaTourTournamentService
  }

  public getLeaderboard(
    leaderboardV2Id: string,
    query?: string
  ): LeaderboardV2 {
    const result = this.pgaTourApiService.post(
      JSON.stringify({
        query: query,
        variables: { leaderboardV2Id: leaderboardV2Id }
      })
    )
    const leaderboardV2 = result.leaderboardV2 as LeaderboardV2
    return {
      ...leaderboardV2,
      players: leaderboardV2.players.map((p) => {
        if (p.__typename === 'InformationRow') {
          return {
            ...p
          }
        } else {
          return {
            ...p,
            id: `${leaderboardV2Id}-${p.id}`
          }
        }
      }),
      winner: leaderboardV2.winner
        ? {
            ...leaderboardV2.winner,
            id: `${leaderboardV2Id}-${leaderboardV2.winner.id}`
          }
        : undefined
    }
  }

  private resolveTournamentId(tournamentId: string | null | undefined) {
    if (tournamentId === null || tournamentId == undefined) {
      return this.pgaTourTournamentService.getCurrentTournamentId()
    } else {
      return tournamentId
    }
  }
}
