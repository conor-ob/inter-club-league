// This is a dummy tailwind config file used to provide intellisense.
import { theme } from '@turbostack/app/design/tailwind/theme'
import type { Config } from 'tailwindcss'

export default {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  theme: {
    ...theme
  }
} satisfies Config
