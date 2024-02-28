import { Database } from '../database/Database'
import { Schedule } from '../generated/graphql'
import { ScheduleMapper } from '../mapping/ScheduleMapper'
import { StagesService } from './StagesService'

export class ScheduleService {
  private database: Database
  private stagesService: StagesService
  private scheduleMapper: ScheduleMapper

  constructor(
    database: Database,
    stagesService: StagesService,
    scheduleMapper: ScheduleMapper
  ) {
    this.database = database
    this.stagesService = stagesService
    this.scheduleMapper = scheduleMapper
  }

  public getSchedule(seasonId: string | null | undefined): Schedule {
    const resolvedSeasonId = this.resolveSeasonId(seasonId)
    const stages = this.stagesService.getStages(resolvedSeasonId)
    return this.scheduleMapper.map(stages, resolvedSeasonId)
  }

  private resolveSeasonId(seasonId: string | null | undefined): string {
    if (seasonId === null || seasonId === undefined) {
      return this.database.getCurrentSeasonId()
    } else {
      return seasonId
    }
  }
}
