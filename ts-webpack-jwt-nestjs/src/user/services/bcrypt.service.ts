import {Injectable} from '@nestjs/common'
import bcrypt from 'bcrypt-nodejs'

@Injectable()
export class BCryptService {
  public createHash(password: string): string {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)

    return hash
  }

  public comparePassword(pw: string, hash: string): boolean {
    return bcrypt.compareSync(pw, hash)
  }
}
