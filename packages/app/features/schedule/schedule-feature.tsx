import { View } from 'react-native'
import { useStagesQuery } from '../../graphql/use-stages-query'
import { ScheduleList } from './schedule-list'
import { buildSchedule } from './schedule-utils'

export function ScheduleFeature() {
  const { data, loading, error, refetch } = useStagesQuery(undefined)

  if (data?.stages) {
    return (
      <View className='bg-background flex-1 px-4 py-6'>
        <ScheduleList schedule={buildSchedule(data?.stages ?? [])} />
      </View>
    )
  } else {
    return <View className='flex-1'></View>
  }
}
