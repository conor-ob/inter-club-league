import { format, parseISO } from 'date-fns'
import { Stage, StageStatus } from '../../generated/graphql'
import { Schedule } from './schedule-types'

export function buildSchedule(stages: Stage[]): Schedule {
  const completed = Array.from(
    stages
      .filter((s) => s.stageStatus === StageStatus.Completed)
      .reduce((accumulator, s) => {
        const scheduleMonthId = format(parseISO(s.startTime), 'MMMM')
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
      displayName: scheduleMonthId,
      stages: stages
    }
  })

  const upcoming = Array.from(
    stages
      .filter((s) => s.stageStatus !== StageStatus.Completed)
      .reduce((accumulator, s) => {
        const scheduleMonthId = format(parseISO(s.startTime), 'MMMM')
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
      displayName: scheduleMonthId,
      stages: stages
    }
  })

  const nextStage = upcoming.length > 0 ? upcoming[0]?.stages[0] : undefined

  return {
    nextStage: nextStage,
    upcoming: upcoming.map((it) => {
      return {
        ...it,
        stages: it.stages.filter((it) => it.id !== nextStage?.id)
      }
    }),
    completed: completed
  }
}
