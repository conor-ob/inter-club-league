import SegmentedControl from '@react-native-segmented-control/segmented-control'
import {
  differenceInCalendarDays,
  isToday,
  isTomorrow,
  parseISO
} from 'date-fns'
import { useState } from 'react'
import { View, useColorScheme } from 'react-native'
import { CardListHeader } from '../../components/card/card-list-header'
import { colors } from '../../design/colors'
import { ScheduleListCard } from './schedule-list-card'
import { Schedule } from './schedule-types'

type ScheduleListProps = {
  schedule: Schedule
}

export function ScheduleList({ schedule }: ScheduleListProps) {
  const colorScheme = useColorScheme()
  const [selectedIndex, setSelectedIndex] = useState(
    schedule.nextStage || schedule.upcoming.length > 0 ? 0 : 1
  )
  const scheduleMonths =
    selectedIndex === 0 ? schedule.upcoming : schedule.completed

  return (
    <View>
      <SegmentedControl
        values={['Upcoming', 'Completed']}
        fontStyle={{
          fontWeight: '500',
          color: colors[colorScheme ?? 'light'].textColorSecondary
        }}
        activeFontStyle={{
          fontWeight: '600',
          color: colors[colorScheme ?? 'light'].textColorPrimary
        }}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
        }}
      />
      {selectedIndex === 0 &&
        !schedule.nextStage &&
        schedule.upcoming.length === 0 && (
          <View>
            <CardListHeader
              className='mb-2 ml-4 mt-12'
              title='No upcoming stages'
            />
          </View>
        )}
      {selectedIndex === 1 && schedule.completed.length === 0 && (
        <View>
          <CardListHeader
            className='mb-2 ml-4 mt-12'
            title='No completed stages'
          />
        </View>
      )}
      {selectedIndex === 0 && schedule.nextStage && (
        <View>
          <CardListHeader
            className='mb-2 ml-4 mt-12'
            textColor='text-brand'
            title={getUpcomingStageTitle(schedule.nextStage.startTime)}
          />
          <ScheduleListCard stages={[schedule.nextStage]} showInfo={true} />
        </View>
      )}
      {scheduleMonths.map((scheduleMonth) => (
        <View key={scheduleMonth.displayName}>
          <CardListHeader
            className='mb-2 ml-4 mt-12'
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
