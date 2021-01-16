import { MongoClient, Collection } from "mongodb";

export class MongoHelper {
  private client: MongoClient;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async getCollection(collectionName: string): Promise<Collection> {
    if (!this.isConnected()) {
      this.client = await this.connect();
    }

    return this.client.db().collection(collectionName);
  }

  public disconnect(): void {
    this.client.close();
  }

  private connect(): Promise<MongoClient> {
    return MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  private isConnected(): boolean {
    return this.client && this.client.isConnected();
  }
}
