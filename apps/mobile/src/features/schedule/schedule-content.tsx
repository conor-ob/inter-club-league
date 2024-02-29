import { useScheduleQuery } from '@/graphql/use-schedule-query'
import cx from 'classnames'
import { Platform, ScrollView, Text, View } from 'react-native'
import { ScheduleList } from './schedule-list'

export function ScheduleContent() {
  const { data, loading, error } = useScheduleQuery()

  return (
    <ScrollView
      className={cx({
        'mb-8': true,
        'mx-4': Platform.OS === 'android',
        'mx-5': Platform.OS === 'ios'
      })}
    >
      <View className='my-8'>
        {data ? (
          <ScheduleList schedule={data.schedule} />
        ) : (
          <View>
            <Text>Loading</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
