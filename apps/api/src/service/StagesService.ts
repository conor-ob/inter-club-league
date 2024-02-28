import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageEntity } from '../entity/StageEntity'
import { Stage } from '../generated/graphql'
import { StageMapper } from '../mapping/StageMapper'

export class StagesService {
  private database: Database
  private stageMapper: StageMapper

  constructor(database: Database, stageMapper: StageMapper) {
    this.database = database
    this.stageMapper = stageMapper
  }

  public getStage(stageId: string): Stage {
    const stageEntity = this.database.getById<StageEntity>(
      Table.STAGES,
      stageId
    )
    return this.stageMapper.map(stageEntity)
  }

  public getStages(seasonId: string | null | undefined): Stage[] {
    const resolvedSeasonId = this.resolveSeasonId(seasonId)
    const stageEntities = this.database.get<StageEntity>(
      Table.STAGES,
      (stageId: string) => stageId.includes(resolvedSeasonId)
    )
    return this.stageMapper
      .mapAll(stageEntities)
      .sort((a, b) => a.number - b.number)
  }

  private resolveSeasonId(seasonId: string | null | undefined): string {
    if (seasonId === null || seasonId === undefined) {
      return this.database.getCurrentSeasonId()
    } else {
      return seasonId
    }
  }
}
