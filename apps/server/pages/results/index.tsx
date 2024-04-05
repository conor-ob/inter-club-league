import { ResultsFeatureSkeleton } from '@inter-club-league/app/features/results/results-feature-skeleton'
import { useRedirectQuery } from '@inter-club-league/app/graphql/use-redirect-query'
import cx from 'classnames'
import { useEffect } from 'react'
import { Platform, ScrollView } from 'react-native'
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
      contentContainerClassName={cx({
        'px-4 pt-2 pb-6': Platform.OS === 'web',
        'px-3 py-6': Platform.OS !== 'web'
      })}
      contentInsetAdjustmentBehavior='automatic'
    >
      <ResultsFeatureSkeleton />
    </ScrollView>
  )
}
