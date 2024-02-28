import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { config } from '@inter-club-league/config'

type ApolloProviderProps = {
  children: React.ReactNode
}

export function ApolloClientProvider({ children }: ApolloProviderProps) {
  const httpLink = new HttpLink({ uri: config.graphqlUri })

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) =>
        console.log(
          `[GraphQL error]: ${JSON.stringify(
            {
              operation: operation.operationName,
              message: message
            },
            null,
            2
          )}`
        )
      )
    }

    if (networkError) {
      console.log(
        `[Network error]: ${JSON.stringify(
          {
            operation: operation.operationName,
            error: {
              name: networkError.name,
              message: networkError.message,
              cause: networkError.cause
            }
          },
          null,
          2
        )}`
      )
    }
  })

  const apolloLink = ApolloLink.from([errorLink, httpLink])

  return (
    <ApolloProvider
      client={
        new ApolloClient({
          link: apolloLink,
          cache: new InMemoryCache()
        })
      }
    >
      {children}
    </ApolloProvider>
  )
}
