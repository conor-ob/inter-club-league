import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Observable
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { config } from '@inter-club-league/config'
import { useMemo } from 'react'

type ApolloProviderProps = {
  children: React.ReactNode
}

export function ApolloClientProvider({ children }: ApolloProviderProps) {
  const httpLink = new HttpLink({ uri: config.graphqlUri })

  const delayLink = (delay = 1000) =>
    new ApolloLink((operation, forward) => {
      return new Observable((observer) => {
        const getDelayedMethod =
          (name: string) =>
          (...args: any) => {
            setTimeout(() => {
              // @ts-ignore
              observer[name](...args)
            }, delay)
          }
        const subscription = forward(operation).subscribe({
          next: getDelayedMethod('next'),
          error: getDelayedMethod('error')
        })
        return () => {
          if (subscription) subscription.unsubscribe()
        }
      })
    })

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

  const apolloLink =
    process.env.NODE_ENV === 'production'
      ? ApolloLink.from([errorLink, httpLink])
      : ApolloLink.from([delayLink(1), errorLink, httpLink])

  const client = useMemo(
    () =>
      new ApolloClient({
        link: apolloLink,
        cache: new InMemoryCache()
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
