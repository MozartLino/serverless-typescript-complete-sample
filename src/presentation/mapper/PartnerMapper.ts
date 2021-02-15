import { Partner } from '../../domain/models/partner/Partner';
import { PartnerViewModel } from '../model/PartnerViewModel';

export class PartnerMapper {
  public static toModelView(partner: Partner): PartnerViewModel {
    return {
      id: partner.getId(),
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
}
