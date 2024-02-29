import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quarternary: 'var(--color-quarternary)',
        brand: 'var(--color-brand)',
        gc: 'var(--color-gc)',
        card: 'var(--color-card)'
      },
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
