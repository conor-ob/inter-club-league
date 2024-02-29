import { Theme } from '@react-navigation/native'
import { vars } from 'nativewind'

export const colors = {
  light: {
    brand: 'rgba(252, 76, 2, 1)',
    gc: 'rgba(253, 224, 71, 1)',
    background: 'rgb(242, 242, 242)',
    border: 'rgba(179, 179, 179, 1)',
    card: 'rgba(255, 255, 255, 1)',
    cardDivider: 'rgba(196, 196, 198, 1)',
    tabIconDefault: 'rgba(153, 153, 153, 1)',
    textColorPrimary: 'rgba(28, 28, 30, 1)',
    textColorSecondary: 'rgba(28, 28, 30, 0.6)',
    textColorTertiary: 'rgba(60, 60, 67, 0.30)',
    textColorQuarternary: 'rgba(60, 60, 67, 0.18)'
  },
  dark: {
    brand: 'rgba(253, 224, 71, 1)',
    gc: 'rgba(253, 224, 71, 1)',
    background: 'rgb(1, 1, 1)',
    border: 'rgba(38, 38, 38, 1)',
    card: 'rgba(18, 18, 18, 1)',
    cardDivider: 'rgba(71, 71, 74, 1)',
    tabIconDefault: 'rgba(153, 153, 153, 1)',
    textColorPrimary: 'rgba(229, 229, 231, 1)',
    textColorSecondary: 'rgba(229, 229, 231, 0.6)',
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
    '--color-brand': colors.light.brand,
    '--color-gc': colors.light.gc,
    '--color-card': colors.light.card
  }),
  dark: vars({
    '--color-primary': colors.dark.textColorPrimary,
    '--color-secondary': colors.dark.textColorSecondary,
    '--color-tertiary': colors.dark.textColorTertiary,
    '--color-quarternary': colors.light.textColorQuarternary,
    '--color-brand': colors.dark.brand,
    '--color-gc': colors.dark.gc,
    '--color-card': colors.dark.card
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
