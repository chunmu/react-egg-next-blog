const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.config.base')
const paths = require('./paths')
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': false //eslint-disable-line
  })
]

const webpackModule = {
  rules: [
    {
      oneOf: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: 'css'
                }
              ],
              [
                'import',
                {
                  libraryName: 'ant-design-pro',
                  libraryDirectory: 'lib',
                  camel2DashComponentName: false,
                },
                'ant-design-pro'
              ],
            ]
          }
        }
      ]
    }
  ]
}

module.exports = merge(baseConfig, {
  devtool: isDev ? 'eval-source-map' : '',
  entry: {
    Page: paths.entry,
    Layout: paths.layout
  },
  target: 'node',
  module: webpackModule,
  externals: nodeExternals({
    whitelist: [/\.(css|less|sass|scss)$/, /^antd.*?css/],
    modulesDir: paths.appNodeModules
  }),
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins
})
