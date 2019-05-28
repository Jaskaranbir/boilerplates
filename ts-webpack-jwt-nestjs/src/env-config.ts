import {constantCase} from 'change-case'

import config from '@root/app.config.json'

const isDevEnv = process.env.NODE_ENV === 'development'
const envConfig = isDevEnv ? config.dev : config.prod

const mergedEnv = {
  ...config.common.env,
  ...envConfig.env
}

// Set env-vars
// Converts env-vars from camel-case to constant-case
Object.keys(mergedEnv).forEach((key: string) => {
  const envKey = constantCase(key)
  // tslint:disable-next-line: no-object-mutation no-any
  process.env[envKey] = (mergedEnv as any)[key]
})

export default {
  nodeEnv: process.env.NODE_ENV,
  ...config.common,
  ...envConfig,
  env: mergedEnv
}
