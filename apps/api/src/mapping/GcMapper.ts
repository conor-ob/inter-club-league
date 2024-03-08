import { stageNumberFromStageId } from '@inter-club-league/utils'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import {
  Category,
  Club,
  Gc,
  GcRider,
  GcStatus,
  ResultsStatus,
  Stage
} from '../generated/graphql'

export class GcMapper {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public map(
    stageResultEntities: StageResultEntity[],
    stageId: string,
    stages: Stage[]
  ): Gc {
    const categories = this.database.getAll<Category>(Table.CATEGORIES)
    const clubs = this.database.getAll<Club>(Table.CLUBS)
    return {
      id: stageId,
      gcStatus: this.getGcStatus(stageId, stages),
      resultsStatus: ResultsStatus.Completed,
      gcRiders: stageResultEntities
        .map((stageResultEntity) => {
          return {
            id: `${stageId}-${stageResultEntity.riderId}`,
            rider: {
              id: stageResultEntity.riderId,
              name: stageResultEntity.riderName,
              initials: stageResultEntity.riderInitials
            },
            club: clubs.find((c) => c.id === stageResultEntity.clubId)!, // TODO !
            category: categories.find(
              (c) => c.id === stageResultEntity.categoryId
            )!, // TODO !
            gcPoints: this.calculateGcPoints(
              stageResultEntity.seasonPoints,
              stages
            ),
            totalPoints: this.calcualteTotalPoints(
              stageResultEntity.seasonPoints
            ),
            movement: 0
          }
        })
        .sort((a, b) => {
          if (a.gcPoints === b.gcPoints) {
            return a.category.rank - b.category.rank
          } else {
            return b.gcPoints - a.gcPoints
          }
        })
        .map((gcRider, index) => {
          return {
            ...gcRider,
            rank: index + 1
          }
        })
        .reduce((accumulator, gcRider) => {
          if (accumulator.length === 0) {
            accumulator.push({
              ...gcRider,
              position: gcRider.rank.toString()
            })
          } else {
            const previousGcRider = accumulator[accumulator.length - 1]! // TODO !
            if (previousGcRider.gcPoints === gcRider.gcPoints) {
              accumulator[accumulator.length - 1] = {
                ...previousGcRider,
                position: this.getPosition(previousGcRider.position)
              }
              accumulator.push({
                ...gcRider,
                position: this.getPosition(previousGcRider.position)
              })
            } else {
              accumulator.push({
                ...gcRider,
                position: `${gcRider.rank}`
              })
            }
          }
          return accumulator
        }, new Array<GcRider>())
    }
  }

  private getGcStatus(stageId: string, stages: Stage[]): GcStatus {
    if (stageId === stages[stages.length - 1]?.id) {
      return GcStatus.Completed
    } else {
      return GcStatus.InProgress
    }
  }

  private calculateGcPoints(stagePoints: number[], stages: Stage[]): number {
    const mandatoryStageIndexes = stages
      .filter((stage) => stage.mandatory)
      .map((stage) => Number(stageNumberFromStageId(stage.id)) - 1)
      .filter((index) => index < stagePoints.length)

    let mandatoryStagePoints = 0
    for (const index of mandatoryStageIndexes) {
      mandatoryStagePoints = mandatoryStagePoints + stagePoints[index]!
    }

    const otherStagePoints = stagePoints
      .filter((_, index) => !mandatoryStageIndexes.includes(index))
      .sort((a, b) => b - a)
      .slice(0, 11)
      .reduce((a, b) => a + b, 0)

    return mandatoryStagePoints + otherStagePoints
  }

  private calcualteTotalPoints(stagePoints: number[]): number {
    return stagePoints.reduce((a, b) => a + b, 0)
  }

  private getPosition(previousPosition: string): string {
    if (previousPosition.startsWith('T')) {
      return previousPosition
    } else {
      const rank = Number(previousPosition)
      if (rank > 99) {
        return previousPosition
      } else {
        return `T${previousPosition}`
      }
    }
  }
}
