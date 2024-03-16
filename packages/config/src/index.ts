const base = {
  graphqlPort: 4000
}

const production = {
  allowedOrigins: ['https://putting-pals.vercel.app'],
  graphqlEndpoint: '/',
  graphqlUri: 'https://putting-pals-5jwbn.ondigitalocean.app/graphql',
  ...base
}

const development = {
  allowedOrigins: [`http://localhost:3000`],
  graphqlEndpoint: '/graphql',
  graphqlUri: `http://localhost:${base.graphqlPort}/graphql`,
  ...base
}

export const config =
  process.env.NODE_ENV === 'production' ? production : development
