import {
  seasonIdFromStageId,
  stageNumberFromStageId
} from '@inter-club-league/utils'
import { isAfter, parseISO } from 'date-fns'
import { Database } from '../database/Database'
import { Table } from '../database/Table'
import { Redirects } from '../generated/graphql'
import { StagesService } from './StagesService'

export class RedirectService {
  private database: Database
  private stagesService: StagesService

  constructor(database: Database, stagesService: StagesService) {
    this.database = database
    this.stagesService = stagesService
  }

  public getCurrentSeasonId(): string {
    const seasonIds = this.database
      .getAllIds(Table.STAGES)
      .map((it) => seasonIdFromStageId(it))
      .sort((a, b) => Number(a) - Number(b))
    return seasonIds[seasonIds.length - 1]
  }

  public getRedirects(seasonId: string): Redirects {
    return {
      currentStageId: this.getCurrentStageId(seasonId)
    }
  }

  private getCurrentStageId(seasonId: string): string {
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
}
