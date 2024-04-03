const { withExpo } = require('@expo/next-adapter')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  transpilePackages: [
    '@react-native-segmented-control/segmented-control',
    '@nandorojo/heroicons',
    'react-native-svg',
    'react-native-svg-icon',
    'react-native',
    'react-native-web',
    'solito',
    'moti',
    'app',
    'react-native-reanimated',
    'nativewind',
    'react-native-css-interop',
    'react-native-gesture-handler'
  ],
  webpack: (c) => {
    c.module.rules.push({
      test: /\.jsx?$/,
      use: ['remove-flow-types-loader']
    })
    return c
  }
}

module.exports = withExpo(nextConfig)
