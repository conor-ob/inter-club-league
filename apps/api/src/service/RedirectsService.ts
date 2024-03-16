import { Database } from '../database/Database'
import { Redirects } from '../generated/graphql'

export class RedirectsService {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public getRedirects(): Redirects {
    const tournaments = this.database
      .getTournaments()
      .filter((it) => it.players.length > 0)

    return {
      pgaTourCurrentTournamentId: 'R2023014', // TODO
      puttingPalsCurrentTournamentId: tournaments[tournaments.length - 1]!.id
    }
  }
}
