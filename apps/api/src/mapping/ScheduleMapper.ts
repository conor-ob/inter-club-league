import { format, parseISO } from 'date-fns'
import { Schedule, Stage, StageStatus } from '../generated/graphql'

export class ScheduleMapper {
  map(stages: Stage[], seasonId: string): Schedule {
    const completed = Array.from(
      stages
        .filter((s) => s.status === StageStatus.Completed)
        .reduce((accumulator, s) => {
          const scheduleMonthId = this.getScheduleMonthId(seasonId, s.startTime)
          let stages = accumulator.get(scheduleMonthId)
          if (stages === undefined) {
            stages = [s]
          } else {
            stages = [...stages, s]
          }
          accumulator.set(scheduleMonthId, stages)
          return accumulator
        }, new Map<string, Stage[]>())
    ).map(([scheduleMonthId, stages]) => {
      return {
        id: scheduleMonthId + '-completed',
        displayName: scheduleMonthId.split('-')[1]!,
        stages: stages
      }
    })
    const upcomingStages = stages.filter(
      (s) => s.status !== StageStatus.Completed
    )
    const upcoming = Array.from(
      (upcomingStages.length > 0
        ? upcomingStages.slice(1)
        : upcomingStages
      ).reduce((accumulator, s) => {
        const scheduleMonthId = this.getScheduleMonthId(seasonId, s.startTime)
        let stages = accumulator.get(scheduleMonthId)
        if (stages === undefined) {
          stages = [s]
        } else {
          stages = [...stages, s]
        }
        accumulator.set(scheduleMonthId, stages)
        return accumulator
      }, new Map<string, Stage[]>())
    ).map(([scheduleMonthId, stages]) => {
      return {
        id: scheduleMonthId + '-upcoming',
        displayName: scheduleMonthId.split('-')[1]!,
        stages: stages
      }
    })
    return {
      id: seasonId,
      completed: completed,
      upcoming: upcoming,
      upcomingStage: upcomingStages.length > 0 ? upcomingStages[0] : null
    }
  }

  private getScheduleMonthId(seasonId: string, startTime: string): string {
    const date = parseISO(startTime)
    return `${seasonId}-${format(date, 'MMMM').toLowerCase()}`
  }
}
