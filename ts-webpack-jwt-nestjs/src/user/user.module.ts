import {Module} from '@nestjs/common'

import {BasicLogger} from '@src/logger'
import {UserController} from '@src/user/controllers'
import {UserRepository} from '@src/user/repositories/user.repository'
import {AuthService, BCryptService, DBService} from '@src/user/services'

@Module({
  controllers: [UserController],
  providers: [BasicLogger, UserRepository, AuthService, BCryptService, DBService]
})
export class UserModule {}
