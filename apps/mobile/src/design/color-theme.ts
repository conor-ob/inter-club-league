import { vars } from 'nativewind'

export const colors = {
  light: {
    brand: '#fc4c02',
    tabIconDefault: '#4b5563',
    textColorPrimary: '#000000',
    textColorSecondary: '#6b7280'
  },
  dark: {
    brand: '#fde047',
    tabIconDefault: '#9ca3af',
    textColorPrimary: '#ffffff',
    textColorSecondary: '#9ca3af'
  }
}

export const themes = {
  light: vars({
    '--color-primary-default': '#3a5e96',
    '--color-primary-light': '#5bd1e7',
    '--color-secondary-default': '#9b6cca',
    '--color-secondary-light': '#dfbeff',
    '--color-tertiary-default': '#ff88bd',
    '--color-tertiary-light': '#ffc2e6',
    '--color-accent-default': '#f9c04a',
    '--color-accent-light': '#ffeea9',
    '--color-grey-default': '#979797',
    '--color-slate-default': '#38383a',
    '--color-dark-default': '#1f355b',
    '--color-light-default': '#FCFDFD',
    '--color-brand': colors.light.brand,
    '--color-overlay': 'rgba(0, 0, 0, .05)'
  }),
  dark: vars({
    '--color-primary-default': '#3a5e96',
    '--color-primary-light': '#5bd1e7',
    '--color-secondary-default': '#9b6cca',
    '--color-secondary-light': '#dfbeff',
    '--color-tertiary-default': '#ff88bd',
    '--color-tertiary-light': '#ffc2e6',
    '--color-accent-default': '#f9c04a',
    '--color-accent-light': '#ffeea9',
    '--color-grey-default': '#979797',
    '--color-slate-default': '#38383a',
    '--color-dark-default': '#1f355b',
    '--color-light-default': '#1E1E1E',
    '--color-brand': colors.dark.brand,
    '--color-overlay': 'rgba(255, 255, 255, .05)'
  })
}
