import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const stageResultsQuery = graphql(`
  query StageResults($stageId: ID) {
    stageResults(stageId: $stageId) {
      id
      gcLeaderId
      resultsStatus
      categoryResults {
        id
        categoryGroup {
          id
          categories {
            id
            code
            name
            rank
          }
        }
        stageRiders {
          id
          rider {
            id
            initials
            name
          }
          category {
            id
            code
            name
            rank
          }
          club {
            id
            code
            name
          }
          position
          points
        }
      }
    }
  }
`)

export function useStageResultsQuery(stageId?: string) {
  return useQuery(stageResultsQuery, {
    variables: { stageId: stageId },
    notifyOnNetworkStatusChange: true
  })
}
