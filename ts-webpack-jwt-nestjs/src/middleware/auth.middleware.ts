import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common'
import {NextFunction, Request, Response} from 'express'

import {BasicLogger} from '@src/logger'
import {AuthService} from '@src/user/services'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // Note: We currently don't check for sub-endpoints.
  // For example, if you exclude "/test/subtest", then
  // "/test/anothertest" is also excluded.
  private readonly exclusions: ReadonlyArray<string>

  constructor(
    private readonly log: BasicLogger,
    private readonly authService: AuthService
  ) {
    this.exclusions = ['user']
  }

  public use(req: Request, _: Response, next: NextFunction): void {
    const urlParts = req.baseUrl.split('/')
    // No Auth required for this endpoint
    if (this.exclusions.includes(urlParts[1])) {
      this.log.debug(`Route excluded from auth: ${req.baseUrl}`)
      return next()
    }

    const authHeader = req.header('Authorization')
    if (!authHeader) {
      throw new UnauthorizedException()
    }

    const parts = req.header('Authorization').split(' ')
    const scheme = parts[0]
    if (!scheme) {
      throw new UnauthorizedException()
    }

    const credentials = parts[1]
    try {
      this.authService.verify(credentials)
    } catch (err) {
      throw new UnauthorizedException(err.message)
    }
    next()
  }
}
