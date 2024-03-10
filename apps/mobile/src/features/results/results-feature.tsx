import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { RefreshScrollView } from '@/components/views/refresh-scroll-view'
import { ResultsStatus } from '@/generated/graphql'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import { stageNumberFromStageId } from '@inter-club-league/utils'
import cx from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, Platform, Text, View } from 'react-native'
import { CategoryResultsListItem } from './category-results-list-item'

export function ResultsFeature() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, loading, error, refetch } = useStageResultsQuery(id)

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
            <StageNavigation baseUrl='/(tabs)/results' />
            <View className='h-6' />
            <Skeleton className='h-72' />
          </View>
        ) : (
          <View>
            <StageNavigation baseUrl='/(tabs)/results' />
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
                  {`Results will be available after Stage ${stageNumberFromStageId(id)}`}
                </Text>
              )}
              {data?.stageResults.resultsStatus === ResultsStatus.Upcoming && (
                <Text className='text-primary font-inter-regular px-4 py-6 text-center text-base'>
                  {`Stage ${stageNumberFromStageId(id)} not yet started`}
                </Text>
              )}
            </Card>
          </View>
        )}
      </View>
    </RefreshScrollView>
  )
}
