export class Document {
  private number: string;

  private constructor(number: string) {
    this.number = number;
  }

  public getNumber(): string {
    return this.number;
  }

  public static create(number: string): Document {
    return new Document(number);
  }
}
