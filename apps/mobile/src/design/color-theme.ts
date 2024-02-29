import { Theme } from '@react-navigation/native'
import { vars } from 'nativewind'

export const colors = {
  light: {
    brand: '#fc4c02',
    card: '#ffffff',
    tabIconDefault: '#4b5563',
    textColorPrimary: '#1c1c1e',
    textColorSecondary: '#8a8a8e'
  },
  dark: {
    brand: '#fde047',
    card: '#121212',
    tabIconDefault: '#9ca3af',
    textColorPrimary: '#e5e5e7',
    textColorSecondary: '#8d8d93'
  }
}

export const themes = {
  light: vars({
    '--color-primary-default': colors.light.textColorPrimary,
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
    '--color-card': colors.light.card,
    '--color-overlay': 'rgba(0, 0, 0, .05)'
  }),
  dark: vars({
    '--color-primary-default': colors.dark.textColorPrimary,
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
    '--color-card': colors.dark.card,
    '--color-overlay': 'rgba(255, 255, 255, .05)'
  })
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.light.brand,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)'
  }
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.dark.brand,
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)'
  }
}
