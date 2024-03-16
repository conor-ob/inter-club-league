import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageMarshalls } from '../generated/graphql'

export class MarshallsService {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public getMarshalls(stageId: string): StageMarshalls {
    try {
      return {
        id: stageId,
        marshalls: this.database
          .getById<string[]>(Table.MARSHALLS, stageId)
          .sort()
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('ENOENT')) {
        return {
          id: stageId,
          marshalls: []
        }
      } else {
        throw e
      }
    }
  }
}
