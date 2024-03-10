import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { useRedirectQuery } from '@/graphql/use-redirect-query'
import cx from 'classnames'
import { Redirect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Platform, RefreshControl, Text, View } from 'react-native'

export function GcRedirect() {
  const { data, loading, error, refetch } = useRedirectQuery({
    seasonId: undefined
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

  if (data?.redirects.currentStageId) {
    return <Redirect href={`/(tabs)/gc/${data.redirects.currentStageId}`} />
  }

  return (
    <FlatList
      data={
        loading
          ? [undefined, undefined, undefined, undefined, undefined]
          : [undefined]
      }
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
      ItemSeparatorComponent={() => <CardDivider />}
      keyExtractor={(item, index) =>
        loading ? `loading-${index.toString()}` : `error-${index.toString()}`
      }
      renderItem={({ item }) => {
        return loading ? (
          <View
            className={cx('py-8', {
              'px-4': Platform.OS === 'android',
              'px-5': Platform.OS === 'ios'
            })}
          >
            <Skeleton className='h-4' />
          </View>
        ) : (
          <View>
            <Card>
              <Text className='text-primary px-5 py-6'>
                {JSON.stringify(error, null, 2)}
              </Text>
            </Card>
          </View>
        )
      }}
    />
  )
}
