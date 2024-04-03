import { Theme } from '@react-navigation/native'
import { vars } from 'nativewind'

export const colors = {
  light: {
    background: 'rgb(242, 242, 242)',
    brandDefault: 'rgba(252, 76, 2, 1)',
    brandBlue: '#004c95',
    brandGray: '#949494',
    brandGreen: 'rgba(52, 199, 89, 1)',
    brandPurple: 'rgba(175, 82, 222, 1)',
    brandRed: 'rgba(246, 52, 40, 1)',
    brandYellow: '#fae100',
    border: 'rgba(179, 179, 179, 1)',
    card: 'rgba(255, 255, 255, 1)',
    skeleton: 'rgba(60, 60, 67, 0.12)',
    textColorPrimary: 'rgba(0, 0, 0, 1)',
    textColorSecondary: 'rgba(60, 60, 67, 0.6)',
    textColorTertiary: 'rgba(60, 60, 67, 0.30)',
    textColorQuarternary: 'rgba(60, 60, 67, 0.18)'
  },
  dark: {
    background: 'rgb(1, 1, 1)',
    brandDefault: 'rgba(253, 224, 71, 1)',
    brandPurple: 'rgba(191, 90, 242, 1)',
    brandBlue: '#004c95',
    brandGray: '#949494',
    brandGreen: 'rgba(48, 209, 88, 1)',
    brandRed: 'rgba(255, 59, 48, 1)',
    brandYellow: '#fae100',
    border: 'rgba(38, 38, 38, 1)',
    card: 'rgba(18, 18, 18, 1)',
    skeleton: 'rgba(235, 235, 245, 0.12)',
    textColorPrimary: 'rgba(255, 255, 255, 1)',
    textColorSecondary: 'rgba(235, 235, 235, 0.6)',
    textColorTertiary: 'rgba(235, 235, 245, 0.30)',
    textColorQuarternary: 'rgba(235, 235, 245, 0.18)'
  }
}

export const themes = {
  light: vars({
    '--color-background': colors.light.background,
    '--color-brand-default': colors.light.brandDefault,
    '--color-brand-blue': colors.light.brandBlue,
    '--color-brand-purple': colors.light.brandPurple,
    '--color-brand-gray': colors.light.brandGray,
    '--color-brand-green': colors.light.brandGreen,
    '--color-brand-red': colors.light.brandRed,
    '--color-brand-yellow': colors.light.brandYellow,
    '--color-card': colors.light.card,
    '--color-skeleton': colors.light.skeleton,
    '--color-primary': colors.light.textColorPrimary,
    '--color-secondary': colors.light.textColorSecondary,
    '--color-tertiary': colors.light.textColorTertiary,
    '--color-quarternary': colors.light.textColorQuarternary
  }),
  dark: vars({
    '--color-background': colors.dark.background,
    '--color-brand-default': colors.dark.brandDefault,
    '--color-brand-blue': colors.dark.brandBlue,
    '--color-brand-purple': colors.dark.brandPurple,
    '--color-brand-gray': colors.dark.brandGray,
    '--color-brand-green': colors.dark.brandGreen,
    '--color-brand-red': colors.dark.brandRed,
    '--color-brand-yellow': colors.dark.brandYellow,
    '--color-card': colors.dark.card,
    '--color-skeleton': colors.dark.skeleton,
    '--color-primary': colors.dark.textColorPrimary,
    '--color-secondary': colors.dark.textColorSecondary,
    '--color-tertiary': colors.dark.textColorTertiary,
    '--color-quarternary': colors.dark.textColorQuarternary
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
