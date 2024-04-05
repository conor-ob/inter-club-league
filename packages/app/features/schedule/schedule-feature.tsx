import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { ScrollView, View, useColorScheme } from 'react-native'
import { Skeleton } from '../../components/loading/skeleton'
import { colors } from '../../design/colors'
import { useStagesQuery } from '../../graphql/use-stages-query'
import { ScheduleList } from './schedule-list'
import { buildSchedule } from './schedule-utils'

export function ScheduleFeature() {
  const colorScheme = useColorScheme()
  const { data, loading, error, refetch } = useStagesQuery(undefined)

  if (data?.stages) {
    return (
      <ScrollView className='px-4 pb-6 pt-2'>
        <ScheduleList schedule={buildSchedule(data?.stages ?? [])} />
      </ScrollView>
    )
  } else {
    return (
      <ScrollView className='px-4 pb-6 pt-2'>
        <SegmentedControl
          values={['Upcoming', 'Completed']}
          enabled={false}
          fontStyle={{
            fontWeight: '500',
            color: colors[colorScheme ?? 'light'].textColorSecondary
          }}
          activeFontStyle={{
            fontWeight: '600',
            color: colors[colorScheme ?? 'light'].textColorPrimary
          }}
        />
        <View className='h-6' />
        <Skeleton className='mx-3 h-5 w-12 rounded-md' />
        <View className='h-3' />
        <Skeleton className='h-40 rounded-xl' />
        <View className='h-6' />
        <Skeleton className='mx-3 h-5 w-12 rounded-md' />
        <View className='h-3' />
        <Skeleton className='h-80 rounded-xl' />
      </ScrollView>
    )
  }
}
