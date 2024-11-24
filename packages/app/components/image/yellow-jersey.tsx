import { Image } from 'react-native'

export function YellowJersey() {
  return (
    <Image
      className='h-8 w-8'
      source={{
        uri: '/yellow-jersey.png'
      }}
      alt='yellow-jersey'
    />
  )
}
