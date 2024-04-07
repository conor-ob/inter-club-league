import { useRedirectQuery } from 'app/graphql/use-redirect-query'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useRouter } from 'solito/router'

export default function ScheduleRedirect() {
  const { loading, data, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })
  const { push, replace, back, parseNextPath } = useRouter()

  useEffect(() => {
    if (data?.redirects.currentSeasonId) {
      replace(`/schedule/${data.redirects.currentSeasonId}`)
    }
  }, [data, replace])

  return (
    <ScrollView
      contentContainerClassName='px-4 pt-6 pb-12'
      contentInsetAdjustmentBehavior='automatic'
    >
      {/* <ResultsFeatureSkeleton /> */}
    </ScrollView>
  )
}
