import { addHours, parseISO } from 'date-fns'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageEntity } from '../entity/StageEntity'
import {
  Category,
  CategoryGroup,
  Club,
  RaceType,
  Stage,
  StageStatus
} from '../generated/graphql'

export class StageMapper {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  map(stageEntity: StageEntity): Stage {
    const categories = this.database.getAll<Category>(Table.CATEGORIES)
    const clubs = this.database.getAll<Club>(Table.CLUBS)
    return {
      id: stageEntity.id,
      name: stageEntity.name,
      club: clubs.find((c) => c.code === stageEntity.club)!, // TODO ! and club id
      location: stageEntity.location,
      county: stageEntity.county,
      startTime: stageEntity.startTime,
      status: this.mapStatus(stageEntity.startTime),
      type: this.mapType(stageEntity.type),
      mandatory: stageEntity.mandatory,
      categoryGroups: this.mapCategoryGroups(
        stageEntity.categoryGroups,
        categories
      ),
      coordinates: stageEntity.coordinates,
      stravaId: stageEntity.stravaId
    }
  }

  mapAll(stageEntities: StageEntity[]): Stage[] {
    const categories = this.database.getAll<Category>(Table.CATEGORIES)
    const clubs = this.database.getAll<Club>(Table.CLUBS)
    return stageEntities.map((stageEntity) => {
      return {
        id: stageEntity.id,
        name: stageEntity.name,
        club: clubs.find((c) => c.code === stageEntity.club)!, // TODO ! and club id
        location: stageEntity.location,
        county: stageEntity.county,
        startTime: stageEntity.startTime,
        status: this.mapStatus(stageEntity.startTime),
        type: this.mapType(stageEntity.type),
        mandatory: stageEntity.mandatory,
        categoryGroups: this.mapCategoryGroups(
          stageEntity.categoryGroups,
          categories
        ),
        coordinates: stageEntity.coordinates,
        stravaId: stageEntity.stravaId
      }
    })
  }

  private mapStatus(startTime: string): StageStatus {
    const date = new Date()
    const stageDate = parseISO(startTime)
    if (date.getTime() < stageDate.getTime()) {
      return StageStatus.Upcoming
    } else if (date.getTime() < addHours(stageDate, 2).getTime()) {
      return StageStatus.InProgress
    } else {
      return StageStatus.Completed
    }
  }

  private mapType(type: string): RaceType {
    switch (type) {
      case 'CRITERIUM':
        return RaceType.Criterium
      case 'HILL_CLIMB':
        return RaceType.HillClimb
      case 'ROAD_RACE':
        return RaceType.RoadRace
      case 'TIME_TRIAL':
        return RaceType.TimeTrial
      default:
        return RaceType.RoadRace
    }
  }

  private mapCategoryGroups(
    categoryGroups: string,
    categories: Category[]
  ): CategoryGroup[] {
    return categoryGroups.split(',').flatMap((categoryGroup) => {
      return {
        id: categoryGroup,
        categories: categoryGroup.split('+').map(
          (categoryCode) =>
            categories.find((category) => category.code === categoryCode)! // TODO !
        )
      }
    })
  }
}
