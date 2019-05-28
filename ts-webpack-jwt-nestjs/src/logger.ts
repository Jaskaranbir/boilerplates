import {Injectable, LoggerService} from '@nestjs/common'
import BunyanLogger from 'bunyan'
import bunyanFormat from 'bunyan-format'
import {lowerCase} from 'change-case'
import supportsColor from 'supports-color'

@Injectable()
export class BasicLogger implements LoggerService {
  private readonly logger: BunyanLogger

  constructor() {
    this.logger = new BunyanLogger({
      // tslint:disable-next-line:no-any
      level: this.validateLogLevel(process.env.LOG_LEVEL || 'info') as any,
      name: 'backend',

      stream: new bunyanFormat({
        color: supportsColor.stdout,
        // tslint:disable-next-line:no-any
        outputMode: this.validateFormat(process.env.LOG_FORMAT || 'short') as any
      })
    })
  }

  private validateLogLevel(level: string): string | never {
    const finalLevel = lowerCase(level)
    switch (finalLevel) {
      case 'info':
      case 'trace':
      case 'debug':
      case 'warn':
      case 'error':
      case 'fatal':
      case undefined:
        return finalLevel
      default:
        throw new Error('Invalid log level')
    }
  }

  private validateFormat(format: string): string | never {
    const finalFormat = lowerCase(format)
    switch (format) {
      case 'short':
      case 'long':
      case 'simple':
      case 'json':
      case 'bunyan':
      case undefined:
        return finalFormat
      default:
        throw new Error('Invalid log format')
    }
  }

  public trace(message: string): void {
    this.logger.trace('%s', message)
  }

  public debug(message: string): void {
    this.logger.debug('%s', message)
  }

  public info(message: string): void {
    this.logger.info('%s', message)
  }

  public log(message: string): void {
    this.logger.info('%s', message)
  }

  public warn(message: string): void {
    this.logger.warn('%s', message)
  }

  public error(message: string, stack: string): void {
    this.logger.error(message, stack)
  }

  public fatal(message: string): void {
    this.logger.fatal('%s', message)
  }
}
