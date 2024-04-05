import { useQuery } from '@apollo/client'
import { graphql } from '../generated'

const gcQuery = graphql(`
  query Gc($stageId: ID!) {
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

export function useGcQuery({ stageId }: { stageId: string }) {
  return useQuery(gcQuery, {
    variables: { stageId: stageId },
    notifyOnNetworkStatusChange: true,
    skip: stageId === undefined
  })
}
