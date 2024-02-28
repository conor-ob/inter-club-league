import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import { Gc, GcStatus, StageStatus } from '../generated/graphql'
import { GcMapper } from '../mapping/GcMapper'
import { seasonIdFromStageId, stageNumberFromStageId } from '../utils/ids'
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

  public getGc(stageId: string | null | undefined): Gc {
    const resolvedStageId = this.resolveStageId(stageId)
    const stageNumber = Number(stageNumberFromStageId(resolvedStageId))
    try {
      const stageResultEntities = this.database.getById<StageResultEntity[]>(
        Table.RESULTS,
        resolvedStageId
      )

      const stages = this.stagesService.getStages(
        seasonIdFromStageId(resolvedStageId)
      )
      const gc = this.gcMapper.map(stageResultEntities, resolvedStageId, stages)

      if (stageNumber === 1) {
        return gc
      } else {
        const previousStageNumber = stageNumber - 1
        const previousStageId = `${seasonIdFromStageId(
          resolvedStageId
        )}-${previousStageNumber.toString()}`
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
        return {
          id: resolvedStageId,
          gcStatus: GcStatus.InProgress,
          stageNumber: stageNumber,
          stageStatus: StageStatus.Upcoming,
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

  private resolveStageId(stageId: string | null | undefined): string {
    if (stageId === null || stageId === undefined) {
      return this.database.getCurrentStageId()
    } else {
      return stageId
    }
  }
}
