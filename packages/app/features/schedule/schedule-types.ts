import { Stage } from '../../generated/graphql'

export type Schedule = {
  nextStages: Stage[]
  upcoming: ScheduleMonth[]
  completed: ScheduleMonth[]
}

export type ScheduleMonth = {
  displayName: string
  stages: Stage[]
}