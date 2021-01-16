export class Logger {
  public static error = (error: Error) => console.log(JSON.stringify(error));
}
