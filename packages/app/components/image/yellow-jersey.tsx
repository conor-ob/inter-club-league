import { Image } from 'react-native'

export function YellowJersey() {
  return (
    <Image
      className='h-8 w-8'
      source={{
        uri: 'https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/image/inter-club-league/yellow-jersey.png'
      }}
      alt='yellow-jersey'
    />
  )
}
