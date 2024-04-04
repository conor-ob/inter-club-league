import { Image } from 'react-native'

export function YellowJersey({ className }: { className?: string }) {
  return (
    <Image
      className={className ?? 'h-8 w-8'}
      source={{
        uri: 'https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/image/inter-club-league/yellow-jersey.png'
      }}
      alt='yellow-jersey'
    />
  )
}
