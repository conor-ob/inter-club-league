import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const currentGcStageIdQuery = graphql(`
  query Query {
    currentGcStageId
  }
`)

export function useCurrentGcStageIdQuery() {
  return useQuery(currentGcStageIdQuery, { notifyOnNetworkStatusChange: true })
}
