const production = {
  hostname: '0.0.0.0',
  port: 8080,
  allowedOrigins: ['https://clubleague.conorob.me'],
  graphqlUri: 'https://clubleague.conorob.me/graphql'
}

const development = {
  hostname: 'localhost',
  port: 3000,
  allowedOrigins: ['http://localhost:3000'],
  graphqlUri: `http://localhost:3000/graphql`
}

export const config =
  process.env.NODE_ENV === 'production' ? production : development
