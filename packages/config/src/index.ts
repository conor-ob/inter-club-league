const production = {
  hostname: '0.0.0.0',
  port: 8080,
  allowedOrigins: [
    'inter-club-league-production.up.railway.app',
    'https://clubleague.conorob.me'
  ],
  // graphqlUri: 'https://clubleague.conorob.me/graphql',
  graphqlUri: 'https://inter-club-league-production.up.railway.app/graphql'
}

const development = {
  hostname: 'localhost',
  port: 3000,
  allowedOrigins: ['http://localhost:3000'],
  graphqlUri: `http://localhost:3000/graphql`
}

export const config =
  process.env.NODE_ENV === 'production' ? production : development
