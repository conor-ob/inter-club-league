import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const currentGcStageIdQuery = graphql(`
  query CurrentGcStageIdQuery {
    currentGcStageId
  }
`)

export function useCurrentGcStageIdQuery() {
  return useQuery(currentGcStageIdQuery, { notifyOnNetworkStatusChange: true })
}
