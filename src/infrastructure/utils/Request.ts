export class Request {
  constructor() {}

  public static parse(result: any): any {
    return JSON.parse(result);
  }
}
