import { format, parseISO } from 'date-fns'
import { Schedule, Stage, StageStatus } from '../generated/graphql'

export class ScheduleMapper {
  map(stages: Stage[], seasonId: string): Schedule {
    return {
      id: seasonId,
      completed: Array.from(
        stages
          .filter((s) => s.status === StageStatus.Completed)
          .reduce((accumulator, s) => {
            const scheduleMonthId = this.getScheduleMonthId(
              seasonId,
              s.startTime
            )
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
      }),
      upcoming: Array.from(
        stages
          .filter((s) => s.status !== StageStatus.Completed)
          .reduce((accumulator, s) => {
            const scheduleMonthId = this.getScheduleMonthId(
              seasonId,
              s.startTime
            )
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
    }
  }

  private getScheduleMonthId(seasonId: string, startTime: string): string {
    const date = parseISO(startTime)
    return `${seasonId}-${format(date, 'MMMM').toLowerCase()}`
  }
}
