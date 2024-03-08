import {
  seasonIdFromStageId,
  stageNumberFromStageId
} from '@inter-club-league/utils'
import { isAfter, parseISO } from 'date-fns'
import { sync } from 'globby'
import path from 'path'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StageEntity } from '../entity/StageEntity'

export class CurrentStageService {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public getCurrentGcStageId(): string | undefined {
    const currentSeasonId = this.getCurrentSeasonId()
    const stageIds = this.getAllIds(Table.RESULTS)
      .filter((it) => it.includes(currentSeasonId))
      .sort((a, b) => {
        const aSort =
          Number(stageNumberFromStageId(a)) < 10
            ? `${seasonIdFromStageId(a)}-0${stageNumberFromStageId(a)}`
            : a
        const bSort =
          Number(stageNumberFromStageId(b)) < 10
            ? `${seasonIdFromStageId(b)}-0${stageNumberFromStageId(b)}`
            : b
        return aSort.localeCompare(bSort)
      })
    if (stageIds.length > 0) {
      return stageIds[stageIds.length - 1]! // TODO !
    } else {
      return undefined
    }
  }

  public getCurrentStageId(): string {
    const currentSeasonId = this.getCurrentSeasonId()
    const stageEntities = this.database.get<StageEntity>(
      Table.STAGES,
      (stageId: string) => stageId.includes(currentSeasonId)
    )
    const completedStages = stageEntities.filter((it) => {
      const date = new Date()
      const stageDate = parseISO(it.startTime)
      return isAfter(date, stageDate)
    })
    if (completedStages.length === 0) {
      return stageEntities.sort((a, b) => {
        const aSort =
          Number(stageNumberFromStageId(a.id)) < 10
            ? `${seasonIdFromStageId(a.id)}-0${stageNumberFromStageId(a.id)}`
            : a.id
        const bSort =
          Number(stageNumberFromStageId(b.id)) < 10
            ? `${seasonIdFromStageId(b.id)}-0${stageNumberFromStageId(b.id)}`
            : b.id
        return aSort.localeCompare(bSort)
      })[0].id
    }
    return completedStages.sort((a, b) => {
      const aSort =
        Number(stageNumberFromStageId(a.id)) < 10
          ? `${seasonIdFromStageId(a.id)}-0${stageNumberFromStageId(a.id)}`
          : a.id
      const bSort =
        Number(stageNumberFromStageId(b.id)) < 10
          ? `${seasonIdFromStageId(b.id)}-0${stageNumberFromStageId(b.id)}`
          : b.id
      return aSort.localeCompare(bSort)
    })[completedStages.length - 1].id
  }

  public getCurrentSeasonId(): string {
    const stageIds = this.getAllIds(Table.STAGES).sort((a, b) => {
      const aSort =
        Number(stageNumberFromStageId(a)) < 10
          ? `${seasonIdFromStageId(a)}-0${stageNumberFromStageId(a)}`
          : a
      const bSort =
        Number(stageNumberFromStageId(b)) < 10
          ? `${seasonIdFromStageId(b)}-0${stageNumberFromStageId(b)}`
          : b
      return aSort.localeCompare(bSort)
    })
    return seasonIdFromStageId(stageIds[stageIds.length - 1]!) // TODO !
  }

  private getAllIds(table: string): string[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths.map((it) =>
      it.substring(it.lastIndexOf('/') + 1, it.lastIndexOf('.'))
    )
  }
}
