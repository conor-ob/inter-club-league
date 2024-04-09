import { GcFeature } from 'app/features/gc/gc-feature'
import { GcFeatureSkeleton } from 'app/features/gc/gc-feature-skeleton'
import { useRedirectQuery } from 'app/graphql/use-redirect-query'
import { ScrollView } from 'react-native'

export default function Index() {
  const { loading, data, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })

  if (data?.redirects.currentStageId) {
    return <GcFeature providedStageId={data.redirects.currentStageId} />
  } else {
    return (
      <ScrollView
        contentContainerClassName='px-4 py-6'
        contentInsetAdjustmentBehavior='automatic'
      >
        <GcFeatureSkeleton />
      </ScrollView>
    )
  }
}
