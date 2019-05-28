import 'core-js'

import {INestApplication, ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import chalk from 'chalk'

import {AppModule} from '@src/app.module'
import envConfig from '@src/env-config'
import {BasicLogger} from '@src/logger'

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(new BasicLogger())

  await app.listen(envConfig.port)
  return app
}

function handleHMR(app: INestApplication): void {
  // Enable HMR in development
  if (envConfig.nodeEnv === 'development' && module.hot) {
    // Just making sure dev code doesn't go unnoticed in production
    console.warn(
      chalk.bgYellowBright.red.bold.italic(' Hot Module Reloading is active! ')
    )

    module.hot.accept()
    module.hot.dispose(async () => await app.close())
  }
}

bootstrap()
  .then((app: INestApplication): void => handleHMR(app))
  .catch((err: Error): void => console.error(err))
