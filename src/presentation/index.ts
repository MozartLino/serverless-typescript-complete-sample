import { PartnerService } from '../application/services/partnerService';
import { Config } from '../infrastructure/config/Config';
import { PartnerRepository } from '../infrastructure/mongodb/repositories/PartnerRepository';
import { MongoHelper } from '../infrastructure/utils/MongoHelper';
import { PartnerController } from './controllers/PartnerController';

const configs = new Config();
const mongoHelper = new MongoHelper(configs.mongo.uri);
const partnerRepository = new PartnerRepository(mongoHelper, configs.mongo.partnerCollection);
const partnerService = new PartnerService(partnerRepository);
const partnerController = new PartnerController(partnerService);

export const postPartner = (event: any) => {
  return partnerController.post(event);
};

export const getPartner = (event: any) => {
  return partnerController.get(event);
};

export const getPartnerByCoordinates = (event: any) => {
  return partnerController.getPartnerByCoordinates(event);
};
