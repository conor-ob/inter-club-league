import { Image } from 'react-native'

export function YellowJersey() {
  return (
    <Image
      style={{ width: 32, height: 32 }}
      source={{
        uri: 'https://inter-club-league.vercel.app/yellow-jersey.png'
      }}
      alt='yellow-jersey'
    />

    // <SolitoImage
    //   src={{ src: '/yellow-jersey.png', height: 32, width: 32 }}
    //   contentFit='cover'
    //   alt='Yellow Jersey'
    // />
  )
}
