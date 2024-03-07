import { Stage, StageStatus } from '@/generated/graphql'
import { format, parseISO } from 'date-fns'
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

  const upcomingByDay = Array.from(
    stages
      .filter((s) => s.stageStatus !== StageStatus.Completed)
      .reduce((accumulator, s) => {
        const yyyymmdd = format(parseISO(s.startTime), 'yyyy-MM-dd')
        let stages = accumulator.get(yyyymmdd)
        if (stages === undefined) {
          stages = [s]
        } else {
          stages = [...stages, s]
        }
        accumulator.set(yyyymmdd, stages)
        return accumulator
      }, new Map<string, Stage[]>())
  ).map(([_, stages]) => {
    return stages
  })

  const nextStages = upcomingByDay.length > 0 ? upcomingByDay[0] : []
  const upcomingStages =
    upcomingByDay.length > 1 ? upcomingByDay.slice(1).flatMap((it) => it) : []

  const upcoming = Array.from(
    upcomingStages
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
  return {
    nextStages: nextStages,
    upcoming: upcoming,
    completed: completed
  }
}
