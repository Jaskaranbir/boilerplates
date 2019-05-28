const chalk = require('chalk')
const notifier = require('node-notifier')
const stripAnsi = require('strip-ansi')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const config = require('./config')

module.exports = {
  context: config.common.baseDir,

  entry: {
    ...config.common.entry
  },

  stats: 'normal',
  target: 'node',
  output: {
    filename: '[name].js',
    path: config.common.assetsRoot
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js'],
    alias: config.common.alias
  },

  optimization: {
    noEmitOnErrors: true
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: `  Progress [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false
    }),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Successfully compiled modules']
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return
        }

        // Notify one error at a time
        // Let the poor dev breathe a lil'
        const error = errors[0]
        notifier.notify({
          title: 'Build Error',
          message: `${severity}: ${stripAnsi(error.message)}`,
          subtitle: error.file || ''
        })
      },
      clearConsole: false
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  }
}
