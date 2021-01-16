import { PartnerService } from '../../src/application/services/partner';
import { Address } from '../../src/domain/models/partner/address';
import { CoverageArea } from '../../src/domain/models/partner/CoverageArea';
import { Document } from '../../src/domain/models/partner/document';
import { GeojsonType } from '../../src/domain/models/partner/geojsonType';
import { PartnerRepository } from '../../src/infrastructure/mongodb/repositories/PartnerRepository';
import { MongoHelper } from '../../src/infrastructure/utils/MongoHelper';

export const partnerMock = {
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001',
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20],
        ],
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5],
        ],
      ],
    ],
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741],
  },
};

export const newPartnerEvent = {
  body: JSON.stringify(partnerMock),
};

export const newInvalidAddressPartnerEvent = {
  body: JSON.stringify({ ...partnerMock, address: null }),
};

export const address = Address.create(GeojsonType[partnerMock.address.type], partnerMock.address.coordinates);

export const coverageArea = CoverageArea.create(GeojsonType[partnerMock.coverageArea.type], partnerMock.coverageArea.coordinates);

export const document = Document.create('111111111/0001');

export const partnerService = async (db: MongoHelper): Promise<PartnerService> => {
  const partnerRepository = new PartnerRepository(db, 'partners');
  const partnerService = new PartnerService(partnerRepository);

  return partnerService;
};
