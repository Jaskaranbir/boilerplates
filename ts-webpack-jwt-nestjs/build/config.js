const path = require('path')
const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')

function resolve(...args) {
  return path.resolve(__dirname, '..', ...args)
}

console.log(resolve())

const srcDir = 'src'

module.exports = {
  common: {
    assetsRoot: resolve('dist'),
    baseDir: resolve('.'),
    srcDir,

    entry: {
      'main': resolve(srcDir, 'main.ts')
    },
    alias: {
      '@root': resolve('.'),
      '@src': resolve(srcDir)
    }
  },

  dev: {
    env: devEnv,
    tsCheckerWatch: [
      resolve(srcDir)
    ]
  },

  prod: {
    env: prodEnv
  }
}
