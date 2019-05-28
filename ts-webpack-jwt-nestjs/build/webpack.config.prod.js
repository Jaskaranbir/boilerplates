const merge = require('webpack-merge')
const webpack = require('webpack')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const config = require('./config')

module.exports = merge(baseConfig, {
  entry: config.common.entry,
  mode: 'production',

  optimization: {
    mergeDuplicateChunks: true,
    namedModules: true,
    removeAvailableModules: true,
    removeEmptyChunks: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new ForkTsCheckerPlugin({
      async: false,
      formatter: 'codeframe',
      tslint: true,
      tslintAutoFix: true,
      useTypescriptIncrementalApi: true,
      watch: config.dev.tsCheckerWatch
    }),

    new webpack.DefinePlugin(config.prod.env)
  ]
})
