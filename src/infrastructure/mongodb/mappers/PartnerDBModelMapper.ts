import { Address } from '../../../domain/models/partner/Address_';
import { CoverageArea } from '../../../domain/models/partner/CoverageArea_';
import { GeojsonType } from '../../../domain/models/partner/GeojsonType_';
import { Partner } from '../../../domain/models/partner/Partner_';
import { PartnerDBModel } from '../models/PartnerDBModel';

export class PartnerDBModelMapper {
  public static toDbModel(partner: Partner): PartnerDBModel {
    return {
      tradingName: partner.getTradingName(),
      ownerName: partner.getOwnerName(),
      document: partner.getDocumentNumber(),
      coverageArea: {
        type: partner.getCoverageAreaType(),
        coordinates: partner.getCoverageCoordinates(),
      },
      address: {
        type: partner.getAddressType(),
        coordinates: partner.getAddressCoordinates(),
      },
    };
  }

  public static toDomain(partnerDBModel: PartnerDBModel): Partner {
    return Partner.builder()
      .withId(partnerDBModel._id)
      .withTradingName(partnerDBModel.tradingName)
      .withOwnerName(partnerDBModel.ownerName)
      .withDocument(partnerDBModel.document)
      .withCoverageArea(
        CoverageArea.builder().withType(GeojsonType[partnerDBModel.coverageArea.type]).withCoordinates(partnerDBModel.coverageArea.coordinates).build()
      )
      .withAddress(Address.builder().withType(GeojsonType[partnerDBModel.address.type]).withCoordinates(partnerDBModel.address.coordinates).build())
      .build();
  }
}
