import { graphql } from '@/generated'
import { useQuery } from '@apollo/client'

const scheduleQuery = graphql(`
  query Schedule($seasonId: ID) {
    schedule(seasonId: $seasonId) {
      id
      completed {
        displayName
        id
        stages {
          id
          number
          season
          name
          startTime
          displayDate
          location
          county
          type
          status
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
      upcoming {
        displayName
        id
        stages {
          id
          number
          season
          name
          startTime
          displayDate
          location
          county
          type
          status
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
      upcomingStage {
        id
        number
        season
        name
        startTime
        displayDate
        location
        county
        type
        status
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
  }
`)

export function useScheduleQuery(seasonId?: string) {
  return useQuery(scheduleQuery, { variables: { seasonId: seasonId } })
}
