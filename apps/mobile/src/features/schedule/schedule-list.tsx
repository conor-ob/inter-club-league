import { CardListHeader } from '@/components/card/card-list-header'
import { Schedule } from '@/generated/graphql'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import {
  differenceInCalendarDays,
  isToday,
  isTomorrow,
  parseISO
} from 'date-fns'
import { useState } from 'react'
import { View } from 'react-native'
import { ScheduleListCard } from './schedule-list-card'

type ScheduleListProps = {
  schedule: Schedule
}

export function ScheduleList({ schedule }: ScheduleListProps) {
  const [selectedIndex, setSelectedIndex] = useState(
    schedule.upcomingStage || schedule.upcoming.length > 0 ? 0 : 1
  )
  const scheduleMonths =
    selectedIndex === 0 ? schedule.upcoming : schedule.completed

  return (
    <View>
      <SegmentedControl
        values={['Upcoming', 'Completed']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
        }}
      />
      {selectedIndex === 0 && schedule.upcomingStage && (
        <View>
          <CardListHeader
            className='mb-2 ml-4 mt-6'
            textColor='text-brand'
            title={getUpcomingStageTitle(schedule.upcomingStage.startTime)}
          />
          <ScheduleListCard stages={[schedule.upcomingStage]} />
        </View>
      )}
      {scheduleMonths.map((scheduleMonth) => (
        <View key={scheduleMonth.id}>
          <CardListHeader
            className='mb-2 ml-4 mt-6'
            title={scheduleMonth.displayName.toUpperCase()}
          />

          <ScheduleListCard stages={scheduleMonth.stages} />
        </View>
      ))}
    </View>
  )
}

function getUpcomingStageTitle(startTime: string): string {
  const stageDate = parseISO(startTime)
  if (isToday(stageDate)) {
    return 'TODAY'
  } else if (isTomorrow(stageDate)) {
    return 'TOMORROW'
  }

  const days = differenceInCalendarDays(stageDate, new Date())
  if (days < 8) {
    return `IN ${days} DAYS`
  } else {
    return 'NEXT STAGE'
  }
}
