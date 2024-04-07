const { withExpo } = require('@expo/next-adapter')
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development'
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  transpilePackages: [
    '@nandorojo/heroicons',
    '@react-native-segmented-control/segmented-control',
    'app',
    'moti',
    'nativewind',
    'react-native',
    'react-native-css-interop',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-svg',
    'react-native-web',
    'solito'
  ],
  webpack: (c) => {
    c.module.rules.push({
      test: /\.jsx?$/,
      use: ['remove-flow-types-loader']
    })
    return c
  }
}

// module.exports = withPWA(withExpo(nextConfig))
module.exports = withExpo(nextConfig)
