import { useQuery } from '@apollo/client'
import { graphql } from '../generated'

const stageResultsQuery = graphql(`
  query StageResults($stageId: ID!) {
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

export function useStageResultsQuery({ stageId }: { stageId: string }) {
  return useQuery(stageResultsQuery, {
    variables: { stageId: stageId },
    notifyOnNetworkStatusChange: true,
    skip: stageId === undefined
  })
}
