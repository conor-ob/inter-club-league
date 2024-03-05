import { Theme } from '@react-navigation/native'
import { vars } from 'nativewind'

export const colors = {
  light: {
    brandDefault: 'rgba(252, 76, 2, 1)',
    brandBlue: 'rgba(0, 122, 255, 1)',
    brandGreen: 'rgba(52, 199, 89, 1)',
    brandPurple: 'rgba(175, 82, 222, 1)',
    brandRed: 'rgba(246, 52, 40, 1)',
    gc: 'rgba(253, 224, 71, 1)',
    background: 'rgb(242, 242, 242)',
    border: 'rgba(179, 179, 179, 1)',
    card: 'rgba(255, 255, 255, 1)',
    cardDivider: 'rgba(196, 196, 198, 1)',
    tabIconDefault: 'rgba(153, 153, 153, 1)',
    textColorPrimary: 'rgba(0, 0, 0, 1)',
    textColorSecondary: 'rgba(60, 60, 67, 0.6)',
    textColorTertiary: 'rgba(60, 60, 67, 0.30)',
    textColorQuarternary: 'rgba(60, 60, 67, 0.18)'
  },
  dark: {
    brandDefault: 'rgba(253, 224, 71, 1)',
    brandBlue: 'rgba(32, 148, 250, 1)',
    brandGreen: 'rgba(48, 209, 88, 1)',
    brandPurple: 'rgba(191, 90, 242, 1)',
    brandRed: 'rgba(255, 59, 48, 1)',
    gc: 'rgba(253, 224, 71, 1)',
    background: 'rgb(1, 1, 1)',
    border: 'rgba(38, 38, 38, 1)',
    card: 'rgba(18, 18, 18, 1)',
    cardDivider: 'rgba(71, 71, 74, 1)',
    tabIconDefault: 'rgba(153, 153, 153, 1)',
    textColorPrimary: 'rgba(255, 255, 255, 1)',
    textColorSecondary: 'rgba(235, 235, 235, 0.6)',
    textColorTertiary: 'rgba(235, 235, 245, 0.30)',
    textColorQuarternary: 'rgba(235, 235, 245, 0.18)'
  }
}

export const themes = {
  light: vars({
    '--color-primary': colors.light.textColorPrimary,
    '--color-secondary': colors.light.textColorSecondary,
    '--color-tertiary': colors.light.textColorTertiary,
    '--color-quarternary': colors.light.textColorQuarternary,
    '--color-brand-default': colors.light.brandDefault,
    '--color-brand-blue': colors.light.brandBlue,
    '--color-brand-green': colors.light.brandGreen,
    '--color-brand-purple': colors.light.brandPurple,
    '--color-brand-red': colors.light.brandRed,
    '--color-gc': colors.light.gc,
    '--color-card': colors.light.card
  }),
  dark: vars({
    '--color-primary': colors.dark.textColorPrimary,
    '--color-secondary': colors.dark.textColorSecondary,
    '--color-tertiary': colors.dark.textColorTertiary,
    '--color-quarternary': colors.dark.textColorQuarternary,
    '--color-brand-default': colors.dark.brandDefault,
    '--color-brand-blue': colors.dark.brandBlue,
    '--color-brand-green': colors.dark.brandGreen,
    '--color-brand-purple': colors.dark.brandPurple,
    '--color-brand-red': colors.dark.brandRed,
    '--color-gc': colors.dark.gc,
    '--color-card': colors.dark.card
  })
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.light.brandDefault,
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
    primary: colors.dark.brandDefault,
    background: colors.dark.background,
    card: colors.dark.card,
    text: colors.dark.textColorPrimary,
    border: colors.dark.border,
    notification: 'rgb(255, 69, 58)'
  }
}
