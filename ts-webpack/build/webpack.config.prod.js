const merge = require('webpack-merge')
const webpack = require('webpack')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.config.base')
const config = require('./config')

module.exports = merge(baseConfig, {
  entry: config.common.entry,

  devtool: 'source-map',
  mode: 'production',

  optimization: {
    mergeDuplicateChunks: true,
    minimize: true,
    namedModules: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
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
