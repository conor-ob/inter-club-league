import { GcFeatureSkeleton } from 'app/features/gc/gc-feature-skeleton'
import { useRedirectQuery } from 'app/graphql/use-redirect-query'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useRouter } from 'solito/router'

export default function GcRedirect() {
  const { loading, data, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })
  const { push, replace, back, parseNextPath } = useRouter()

  useEffect(() => {
    if (data?.redirects.currentStageId) {
      replace(`/gc/${data.redirects.currentStageId}`)
    }
  }, [data, replace])

  return (
    <ScrollView
      contentContainerClassName='px-4 pt-6 pb-12'
      contentInsetAdjustmentBehavior='automatic'
    >
      <GcFeatureSkeleton />
    </ScrollView>
  )
}
