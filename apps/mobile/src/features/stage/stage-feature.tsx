import { useStageQuery } from '@/graphql/use-stage-query'
import cx from 'classnames'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native'

export function StageFeature() {
  const params = useGlobalSearchParams()
  const { data, loading, error, refetch } = useStageQuery(
    parseStageId(params.id)
  )
  const [refreshing, setRefreshing] = useState(false)

  console.log('data=' + JSON.stringify(data))

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
        {data && (
          <Text className='text-primary'>
            {JSON.stringify(data.stage.id, null, 2)}
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

function parseStageId(id: string | string[] | undefined): string | undefined {
  if (typeof id === 'string') {
    return id
  }
  return undefined
}
