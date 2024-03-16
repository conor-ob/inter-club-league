import { Database } from '../database/Database'
import { PuttingPalsTournament } from '../generated/graphql'

export class PuttingPalsScheduleService {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public getTournaments(): PuttingPalsTournament[] {
    return this.database.getTournaments()
  }
}
