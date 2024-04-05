import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import {
  Platform,
  RefreshControl,
  ScrollView,
  View,
  useColorScheme
} from 'react-native'
import { createParam } from 'solito'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'
import { useStageFeatureQuery } from '../../graphql/use-stage-feature-query'
import { StageCard } from './stage-card'

const { useParams } = createParam<{
  id: string
}>()

export function StageFeature() {
  const { params } = useParams()
  const colorScheme = useColorScheme()

  const { loading, data, error, refetch } = useStageFeatureQuery({
    stageId: params.id
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  return (
    <ScrollView
      contentContainerClassName={cx({
        'px-4 pt-2 pb-6': Platform.OS === 'web',
        'px-3 py-6': Platform.OS !== 'web'
      })}
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      {data ? (
        <View>
          <StageCard stage={data.stage} />
          <View className='h-6' />
          <StageNavigation baseUrl='/schedule' disabled={loading} />
          <View className='h-6' />
        </View>
      ) : error ? (
        <View></View>
      ) : (
        <View>
          <Skeleton className={cx('h-40 rounded-xl', 'sm:h-32')} />
          <View className='h-6' />
          <StageNavigation baseUrl='/results' disabled={true} />
          <View className='h-6' />
          <Skeleton className='h-64 rounded-xl' />
        </View>
      )}
    </ScrollView>
  )
}
