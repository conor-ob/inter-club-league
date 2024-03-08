import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const redirectQuery = graphql(`
  query RedirectQuery {
    currentGcStageId
    currentResultsStageId
  }
`)

export function useRedirectQuery() {
  return useQuery(redirectQuery, { notifyOnNetworkStatusChange: true })
}
