import { useQuery } from '@apollo/client'
import { graphql } from '@inter-club-league/app/generated'

const puttingPalsTournamentsQuery = graphql(`
  query PuttingPalsTournaments {
    puttingPalsTournaments {
      id
      seasonId
      name
      players {
        id
        shortName
        displayName
        picks
      }
    }
  }
`)

export function usePuttingPalsTournamentsQuery() {
  return useQuery(puttingPalsTournamentsQuery, {
    notifyOnNetworkStatusChange: true
  })
}
