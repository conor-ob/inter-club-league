import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-default)',
          light: 'var(--color-primary-light)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-default)',
          light: 'var(--color-secondary-light)'
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary-default)',
          light: 'var(--color-tertiary-light)'
        },
        accent: {
          DEFAULT: 'var(--color-accent-default)',
          light: 'var(--color-accent-light)'
        },
        grey: {
          DEFAULT: 'var(--color-grey-default)'
        },
        slate: {
          DEFAULT: 'var(--color-slate-default)'
        },
        dark: {
          DEFAULT: 'var(--color-dark-default)'
        },
        light: {
          DEFAULT: 'var(--color-light-default)'
        },
        brand: 'var(--color-brand)',
        card: 'var(--color-card)',
        overlay: 'var(--color-overlay)'
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
