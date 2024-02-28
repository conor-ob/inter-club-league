/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'inter-thin': ['inter-thin'],
        'inter-extralight': ['inter-extralight'],
        'inter-light': ['inter-light'],
        'inter-regular': ['inter-regular'],
        'inter-medium': ['inter-medium'],
        'inter-semibold': ['inter-semibold'],
        'inter-bold': ['inter-bold'],
        'inter-extrabold': ['inter-extrabold'],
        'inter-black': ['inter-black']
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
} satisfies Config
