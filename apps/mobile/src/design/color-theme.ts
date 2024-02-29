import { Theme } from '@react-navigation/native'
import { vars } from 'nativewind'

export const colors = {
  light: {
    brand: 'rgba(252, 76, 2, 1)',
    background: 'rgb(242, 242, 242)',
    border: 'rgba(216, 216, 216, 1)',
    card: 'rgba(255, 255, 255, 1)',
    cardDivider: 'rgba(196, 196, 198, 1)',
    tabIconDefault: '#4b5563',
    textColorPrimary: 'rgba(28, 28, 30, 1)',
    textColorSecondary: 'rgba(28, 28, 30, 0.6)'
  },
  dark: {
    brand: 'rgba(253, 224, 71, 1)',
    background: 'rgb(1, 1, 1)',
    border: 'rgba(39, 39, 41, 1)',
    card: 'rgba(18, 18, 18, 1)',
    cardDivider: 'rgba(71, 71, 74, 1)',
    tabIconDefault: '#9ca3af',
    textColorPrimary: 'rgba(229, 229, 231, 1)',
    textColorSecondary: 'rgba(229, 229, 231, 0.6)'
  }
}

export const themes = {
  light: vars({
    '--color-primary-default': colors.light.textColorPrimary,
    '--color-primary-light': '#5bd1e7',
    '--color-secondary-default': colors.light.textColorSecondary,
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
    '--color-secondary-default': colors.dark.textColorSecondary,
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
    background: colors.light.background,
    card: colors.light.card,
    text: colors.light.textColorPrimary,
    border: colors.light.border,
    notification: 'rgb(255, 59, 48)'
  }
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.dark.brand,
    background: colors.dark.background,
    card: colors.dark.card,
    text: colors.dark.textColorPrimary,
    border: colors.dark.border,
    notification: 'rgb(255, 69, 58)'
  }
}
