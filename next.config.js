const withTypescript = require('@zeit/next-typescript')
const withGraphQL = require('next-plugin-graphql')
const path = require('path')
const webpack = require('webpack');
const withCSS = require('@zeit/next-css')

// 설정의 기본 값은 dev 서버를 바라보면서
// localhost로 redirect되는 oauth application입니다.
// 각 환경에 맞는 env를 실행하고 서버를 빌드해주세요
const API_SERVER = process.env.API_SERVER ?
  process.env.API_SERVER : 'https://dev.pycon.kr/api/graphql'
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?
  process.env.GITHUB_CLIENT_ID : 'bc6a4bddabaa55004090'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?
  process.env.GOOGLE_CLIENT_ID : '434664051101-ms06l6uja93lrjs3errmb73alb6dek1f.apps.googleusercontent.com'
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID ?
  process.env.FACEBOOK_CLIENT_ID : '395817644484509'
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID ?
  process.env.NAVER_CLIENT_ID : 'K1dzcT_4mOnrA7KTFVFq'
const GA_TRACKING_ID = process.env.GA_TRACKING_ID ?
  process.env.GA_TRACKING_ID : 'UA-137343905-1'

const env = {
  API_SERVER: JSON.stringify(API_SERVER),
  GITHUB_CLIENT_ID: JSON.stringify(GITHUB_CLIENT_ID),
  GOOGLE_CLIENT_ID: JSON.stringify(GOOGLE_CLIENT_ID),
  FACEBOOK_CLIENT_ID: JSON.stringify(FACEBOOK_CLIENT_ID),
  NAVER_CLIENT_ID: JSON.stringify(NAVER_CLIENT_ID),
  GA_TRACKING_ID: JSON.stringify(GA_TRACKING_ID),
}

console.log(JSON.stringify(env))

module.exports = withCSS(withGraphQL(withTypescript({
  webpack: (config, {}) => {
    config.resolve.alias = {
      'lib': path.join(__dirname, 'lib'),
      'stores': path.join(__dirname, 'stores'),
      'components': path.join(__dirname, 'components'),
      'styles': path.join(__dirname, 'styles'),
      'locales': path.join(__dirname, 'locales'),
      'routes': path.join(__dirname, 'routes'),
      'utils': path.join(__dirname, 'utils'),
    }
    config.resolve.extensions = ['.js', '.json', '.ts', '.tsx'],
    config.plugins.push(new webpack.DefinePlugin(env))
    // https://github.com/zeit/next-plugins/issues/273
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
})))
