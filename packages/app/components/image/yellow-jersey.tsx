import { SolitoImage } from 'solito/image'

export function YellowJersey() {
  return (
    <SolitoImage
      src={{ src: '/yellow-jersey.png', height: 32, width: 32 }}
      contentFit='cover'
      alt='Yellow Jersey'
    />
  )
}
