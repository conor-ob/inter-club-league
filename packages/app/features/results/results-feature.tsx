import { stageNumberFromStageId } from '@inter-club-league/utils'
import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import { FlatList, Text, View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Card } from '../../components/card/card'
import { CardDivider } from '../../components/card/card-divider'
import { StageNavigation } from '../../components/navigation/stage-navigation'
import { ResultsStatus } from '../../generated/graphql'
import { useStageResultsQuery } from '../../graphql/use-stage-results-query'
import { StageCard } from '../stage/stage-card'
import { CategoryResultsListItem } from './category-results-list-item'
import { ResultsFeatureSkeleton } from './results-feature-skeleton'

const { useParams } = createParam<{
  id: string
}>()

export function ResultsFeature() {
  const { params } = useParams()
  const colorScheme = useColorScheme()

  const { loading, data, error, refetch } = useStageResultsQuery({
    stageId: params.id
  })

  return (
    <RefreshScrollView
      contentContainerClassName='px-4 py-6'
      loading={loading}
      onRefresh={() => refetch()}
    >
      {loading ? (
        <ResultsFeatureSkeleton />
      ) : data ? (
        <View>
          <StageCard
            stage={data.stage}
            href={`/schedule/stage/${data.stage.id}`}
          />
          <View className='h-6' />
          <StageNavigation baseUrl='/results' disabled={loading} />
          <View className='h-12' />
          {data.stageResults.resultsStatus === ResultsStatus.Upcoming && (
            <Card>
              <Text className='text-secondary font-inter-regular p-4 text-center text-base'>
                {`Stage ${stageNumberFromStageId(data.stage.id)} not yet started`}
              </Text>
            </Card>
          )}
          {data.stageResults.resultsStatus ===
            ResultsStatus.AwaitingResults && (
            <Card>
              <Text className='text-primary font-inter-regular p-4 text-center text-base'>
                {`Results will be available after Stage ${stageNumberFromStageId(data.stage.id)}`}
              </Text>
            </Card>
          )}
          {data.stageResults.resultsStatus === ResultsStatus.Completed && (
            <Card>
              {data?.stageResults.resultsStatus === ResultsStatus.Completed && (
                <FlatList
                  data={data?.stageResults.categoryResults}
                  // scrollEnabled={false}
                  ItemSeparatorComponent={() => <CardDivider />}
                  renderItem={({ item }) => (
                    <CategoryResultsListItem
                      stageId={params.id}
                      categoryResults={item}
                      gcLeaderId={data?.stageResults.gcLeaderId}
                    />
                  )}
                />
              )}
            </Card>
          )}
        </View>
      ) : error ? (
        <View></View>
      ) : (
        <View></View>
      )}
    </RefreshScrollView>
  )
}
