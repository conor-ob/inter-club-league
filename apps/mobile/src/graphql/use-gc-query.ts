import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const gcQuery = graphql(`
  query Gc($stageId: ID) {
    gc(stageId: $stageId) {
      id
      gcStatus
      resultsStatus
      gcRiders {
        id
        rider {
          id
          initials
          name
        }
        club {
          id
          code
          name
        }
        category {
          id
          code
          name
          rank
        }
        rank
        position
        totalPoints
        gcPoints
        movement
      }
    }
  }
`)

export function useGcQuery(stageId?: string) {
  return useQuery(gcQuery, {
    variables: { stageId: stageId },
    notifyOnNetworkStatusChange: true
  })
}
