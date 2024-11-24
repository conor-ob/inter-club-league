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
    }
  }
} satisfies Config['theme']
