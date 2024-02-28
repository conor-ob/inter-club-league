import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import { StageResults } from '../generated/graphql'
import { StageResultsMapper } from '../mapping/StageResultsMapper'
import { seasonIdFromStageId } from '../utils/ids'
import { GcService } from './GcService'
import { StagesService } from './StagesService'

export class StageResultsService {
  private database: Database
  private stageResultsMapper: StageResultsMapper
  private stagesService: StagesService
  private gcService: GcService

  constructor(
    database: Database,
    stageResultsMapper: StageResultsMapper,
    stagesService: StagesService,
    gcService: GcService
  ) {
    this.database = database
    this.stageResultsMapper = stageResultsMapper
    this.stagesService = stagesService
    this.gcService = gcService
  }

  public getStageResults(stageId: string | null | undefined): StageResults {
    const resolvedStageId = this.resolveStageId(stageId)
    try {
      const stageResultEntities = this.database.getById<StageResultEntity[]>(
        Table.RESULTS,
        resolvedStageId
      )

      const gc = this.gcService.getGc(stageId)

      const stages = this.stagesService.getStages(
        seasonIdFromStageId(resolvedStageId)
      )
      const stageResults = this.stageResultsMapper.map(
        stageResultEntities,
        resolvedStageId,
        stages
      )

      return {
        ...stageResults,
        gcLeaderId: gc.gcRiders[0]?.rider.id ?? ''
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('ENOENT')) {
        const stageResults = this.stageResultsMapper.map(
          [],
          resolvedStageId,
          []
        )
        return {
          ...stageResults,
          gcLeaderId: ''
        }
      } else {
        throw e
      }
    }
  }

  private resolveStageId(stageId: string | null | undefined): string {
    if (stageId === null || stageId === undefined) {
      return this.database.getCurrentStageId()
    } else {
      return stageId
    }
  }
}
