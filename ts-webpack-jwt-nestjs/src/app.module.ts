import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import {Request, Response} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import {BasicLogger} from '@src/logger'
import {AuthMiddleware} from '@src/middleware'
import {AuthService} from '@src/user/services'
import {UserModule} from '@src/user/user.module'

@Module({
  imports: [UserModule],
  providers: [AuthService, BasicLogger]
})
export class AppModule implements NestModule {
  private readonly morganLevel: string

  constructor() {
    this.morganLevel = process.env.NODE_ENV === 'development' ? 'dev' : 'common'
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        helmet(),
        // Route-logging
        morgan(this.morganLevel, {
          skip: (_: Request, res: Response): boolean => res.statusCode < 400,
          stream: process.stdout
        }),
        morgan(this.morganLevel, {
          skip: (_: Request, res: Response): boolean => res.statusCode >= 400,
          stream: process.stderr
        })
      )
      .forRoutes('*')
      // App-middlewares
      .apply(AuthMiddleware)
      .forRoutes('*')
  }
}
