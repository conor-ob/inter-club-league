import { differenceInHours, isAfter, parseISO } from 'date-fns'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import { ResultsStatus, StageResults } from '../generated/graphql'
import { StageResultsMapper } from '../mapping/StageResultsMapper'
import { seasonIdFromStageId } from '../utils/ids'
import { CurrentStageService } from './CurrentStageService'
import { GcService } from './GcService'
import { StagesService } from './StagesService'

export class StageResultsService {
  private database: Database
  private stageResultsMapper: StageResultsMapper
  private stagesService: StagesService
  private gcService: GcService
  private currentStageService: CurrentStageService

  constructor(
    database: Database,
    stageResultsMapper: StageResultsMapper,
    stagesService: StagesService,
    gcService: GcService,
    currentStageService: CurrentStageService
  ) {
    this.database = database
    this.stageResultsMapper = stageResultsMapper
    this.stagesService = stagesService
    this.gcService = gcService
    this.currentStageService = currentStageService
  }

  public getStageResults(stageId: string | null | undefined): StageResults {
    const resolvedStageId = this.resolveStageId(stageId)
    const stages = this.stagesService.getStages(
      seasonIdFromStageId(resolvedStageId)
    )
    try {
      const stageResultEntities = this.database.getById<StageResultEntity[]>(
        Table.RESULTS,
        resolvedStageId
      )

      const gc = this.gcService.getGc(stageId)

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
        const currentStage = stages.find((it) => it.id === resolvedStageId)! // TODO !
        const date = new Date()
        const stageDate = parseISO(currentStage.startTime)
        let resultsStatus = ResultsStatus.Upcoming
        if (
          isAfter(date, stageDate) &&
          differenceInHours(stageDate, date) < 24
        ) {
          resultsStatus = ResultsStatus.AwaitingResults
        }
        return {
          id: resolvedStageId,
          gcLeaderId: '',
          resultsStatus: resultsStatus,
          categoryResults: []
        }
      } else {
        throw e
      }
    }
  }

  private resolveStageId(stageId: string | null | undefined): string {
    if (stageId === null || stageId === undefined) {
      return this.currentStageService.getCurrentStageId()
    } else {
      return stageId
    }
  }
}
