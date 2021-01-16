require('dotenv').config();

export class Config {
  public mongo: MongoDataConfig;
  public app: AppDataConfig;

  public constructor() {
    this.mongo = {
      uri: process.env.MONGO_HOST,
      partnerCollection: process.env.MONGO_PARTNER_COLLECTION,
    };
    this.app = {
      port: process.env.PORT,
    };
  }
}

export interface AppDataConfig {
  port: string;
}

export interface MongoDataConfig {
  uri: string;
  partnerCollection: string;
}
