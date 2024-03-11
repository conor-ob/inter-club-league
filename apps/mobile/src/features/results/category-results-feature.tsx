import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import cx from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Platform, RefreshControl, Text, View } from 'react-native'
import { StageResultsHeader } from './stage-results-header'
import { StageRiderComponent } from './stage-rider-component'

export function CategoryResultsFeature() {
  const { stageId, categoryGroupId } = useLocalSearchParams<{
    stageId: string
    categoryGroupId: string
  }>()
  const { data, loading, error, refetch } = useStageResultsQuery(stageId)
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
    <FlatList
      data={
        loading
          ? [undefined, undefined, undefined, undefined, undefined]
          : data
            ? data?.stageResults.categoryResults
                .filter((it) => it.categoryGroup.id === categoryGroupId)
                .flatMap((it) => it.stageRiders)
                .filter((it) => it.points >= 5)
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
        loading ? `loading-${index.toString()}` : data ? item.id : 'error'
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
        ) : data ? (
          <StageRiderComponent
            stageRider={item}
            gcLeaderId={data?.stageResults.gcLeaderId}
          />
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
      ListHeaderComponent={() => <StageResultsHeader />}
      stickyHeaderIndices={[0]}
    />
  )
}
