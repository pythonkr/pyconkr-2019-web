const withTypescript = require('@zeit/next-typescript')
const withGraphQL = require('next-plugin-graphql')
const path = require('path')


module.exports = withGraphQL(withTypescript({
  webpack: (config, {}) => {
    config.resolve.alias = {
      'lib': path.join(__dirname, 'lib'),
      'stores': path.join(__dirname, 'stores'),
      'components': path.join(__dirname, 'components'),
      'styles': path.join(__dirname, 'styles'),
      'locales': path.join(__dirname, 'locales'),
      'routes': path.join(__dirname, 'routes'),
    }

    return config
  }
}))
