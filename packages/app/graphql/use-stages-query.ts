import { useQuery } from '@apollo/client'
import { graphql } from '../generated'

const stagesQuery = graphql(`
  query Stages($seasonId: ID) {
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
      info
    }
  }
`)

export function useStagesQuery(seasonId?: string) {
  return useQuery(stagesQuery, {
    variables: { seasonId: seasonId },
    notifyOnNetworkStatusChange: true
  })
}
