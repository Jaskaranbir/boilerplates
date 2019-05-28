import {Injectable} from '@nestjs/common'
import jwt from 'jsonwebtoken'

import envConfig from '@src/env-config'
import {UserModel} from '@src/user/models/user.model'

@Injectable()
export class AuthService {
  public issue(user: UserModel): string {
    // Remove "password"
    const {password, ...payload}: UserModel = user

    return jwt.sign({user: payload}, envConfig.env.jwtSecret, {
      expiresIn: envConfig.env.jwtTTLSec
    })
  }

  public verify(token: string): string | object | never {
    return jwt.verify(token, envConfig.env.jwtSecret, {})
  }
}
