import { ResultsFeatureSkeleton } from 'app/features/results/results-feature-skeleton'
import { useRedirectQuery } from 'app/graphql/use-redirect-query'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useRouter } from 'solito/router'

export default function ResultsRedirect() {
  const { loading, data, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })
  const { push, replace, back, parseNextPath } = useRouter()

  useEffect(() => {
    if (data?.redirects.currentStageId) {
      replace(`/results/${data.redirects.currentStageId}`)
    }
  }, [data, replace])

  return (
    <ScrollView
      contentContainerClassName='px-4 py-6'
      contentInsetAdjustmentBehavior='automatic'
    >
      <ResultsFeatureSkeleton />
    </ScrollView>
  )
}
