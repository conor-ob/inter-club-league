import { useRedirectsQuery } from '@inter-club-league/app/graphql/use-redirects-query'
import { useEffect } from 'react'
import { useRouter } from 'solito/router'

export function PuttingPalsRedirect() {
  const { loading, data, error, refetch } = useRedirectsQuery()
  const { push, replace, back, parseNextPath } = useRouter()

  useEffect(() => {
    if (data?.redirects.puttingPalsCurrentTournamentId) {
      replace(`/putting-pals/${data.redirects.puttingPalsCurrentTournamentId}`)
    }
  }, [data, replace])

  return null
}
