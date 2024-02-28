const base = {
  graphqlPort: 4000
}

const production = {
  allowedOrigins: [],
  graphqlEndpoint: '/',
  graphqlPath: 'https://inter-club-league-jtmtu.ondigitalocean.app/graphql',
  graphqlUri: 'https://inter-club-league-jtmtu.ondigitalocean.app/graphql',
  ...base
}

const development = {
  allowedOrigins: [`http://localhost:${base.graphqlPort}`],
  graphqlEndpoint: '/graphql',
  graphqlPath: `http://localhost:${base.graphqlPort}/graphql`,
  graphqlUri: `http://10.11.8.29:${base.graphqlPort}/graphql`,
  ...base
}

export const config =
  process.env.NODE_ENV === 'production' ? production : development
