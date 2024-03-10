import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const redirectQuery = graphql(`
  query RedirectQuery($seasonId: ID) {
    currentGcStageId
    currentResultsStageId
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
