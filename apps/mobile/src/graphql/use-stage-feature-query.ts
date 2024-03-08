import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const stageFeatureQuery = graphql(`
  query Stage($seasonId: ID, $stageId: ID!) {
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
    marshalls(stageId: $stageId) {
      id
      marshalls
    }
  }
`)

type StageFeatureQueryProps = {
  seasonId?: string
  stageId: string
}

export function useStageFeatureQuery({
  seasonId,
  stageId
}: StageFeatureQueryProps) {
  return useQuery(stageFeatureQuery, {
    variables: { seasonId: seasonId, stageId: stageId },
    notifyOnNetworkStatusChange: true,
    skip: stageId === undefined
  })
}
