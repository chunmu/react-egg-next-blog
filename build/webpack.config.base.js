'use strict'

const paths = require('./paths')
// style files regexes
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const getStyleLoaders = require('./util').getStyleLoaders
const withLess = require("@zeit/next-less");

const webpackModule = {
  strictExportPresence: true,
  rules: [
    { parser: { requireEnsure: false } },
    {
      oneOf: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  modules: false
                }
              ],
              ['react-app', { flow: false, typescript: true }]
            ],
            plugins: [
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: 'css'
                }
              ],
              [
                'import',
                {
                  libraryName: 'ant-design-pro',
                  libraryDirectory: 'es',
                  camel2DashComponentName: false,
                  style: 'css'
                },
                'ant-design-pro'
              ],
            ]
          }
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1
          })
        },
        {
          test: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent
          })
        },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              localIdentName: '[local]',
              modules: true,
            },
            'less-loader'
          ),
          sideEffects: true
        },
        {
          test: /\.module\.less$/,
          use: getStyleLoaders(
            {
              lessOptions: {
                javascriptEnabled: true,
              },
              importLoaders: 2,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            },
            'less-loader'
          )
        },
        {
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  ]
}

module.exports = {
  stats: {
    children: false,
    entrypoints: false
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': paths.appSrc
    },
    extensions: paths.moduleFileExtensions
      .map(ext => `.${ext}`)
  },
  module: webpackModule,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunk.css'
    })
  ],
  performance: false
}
