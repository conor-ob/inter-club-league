import type { Config } from 'tailwindcss'

export const theme = {
  extend: {
    colors: {
      background: 'var(--color-background)',
      brand: {
        DEFAULT: 'var(--color-brand-default)',
        gc: 'var(--color-brand-gc)',
        blue: 'var(--color-brand-blue)',
        purple: 'var(--color-brand-purple)',
        green: 'var(--color-brand-green)',
        red: 'var(--color-brand-red)',
        strava: 'var(--color-brand-strava)'
      },
      card: 'var(--color-card)',
      skeleton: 'var(--color-skeleton)',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      tertiary: 'var(--color-tertiary)',
      quarternary: 'var(--color-quarternary)'
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
} satisfies Config['theme']
