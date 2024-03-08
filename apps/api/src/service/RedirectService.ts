import {
  seasonIdFromStageId,
  stageNumberFromStageId
} from '@inter-club-league/utils'
import { isAfter, parseISO } from 'date-fns'
import { sync } from 'globby'
import path from 'path'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { StagesService } from './StagesService'

export class RedirectService {
  private database: Database
  private stagesService: StagesService

  constructor(database: Database, stagesService: StagesService) {
    this.database = database
    this.stagesService = stagesService
  }

  public getCurrentGcStageId(seasonId: string): string | null {
    const stageResultsIds = this.database
      .getIds(Table.RESULTS, (value: string) => value.includes(seasonId))
      .sort(
        (a, b) =>
          Number(stageNumberFromStageId(a)) - Number(stageNumberFromStageId(b))
      )

    if (stageResultsIds.length > 0) {
      return stageResultsIds[stageResultsIds.length - 1]
    } else {
      return null
    }
  }

  getCurrentResultsStageId(seasonId: string): string {
    const stages = this.stagesService.getStages(seasonId)

    const completedStages = stages.filter((it) => {
      const date = new Date()
      const stageDate = parseISO(it.startTime)
      return isAfter(date, stageDate)
    })

    if (completedStages.length === 0) {
      return stages.sort(
        (a, b) =>
          Number(stageNumberFromStageId(a.id)) -
          Number(stageNumberFromStageId(b.id))
      )[0].id
    } else {
      return completedStages.sort(
        (a, b) =>
          Number(stageNumberFromStageId(a.id)) -
          Number(stageNumberFromStageId(b.id))
      )[completedStages.length - 1].id
    }
  }

  public getCurrentSeasonId(): string {
    const seasonIds = this.getAllIds(Table.STAGES)
      .map((it) => seasonIdFromStageId(it))
      .sort((a, b) => Number(a) - Number(b))
    return seasonIds[seasonIds.length - 1]
  }

  private getAllIds(table: string): string[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths.map((it) =>
      it.substring(it.lastIndexOf('/') + 1, it.lastIndexOf('.'))
    )
  }
}
