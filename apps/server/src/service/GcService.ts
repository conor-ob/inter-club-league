import { seasonIdFromStageId } from '@inter-club-league/utils'
import { differenceInHours, isAfter, parseISO } from 'date-fns'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import { Gc, GcStatus, ResultsStatus } from '../generated/graphql'
import { GcMapper } from '../mapping/GcMapper'
import { StagesService } from './StagesService'

export class GcService {
  private database: Database
  private gcMapper: GcMapper
  private stagesService: StagesService

  constructor(
    database: Database,
    gcMapper: GcMapper,
    stagesService: StagesService
  ) {
    this.database = database
    this.gcMapper = gcMapper
    this.stagesService = stagesService
  }

  public getGc(stageId: string): Gc {
    // const stageNumber = Number(stageNumberFromStageId(stageId))
    const stages = this.stagesService.getStages(seasonIdFromStageId(stageId))
    try {
      const stageResultEntities = this.database.getById<StageResultEntity[]>(
        Table.RESULTS,
        stageId
      )

      const gc = this.gcMapper.map(stageResultEntities, stageId, stages)

      if (stageId === stages[0].id) {
        return gc
      } else {
        const currentStageIndex = stages.findIndex((it) => it.id === stageId)
        const previousStageId = stages[currentStageIndex - 1].id
        const previousStageResultEntities = this.database.getById<
          StageResultEntity[]
        >(Table.RESULTS, previousStageId)
        const previousGc = this.gcMapper.map(
          previousStageResultEntities,
          previousStageId,
          stages
        )
        return this.getGcWithMovement(gc, previousGc)
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
          gcStatus: GcStatus.InProgress,
          resultsStatus: resultsStatus,
          gcRiders: []
        }
      } else {
        throw e
      }
    }
  }

  private getGcWithMovement(gc: Gc, previousGc: Gc): Gc {
    return {
      ...gc,
      gcRiders: gc.gcRiders.map((gcRider) => {
        const currentPosition = gcRider.position
        const previousPosition =
          previousGc.gcRiders.find((r) => r.rider.id === gcRider.rider.id)
            ?.position ?? currentPosition
        return {
          ...gcRider,
          movement:
            gcRider.gcPoints === 0
              ? 0
              : this.calculateMovement(previousPosition, currentPosition)
        }
      })
    }
  }

  private calculateMovement(
    previousPosition: string,
    currentPosition: string
  ): number {
    let previousRank = 0
    if (previousPosition.startsWith('T')) {
      previousRank = Number(previousPosition.substring(1))
    } else {
      previousRank = Number(previousPosition)
    }
    let currentRank = 0
    if (currentPosition.startsWith('T')) {
      currentRank = Number(currentPosition.substring(1))
    } else {
      currentRank = Number(currentPosition)
    }
    return previousRank - currentRank
  }
}
