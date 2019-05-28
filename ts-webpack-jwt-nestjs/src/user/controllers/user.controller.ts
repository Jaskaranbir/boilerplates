import {Body, ConflictException, Controller, Get, Post} from '@nestjs/common'

import {UserModel} from '@src/user/models/user.model'
import {UserRepository} from '@src/user/repositories/user.repository'
import {AuthService} from '@src/user/services'

interface AuthToken {
  readonly accessToken: string
}

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository
  ) {}

  @Get()
  public test(): string {
    return 'test'
  }

  @Post('login')
  public async login(@Body() credentials: UserModel): Promise<AuthToken> {
    const user = await this.userRepo.loginUser(credentials)

    const accessToken = this.authService.issue(user)
    return {accessToken}
  }

  @Post('register')
  public async register(@Body() credentials: UserModel): Promise<AuthToken> {
    try {
      const user = await this.userRepo.saveUser(credentials)

      const accessToken = this.authService.issue(user)
      return {accessToken}
    } catch (err) {
      if (err.code === 'ConditionalCheckFailedException') {
        throw new ConflictException('username already taken')
      }
      throw err
    }
  }

  @Post('validate')
  // tslint:disable-next-line:no-any
  public validate(@Body('accessToken') token: string): any {
    return this.authService.verify(token)
  }
}
