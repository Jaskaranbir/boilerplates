const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = (prodEnv, {
  NODE_ENV: 'development'
})
