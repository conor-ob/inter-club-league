import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const stagesQuery = graphql(`
  query Stages($seasonId: ID) {
    stages(seasonId: $seasonId) {
      id
      name
      startTime
      location
      county
      type
      status
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

export function useStagesQuery(seasonId?: string) {
  return useQuery(stagesQuery, {
    variables: { seasonId: seasonId },
    notifyOnNetworkStatusChange: true
  })
}
