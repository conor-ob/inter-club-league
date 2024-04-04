import cx from 'classnames'
import { Image } from 'react-native'

export function YellowJersey({ className }: { className?: string }) {
  return (
    <Image
      className={cx('h-8 w-8', className)}
      source={{
        uri: 'https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/image/inter-club-league/yellow-jersey.png'
      }}
      alt='yellow-jersey'
    />
  )
}
