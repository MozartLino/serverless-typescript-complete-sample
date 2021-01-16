import { v4 as uuid } from 'uuid';
import { MongoHelper } from '../../utils/MongoHelper';

export class Repository<T> {
  private db: MongoHelper;
  private collectionName: string;

  constructor(db: MongoHelper, collectionName: string) {
    this.db = db;
    this.collectionName = collectionName;
  }

  public async save(item: T): Promise<T> {
    const collection = await this.db.getCollection(this.collectionName);
    const result = await collection.insertOne(Object.assign({ _id: uuid() }, item));

    return result.ops[0];
  }

  public async findOne(filter: any): Promise<T> {
    const collection = await this.db.getCollection(this.collectionName);
    return await collection.findOne(filter);
  }
}
