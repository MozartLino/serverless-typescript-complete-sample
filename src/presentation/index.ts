import { PartnerService } from '../application/services/partner';
import { Config } from '../infrastructure/config/Config';
import { PartnerRepository } from '../infrastructure/mongodb/repositories/PartnerRepository';
import { MongoHelper } from '../infrastructure/utils/MongoHelper';
import { PartnerController } from './controllers/PartnerController';

const configs = new Config();
const mongoHelper = new MongoHelper(configs.mongo.uri);
const partnerRepository = new PartnerRepository(mongoHelper, configs.mongo.partnerCollection);
const partnerService = new PartnerService(partnerRepository);
const partnerController = new PartnerController(partnerService);

export const savePartner = (event: any) => {
  return partnerController.save(event);
};