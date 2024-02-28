const base = {
  graphqlPort: 4000
}

const production = {
  allowedOrigins: [],
  graphqlEndpoint: '/',
  graphqlUri: 'https://inter-club-league-jtmtu.ondigitalocean.app/graphql',
  ...base
}

const development = {
  allowedOrigins: [`http://localhost:${base.graphqlPort}`],
  graphqlEndpoint: '/graphql',
  graphqlUri: `http://localhost:${base.graphqlPort}/graphql`,
  ...base
}

export const config =
  process.env.NODE_ENV === 'production' ? production : development
