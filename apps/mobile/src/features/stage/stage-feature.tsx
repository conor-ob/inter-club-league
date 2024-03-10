import { Card } from '@/components/card/card'
import { Skeleton } from '@/components/loaders/skeleton'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { RefreshScrollView } from '@/components/views/refresh-scroll-view'
import { useStageFeatureQuery } from '@/graphql/use-stage-feature-query'
import cx from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import { Platform, Text, View } from 'react-native'
import { StageInfo } from './stage-info'
import { StageMap } from './stage-map'
import { StageMarshalls } from './stage-marshalls'

export function StageFeature() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, loading, error, refetch } = useStageFeatureQuery({
    seasonId: undefined,
    stageId: id
  })

  return (
    <RefreshScrollView loading={loading} onRefetch={() => refetch()}>
      <View
        className={cx('py-8', {
          'px-4': Platform.OS === 'android',
          'px-5': Platform.OS === 'ios'
        })}
      >
        {loading ? (
          <View>
            <StageNavigation baseUrl='/(tabs)/schedule' />
            <View className='h-6' />
            <Skeleton className='h-48' />
          </View>
        ) : data ? (
          <View>
            <StageNavigation baseUrl='/(tabs)/schedule' />
            <View>
              <View className='h-6' />
              <StageInfo stage={data.stage} />
            </View>
            {data?.stage.coordinates && (
              <View>
                <View className='h-6' />
                <StageMap stage={data.stage} />
              </View>
            )}
            {data?.marshalls.marshalls.length > 0 && (
              <View>
                <View className='h-6' />
                <StageMarshalls marshalls={data.marshalls.marshalls} />
              </View>
            )}
          </View>
        ) : (
          <View>
            <Card>
              <Text className='text-primary px-5 py-6'>
                {JSON.stringify(error, null, 2)}
              </Text>
            </Card>
          </View>
        )}
      </View>
    </RefreshScrollView>
  )
}
