const base = {
  graphqlEndpoint: '/graphql',
  googleAnalyticsId: 'G-78W6EQTCKS'
}

const production = {
  hostname: '0.0.0.0',
  port: 8080,
  allowedOrigins: [
    'https://inter-club-league-jtmtu.ondigitalocean.app',
    'https://clubleague.conorob.ie'
  ],
  graphqlUri: 'https://clubleague.conorob.ie/graphql',
  ...base
}

const development = {
  hostname: 'localhost',
  port: 3000,
  allowedOrigins: ['http://localhost:3000'],
  graphqlUri: `http://localhost:3000/graphql`,
  ...base
}

export const config =
  process.env.NODE_ENV === 'production' ? production : development
