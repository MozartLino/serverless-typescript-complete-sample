import * as geolib from 'geolib';
import { PartnerService } from '../application/services/PartnerService';
import { PartnerLocation } from '../domain/services/PartnerLocation';
import { Config } from '../infrastructure/config/Config';
import { Location } from '../infrastructure/geolib/Location';
import { PartnerRepository } from '../infrastructure/mongodb/repositories/PartnerRepository';
import { MongoHelper } from '../infrastructure/utils/MongoHelper';
import { PartnerController } from './controllers/PartnerController';

const configs = new Config();
const mongoHelper = new MongoHelper(configs.mongo.uri);
const location = new Location(geolib);
const partnerRepository = new PartnerRepository(mongoHelper, configs.mongo.partnerCollection);
const partnerLocation = new PartnerLocation(location);
const partnerService = new PartnerService(partnerRepository, partnerLocation);
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
