export class Logger {
  public static error = (error: Error) => console.log(JSON.stringify(error));
  public static success = (success: any) => console.log(JSON.stringify(success));
}
