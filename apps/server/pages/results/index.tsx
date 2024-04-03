import { useRedirectQuery } from '@inter-club-league/app/graphql/use-redirect-query'
import { useEffect } from 'react'
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

  return null // TODO loading skeleton
}
