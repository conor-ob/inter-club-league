import { useQuery } from '@apollo/client'
import { graphql } from '../generated'

const stageFeatureQuery = graphql(`
  query StageFeatureQuery($seasonId: ID, $stageId: ID!) {
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
      info
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
      info
    }
    marshalls(stageId: $stageId) {
      id
      marshalls
    }
    routes(stageId: $stageId) {
      id
      label
      type
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
    notifyOnNetworkStatusChange: true
  })
}
