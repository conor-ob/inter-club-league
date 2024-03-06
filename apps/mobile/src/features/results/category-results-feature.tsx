import { CardDivider } from '@/components/card/card-divider'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, ScrollView } from 'react-native'
import { StageResultsHeader } from './stage-results-header'
import { StageRiderRow } from './stage-rider-row'

export function CategoryResultsFeature() {
  const { stageId, categoryGroupId } = useLocalSearchParams<{
    stageId: string
    categoryGroupId: string
  }>()
  const { data, loading, error, refetch } = useStageResultsQuery(stageId)

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <FlatList
        data={data?.stageResults.categoryResults
          .filter((it) => it.categoryGroup.id === categoryGroupId)
          .flatMap((it) => it.stageRiders)
          .filter((it) => it.points >= 5)}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <CardDivider />}
        renderItem={({ item }) => <StageRiderRow stageRider={item} />}
        ListHeaderComponent={() => <StageResultsHeader />}
        stickyHeaderIndices={[0]}
      />
    </ScrollView>
  )
}
