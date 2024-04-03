import { theme } from '@inter-club-league/app/design/tailwind/theme'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  important: 'html',
  theme: {
    ...theme
  },
  plugins: []
} satisfies Config
