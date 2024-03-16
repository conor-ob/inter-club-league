import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageResultEntity } from '../entity/StageResultEntity'
import {
  Category,
  Club,
  ResultsStatus,
  Stage,
  StageResults
} from '../generated/graphql'

export class StageResultsMapper {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  map(
    stageResultEntities: StageResultEntity[],
    stageId: string,
    stages: Stage[]
  ): StageResults {
    const categories = this.database.getAll<Category>(Table.CATEGORIES)
    const clubs = this.database.getAll<Club>(Table.CLUBS)
    const stage = stages.find((s) => s.id === stageId)! // TODO !
    return {
      id: stageId,
      gcLeaderId: '',
      resultsStatus: ResultsStatus.Completed,
      categoryResults: stage.categoryGroups.map((c) => {
        return {
          id: `${stageId}-${c.id}`,
          categoryGroup: c,
          stageRiders: stageResultEntities
            .filter((stageResultEntity) =>
              c.categories
                .map((cat) => cat.id)
                .includes(stageResultEntity.categoryId)
            )
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
                )!, // TODO !,
                points: stageResultEntity.stagePoints,
                position: ''
              }
            })
            .sort((a, b) => {
              if (a.points === b.points) {
                return a.category.rank - b.category.rank
              } else {
                return b.points - a.points
              }
            })
            .map((stageResultEntity) => {
              return {
                ...stageResultEntity,
                position: this.getPosition(stageResultEntity.points)
              }
            })
        }
      })
    }
  }

  private getPosition(points: number): string {
    if (points === 11) {
      return '1'
    } else if (points === 10) {
      return '2'
    } else if (points === 9) {
      return '3'
    } else if (points === 8) {
      return '4'
    } else if (points === 7) {
      return '5'
    } else if (points === 6) {
      return '6'
    } else {
      return '-'
    }
  }
}
