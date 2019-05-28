import {IsNotEmpty, IsOptional} from 'class-validator'

export class UserModel {
  @IsOptional()
  public id: string

  @IsNotEmpty()
  public username: string

  @IsNotEmpty()
  public password?: string

  constructor(id?: string, username?: string, password?: string) {
    this.id = id || ''
    this.username = username || ''
    this.password = password || ''
  }
}

export interface UserSchema {
  readonly username: string
  readonly id: string
  readonly password: string
}

export const userSchema = {
  id: String,
  password: String,
  username: {
    hashKey: true,
    type: String
  }
}
