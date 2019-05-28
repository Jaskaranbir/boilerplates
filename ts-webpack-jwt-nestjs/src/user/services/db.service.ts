import {Injectable} from '@nestjs/common'
import dynamoose, {ModelConstructor, Schema, SchemaAttributes} from 'dynamoose'

import envConfig from '@src/env-config'

@Injectable()
export class DBService {
  constructor() {
    // This is the primary function of this service,
    // to control how DB gets initialized and writes data
    if (envConfig.nodeEnv === 'development') {
      // tslint:disable-next-line: no-object-mutation
      dynamoose.AWS.config.sslEnabled = false
      dynamoose.local('localhost:8000')
    }
  }

  public createModel<DataSchema, KeySchema>(
    name: string,
    schema: Schema | SchemaAttributes
  ): ModelConstructor<DataSchema, KeySchema> {
    return dynamoose.model<DataSchema, KeySchema>(name, schema)
  }
}
