import { Tournament } from '../generated/graphql'
import { PgaTourApiService } from './PgaTourApiService'

export class PgaTourTournamentService {
  private pgaTourApiService: PgaTourApiService

  constructor(pgaTourApiService: PgaTourApiService) {
    this.pgaTourApiService = pgaTourApiService
  }

  public getTournaments(ids: string[], query?: string): Tournament[] {
    const result = this.pgaTourApiService.post(
      JSON.stringify({
        query: query,
        variables: { ids: ids }
      })
    )
    return result.tournaments as Tournament[]
  }

  public getCurrentTournamentId() {
    throw new Error('TODO')
  }

  private resolveTournamentId(tournamentId: string | null | undefined) {
    if (tournamentId === null || tournamentId == undefined) {
      return this.getCurrentTournamentId()
    } else {
      return tournamentId
    }
  }
}
