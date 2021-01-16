import { MongoHelper } from '../../../src/infrastructure/utils/MongoHelper';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default class DatabaseHelper {
  private mongod: MongoMemoryServer;
  private db: MongoHelper;
  constructor() {}

  public async setup() {
    this.mongod = new MongoMemoryServer();
    const uri = await this.mongod.getUri();
    this.db = new MongoHelper(uri);
    const partners = await this.db.getCollection('partners');
    partners.createIndex({ document: 1 }, { unique: true });
  }

  public async teardown() {
    this.db.disconnect();
    await this.mongod.stop();
  }

  public getDb(): MongoHelper {
    return this.db;
  }

  public getInvalidDb(): MongoHelper {
    return new MongoHelper('invalidUri');
  }
}
