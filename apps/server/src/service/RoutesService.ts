import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { Route } from '../generated/graphql'

export class RoutesService {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public getRoutes(stageId: string): Route[] {
    try {
      return this.database.getById<Route[]>(Table.ROUTES, stageId)
    } catch (e) {
      if (e instanceof Error && e.message.includes('ENOENT')) {
        return []
      } else {
        throw e
      }
    }
  }
}
