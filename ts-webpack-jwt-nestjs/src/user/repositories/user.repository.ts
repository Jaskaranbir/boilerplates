import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import {ModelConstructor, ModelSchema} from 'dynamoose'
import {v4 as uuid4} from 'uuid'

import {UserModel, userSchema, UserSchema} from '@src/user/models/user.model'
import {BCryptService, DBService} from '@src/user/services'

@Injectable()
export class UserRepository {
  private readonly userModel: ModelConstructor<UserSchema, UserSchema>

  constructor(
    private readonly dbService: DBService,
    private readonly bcryptService: BCryptService
  ) {
    this.userModel = this.dbService.createModel<UserSchema, UserSchema>(
      'User',
      userSchema
    )
  }

  public async saveUser(u: UserModel): Promise<UserModel> {
    if (!u.password) {
      throw new Error('password cannot be empty')
    }

    const user = {
      ...u,
      id: u.id || uuid4(),
      password: this.bcryptService.createHash(u.password)
    }
    const model = new this.userModel(user)
    await model.save({
      overwrite: false
      // (Buggy type-definition)
      // tslint:disable-next-line:no-any
    } as any)

    return {
      ...user,
      password: ''
    }
  }

  public async loginUser(u: UserModel): Promise<UserSchema> {
    return new Promise(
      (resolve: (value?: UserSchema) => void, reject: (reason?: Error) => void): void => {
        if (!u.password) {
          return reject(new BadRequestException('password cannot be empty'))
        }

        this.userModel.queryOne(
          {
            username: {
              eq: u.username
            }
          },
          (err: Error, user: ModelSchema<UserSchema>) => {
            if (err) {
              return reject(new InternalServerErrorException(err.message))
            }

            if (!user) {
              return reject(new UnauthorizedException('invalid username or password'))
            }

            const isPasswordCorrect = this.bcryptService.comparePassword(
              u.password || '',
              user.password
            )
            if (!isPasswordCorrect) {
              return reject(new UnauthorizedException('invalid username or password'))
            }

            resolve({
              ...user,
              password: ''
            })
          }
        )
      }
    )
  }
}
