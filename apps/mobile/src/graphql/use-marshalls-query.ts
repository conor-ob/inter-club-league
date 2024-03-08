import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const marshallsQuery = graphql(`
  query MarshallsQuery($stageId: ID!) {
    marshalls(stageId: $stageId) {
      id
      marshalls
    }
  }
`)

export function useMarshallsQuery(stageId?: string) {
  return useQuery(marshallsQuery, {
    variables: { stageId: stageId },
    notifyOnNetworkStatusChange: true,
    skip: stageId === undefined
  })
}
