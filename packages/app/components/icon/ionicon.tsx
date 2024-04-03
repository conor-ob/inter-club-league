import Svg, { Circle, Path, Rect } from 'react-native-svg'

export function Ionicon({
  name,
  color,
  size
}: {
  name: string
  color: string
  size: number
}) {
  switch (name) {
    case 'bicycle':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            fill={color}
            stroke={color}
            d='M388 448a92 92 0 1192-92 92.1 92.1 0 01-92 92zm0-152a60 60 0 1060 60 60.07 60.07 0 00-60-60zM124 448a92 92 0 1192-92 92.1 92.1 0 01-92 92zm0-152a60 60 0 1060 60 60.07 60.07 0 00-60-60zM320 128a31.89 31.89 0 0032-32.1A31.55 31.55 0 00320.2 64a32 32 0 10-.2 64z'
          />
          <Path
            fill={color}
            stroke={color}
            d='M367.55 192h-43.76a4 4 0 01-3.51-2.08l-31.74-58.17a31 31 0 00-49.38-7.75l-69.86 70.4a32.56 32.56 0 00-9.3 22.4c0 17.4 12.6 23.6 18.5 27.1 28.5 16.42 48.57 28.43 59.58 35.1a4 4 0 011.92 3.41v69.12c0 8.61 6.62 16 15.23 16.43A16 16 0 00272 352v-86a16 16 0 00-6.66-13l-37-26.61a4 4 0 01-.58-6l42-44.79a4 4 0 016.42.79L298 215.77a16 16 0 0014 8.23h56a16 16 0 0016-16.77c-.42-8.61-7.84-15.23-16.45-15.23z'
          />
        </Svg>
      )
    case 'calendar-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Rect
            fill='none'
            stroke={color}
            stroke-linejoin='round'
            stroke-width='32'
            x='48'
            y='80'
            width='416'
            height='384'
            rx='48'
          />
          <Circle cx='296' cy='232' r='24' fill={color} />
          <Circle cx='376' cy='232' r='24' fill={color} />
          <Circle cx='296' cy='312' r='24' fill={color} />
          <Circle cx='376' cy='312' r='24' fill={color} />
          <Circle cx='136' cy='312' r='24' fill={color} />
          <Circle cx='216' cy='312' r='24' fill={color} />
          <Circle cx='136' cy='392' r='24' fill={color} />
          <Circle cx='216' cy='392' r='24' fill={color} />
          <Circle cx='296' cy='392' r='24' fill={color} />
          <Path
            fill='none'
            stroke={color}
            stroke-linejoin='round'
            stroke-width='32'
            stroke-linecap='round'
            d='M128 48v32M384 48v32'
          />
          <Path
            fill='none'
            stroke={color}
            stroke-linejoin='round'
            stroke-width='32'
            d='M464 160H48'
          />
        </Svg>
      )
    case 'flag-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            d='M80 464V68.14a8 8 0 014-6.9C91.81 56.66 112.92 48 160 48c64 0 145 48 192 48a199.53 199.53 0 0077.23-15.77 2 2 0 012.77 1.85v219.36a4 4 0 01-2.39 3.65C421.37 308.7 392.33 320 352 320c-48 0-128-32-192-32s-80 16-80 16'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='32'
          />
        </Svg>
      )
    case 'location-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            d='M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
          />
          <Circle
            cx='256'
            cy='192'
            r='48'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
          />
        </Svg>
      )
    case 'stopwatch-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M256 232v-80'
          />
          <Path
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='48'
            d='M256 88V72M132 132l-12-12'
          />
          <Circle
            cx='256'
            cy='272'
            r='32'
            fill='none'
            stroke={color}
            strokeMiterlimit='10'
            strokeWidth='32'
          />
          <Path
            d='M256 96a176 176 0 10176 176A176 176 0 00256 96z'
            fill='none'
            stroke={color}
            strokeMiterlimit='10'
            strokeWidth='32'
          />
        </Svg>
      )
    case 'time-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z'
            fill='none'
            stroke={color}
            strokeMiterlimit='10'
            strokeWidth='32'
          />
          <Path
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M256 128v144h96'
          />
        </Svg>
      )
    case 'trending-up-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M352 144h112v112'
          />
          <Path
            d='M48 368l121.37-121.37a32 32 0 0145.26 0l50.74 50.74a32 32 0 0045.26 0L448 160'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
          />
        </Svg>
      )
    case 'trophy-outline':
      return (
        <Svg height={size} width={size} viewBox='0 0 512 512'>
          <Path
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M176 464h160M256 464V336M384 224c0-50.64-.08-134.63-.12-160a16 16 0 00-16-16l-223.79.26a16 16 0 00-16 15.95c0 30.58-.13 129.17-.13 159.79 0 64.28 83 112 128 112S384 288.28 384 224z'
          />
          <Path
            d='M128 96H48v16c0 55.22 33.55 112 80 112M384 96h80v16c0 55.22-33.55 112-80 112'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
          />
        </Svg>
      )
    default:
      throw new Error(`Icon '${name}' not found`)
  }
}
