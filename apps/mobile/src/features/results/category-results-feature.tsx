import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import cx from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  View
} from 'react-native'
import { StageResultsHeader } from './stage-results-header'
import { StageRiderRow } from './stage-rider-row'

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
    <ScrollView
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
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <View
              className={cx({
                'py-8': true,
                'px-4': Platform.OS === 'android',
                'px-5': Platform.OS === 'ios'
              })}
            >
              <Skeleton className='h-6' />
            </View>
          )}
          ListHeaderComponent={() => <StageResultsHeader />}
          stickyHeaderIndices={[0]}
        />
      ) : (
        <FlatList
          data={data?.stageResults.categoryResults
            .filter((it) => it.categoryGroup.id === categoryGroupId)
            .flatMap((it) => it.stageRiders)
            .filter((it) => it.points >= 5)}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <StageRiderRow
              stageRider={item}
              gcLeaderId={data?.stageResults.gcLeaderId}
            />
          )}
          ListHeaderComponent={() => <StageResultsHeader />}
          stickyHeaderIndices={[0]}
        />
      )}
    </ScrollView>
  )
}
