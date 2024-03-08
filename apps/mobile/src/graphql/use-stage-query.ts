import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const stageQuery = graphql(`
  query Stage($stageId: ID!) {
    stage(stageId: $stageId) {
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

export function useStageQuery(stageId: string) {
  return useQuery(stageQuery, {
    variables: { stageId: stageId },
    notifyOnNetworkStatusChange: true
  })
}
