import { seasonIdFromStageId } from '@inter-club-league/utils'
import { differenceInHours, isAfter, parseISO } from 'date-fns'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import { ResultsStatus, StageResults } from '../generated/graphql'
import { StageResultsMapper } from '../mapping/StageResultsMapper'
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

  public getStageResults(stageId: string): StageResults {
    const stages = this.stagesService.getStages(seasonIdFromStageId(stageId))
    try {
      const stageResultEntities = this.database.getById<StageResultEntity[]>(
        Table.RESULTS,
        stageId
      )

      const gc = this.gcService.getGc(stageId)

      const stageResults = this.stageResultsMapper.map(
        stageResultEntities,
        stageId,
        stages
      )

      return {
        ...stageResults,
        gcLeaderId: gc.gcRiders[0]?.rider.id ?? ''
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('ENOENT')) {
        const currentStage = stages.find((it) => it.id === stageId)! // TODO !
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
          id: stageId,
          gcLeaderId: '',
          resultsStatus: resultsStatus,
          categoryResults: []
        }
      } else {
        throw e
      }
    }
  }
}
