import type { Config } from 'tailwindcss'

export const theme = {
  extend: {
    colors: {
      background: 'var(--color-background)',
      brand: {
        DEFAULT: 'var(--color-brand-default)',
        blue: 'var(--color-brand-blue)',
        purple: 'var(--color-brand-purple)',
        gray: 'var(--color-brand-gray)',
        green: 'var(--color-brand-green)',
        red: 'var(--color-brand-red)',
        yellow: 'var(--color-brand-yellow)'
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
