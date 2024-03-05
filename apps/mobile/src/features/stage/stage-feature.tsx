import { StageNavigation } from '@/components/navigation/stage-navigation'
import { useStageQuery } from '@/graphql/use-stage-query'
import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import cx from 'classnames'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useColorScheme
} from 'react-native'

export function StageFeature() {
  const { id } = useGlobalSearchParams<{ id: string }>()
  const colorScheme = useColorScheme()
  const { data, loading, error, refetch } = useStageQuery(id)
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

  const item = data?.stage

  return (
    <ScrollView
      className={cx({
        'px-4': Platform.OS === 'android',
        'px-5': Platform.OS === 'ios'
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
      <View className='py-8'>
        <View className='-mx-4 py-4'>
          <StageNavigation baseUrl='/(tabs)/schedule' stageId={id} />
        </View>

        {data && (
          <Text className='text-primary'>
            {JSON.stringify(data.stage.id, null, 2)}
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

function getRaceIcon(
  type: string
): React.ComponentProps<typeof Ionicons>['name'] {
  switch (type) {
    case 'CRITERIUM':
      return 'flag-outline'
    case 'HILL_CLIMB':
      return 'trending-up-outline'
    case 'TIME_TRIAL':
      return 'stopwatch-outline'
    default:
      return 'bicycle-outline'
  }
}

function getRaceType(type: string): string {
  switch (type) {
    case 'CRITERIUM':
      return 'Criterium'
    case 'HILL_CLIMB':
      return 'Hill Climb'
    case 'TIME_TRIAL':
      return 'Time Trial'
    default:
      return 'Road Race'
  }
}
