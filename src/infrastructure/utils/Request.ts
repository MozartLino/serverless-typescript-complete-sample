export class Request {
  public static parse(result: any): any {
    return JSON.parse(result);
  }
}
