import Boom = require('boom');
import { DuplicateKeyException } from '../../domain/exceptions/DuplicateKeyException';
import { IllegalArgumentException } from '../../domain/exceptions/IllegalArgumentException';
import { NotFoundPartnerException } from '../../domain/exceptions/NotFoundPartnerException';
import { SavePartnerException } from '../../domain/exceptions/SavePartnerException';
import { Logger } from './Logger';

export class Response {
  public static success(result: any, statusCode): ResponseData {
    const payload = {
      body: JSON.stringify(result),
      statusCode,
    };

    Logger.success(payload);

    return payload;
  }

  public static error(error: Error): ResponseData {
    Logger.error(error);
    const payload = this.handler(error).output.payload;

    return {
      body: JSON.stringify(payload),
      statusCode: payload.statusCode,
    };
  }

  private static handler(error): Boom {
    const exception = [
      { errorName: IllegalArgumentException.name, boomMethodName: Boom.badRequest.name },
      { errorName: DuplicateKeyException.name, boomMethodName: Boom.conflict.name },
      { errorName: SavePartnerException.name, boomMethodName: Boom.serverUnavailable.name },
      { errorName: NotFoundPartnerException.name, boomMethodName: Boom.notFound.name },
    ].find((exception) => exception.errorName === error.constructor.name);

    return Boom[exception.boomMethodName]();
  }
}

export type ResponseData = {
  statusCode: number;
  body?: any;
  message?: string;
  error?: string;
};
