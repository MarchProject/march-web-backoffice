const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { version } = require('./package.json')

console.log({ BASE_PATH: process.env.BASE_PATH })

function getBasePath() {
  const basePath = process.env.BASE_PATH || ''
  console.log('next.config', { basePath })
  return basePath
}

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  future: {
    webpack5: true,
  },
  swcMinify: false,

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/users-management',
      },
    ]
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: `
      $base-path: '${getBasePath()}';
    `,
  },
  assetPrefix: `${getBasePath()}/`,
  basePath: getBasePath(),

  /**
   * build-time config
   */
  env: {
    version: `v${version}`,
    basePath: process.env.BASE_PATH || '',
    //TODO
    // authority: process.env.AUTHORITY || '',
    // clientId: process.env.CLIENT_ID || '',
  },
})
