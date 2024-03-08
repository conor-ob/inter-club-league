import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { ResultsStatus } from '@/generated/graphql'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { CategoryResultsListItem } from './category-results-list-item'

export function ResultsFeature() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, loading, error, refetch } = useStageResultsQuery(id)
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
      className='px-5 py-8'
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
        <View>
          <StageNavigation baseUrl='/(tabs)/results' stageId={id} />
          <View className='h-6' />
          <Skeleton className='h-72' />
        </View>
      ) : (
        <View>
          <StageNavigation baseUrl='/(tabs)/results' stageId={id} />
          <View className='h-6' />
          <Card>
            {data?.stageResults.resultsStatus === ResultsStatus.Completed && (
              <FlatList
                data={data?.stageResults.categoryResults}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <CardDivider />}
                renderItem={({ item }) => (
                  <CategoryResultsListItem
                    stageId={id}
                    categoryResults={item}
                    gcLeaderId={data?.stageResults.gcLeaderId}
                  />
                )}
              />
            )}
            {data?.stageResults.resultsStatus ===
              ResultsStatus.AwaitingResults && (
              <Text className='text-primary font-inter-regular px-4 py-6 text-center text-base'>
                Stage completed and awaiting results
              </Text>
            )}
            {data?.stageResults.resultsStatus === ResultsStatus.Upcoming && (
              <Text className='text-primary font-inter-regular px-4 py-6 text-center text-base'>
                Stage not yet started
              </Text>
            )}
          </Card>
        </View>
      )}
    </ScrollView>
  )
}
