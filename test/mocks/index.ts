import { PartnerService } from '../../src/application/services/partnerService';
import { Address } from '../../src/domain/models/partner/address';
import { CoverageArea } from '../../src/domain/models/partner/coverageArea';
import { Document } from '../../src/domain/models/partner/document';
import { GeojsonType } from '../../src/domain/models/partner/geojsonType';
import { PartnerRepository } from '../../src/infrastructure/mongodb/repositories/PartnerRepository';
import { MongoHelper } from '../../src/infrastructure/utils/MongoHelper';
import { partnerGuaianases, partnerPinheiros, simplePartner, partnerGuaianasesSmallCoveregeArea } from './partners';

export const partnerMock = simplePartner;
export const partnerGuaianasesMock = { body: JSON.stringify(partnerGuaianases) };
export const partnerGuaianasesSmallCoveregeAreaMock = { body: JSON.stringify(partnerGuaianasesSmallCoveregeArea) };
export const partnerPinheirosMock = { body: JSON.stringify(partnerPinheiros) };
export const newPartnerEvent = { body: JSON.stringify(simplePartner) };
export const newInvalidAddressPartnerEvent = { body: JSON.stringify({ ...simplePartner, address: null }) };

export const address = Address.create(GeojsonType[partnerMock.address.type], partnerMock.address.coordinates);
export const coverageArea = CoverageArea.create(GeojsonType[partnerMock.coverageArea.type], partnerMock.coverageArea.coordinates);
export const document = Document.create('111111111/0001');

export const partnerService = async (db: MongoHelper): Promise<PartnerService> => {
  const partnerRepository = new PartnerRepository(db, 'partners');
  const partnerService = new PartnerService(partnerRepository);

  return partnerService;
};
