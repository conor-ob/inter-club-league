import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const currentResultsStageIdQuery = graphql(`
  query CurrentResultsStageIdQuery {
    currentResultsStageId
  }
`)

export function useCurrentResultsStageIdQuery() {
  return useQuery(currentResultsStageIdQuery, {
    notifyOnNetworkStatusChange: true
  })
}
