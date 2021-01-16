export class DuplicateKeyException extends Error {
  constructor(message: string) {
    super(message);
  }
}
