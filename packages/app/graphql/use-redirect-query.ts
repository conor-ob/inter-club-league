import { useQuery } from '@apollo/client'
import { graphql } from '../generated'

const redirectQuery = graphql(`
  query RedirectQuery($seasonId: ID) {
    redirects(seasonId: $seasonId) {
      currentSeasonId
      currentStageId
    }
  }
`)

type RedirectQueryVariables = {
  seasonId?: string
}

export function useRedirectQuery({ seasonId }: RedirectQueryVariables) {
  return useQuery(redirectQuery, {
    variables: { seasonId: seasonId },
    notifyOnNetworkStatusChange: true
  })
}
