import { useQuery } from '@apollo/client'
import { graphql } from '@inter-club-league/app/generated'

const redirectsQuery = graphql(`
  query RedirectsQuery {
    redirects {
      pgaTourCurrentTournamentId
      puttingPalsCurrentTournamentId
    }
  }
`)

export function useRedirectsQuery() {
  return useQuery(redirectsQuery, {
    notifyOnNetworkStatusChange: true
  })
}
