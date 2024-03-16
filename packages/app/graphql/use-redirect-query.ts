import { useQuery } from '@apollo/client'
import { graphql } from '../generated'

const redirectQuery = graphql(`
  query RedirectQuery($seasonId: ID) {
    redirects(seasonId: $seasonId) {
      currentStageId
    }
    stages(seasonId: $seasonId) {
      id
      name
      startTime
      location
      county
      type
      stageStatus
      mandatory
      club {
        id
        code
        name
      }
      categoryGroups {
        id
        categories {
          id
          code
          name
          rank
        }
      }
      coordinates
      stravaId
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
