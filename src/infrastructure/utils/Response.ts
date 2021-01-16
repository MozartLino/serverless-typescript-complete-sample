import Boom = require('boom');
import { DuplicateKeyException } from '../../domain/exceptions/DuplicateKeyException';
import { IllegalArgumentException } from '../../domain/exceptions/IllegalArgumentException';
import { SavePartnerException } from '../../domain/exceptions/SavePartnerException';
import { Logger } from './Logger';

export class Response {
  constructor() {}

  public static success(result: any, statusCode = 200): ResponseData {
    return {
      body: JSON.stringify(result),
      statusCode,
    };
  }

  public static error(error: Error): ResponseData {
    return this.handler(error).output.payload;
  }

  private static handler(error): Boom {
    Logger.error(error);

    if (error instanceof IllegalArgumentException) {
      return Boom.badRequest();
    }
    if (error instanceof DuplicateKeyException) {
      return Boom.conflict();
    }
    if (error instanceof SavePartnerException) {
      return Boom.serverUnavailable();
    }

    return Boom.internal();
  }
}

export type ResponseData = {
  statusCode: number;
  body?: any;
  message?: string;
  error?: string;
};
