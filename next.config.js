const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  future: {
    webpack5: true,
  },
  swcMinify: false,
})

module.exports = nextConfig
