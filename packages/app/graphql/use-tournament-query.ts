import { useQuery } from '@apollo/client'
import { graphql } from '@turbostack/app/generated'

const tournamentsQuery = graphql(`
  query Tournaments($ids: [ID!]) {
    tournaments(ids: $ids) {
      id
      tournamentLogo
      roundStatus
      roundStatusColor
      roundStatusDisplay
      roundDisplay
      tournamentStatus
      tournamentName
      courses {
        id
        courseName
      }
    }
  }
`)

export function useTournamentsQuery(ids: string[]) {
  return useQuery(tournamentsQuery, {
    variables: { ids: ids },
    notifyOnNetworkStatusChange: true
  })
}
