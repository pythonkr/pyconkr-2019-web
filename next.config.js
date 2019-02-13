const withTypescript = require('@zeit/next-typescript')
const path = require('path')

module.exports = withTypescript({
  webpack: (config, {}) => {
    config.resolve.alias = {
      'lib': path.join(__dirname, 'lib'),
      'stores': path.join(__dirname, 'stores'),
      'components': path.join(__dirname, 'components')
    }
    return config
  }
})
