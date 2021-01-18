import { IllegalArgumentException } from '../../domain/exceptions/IllegalArgumentException';
import { Address } from '../../domain/models/partner/address';
import { CoverageArea } from '../../domain/models/partner/coverageArea_';
import { GeojsonType } from '../../domain/models/partner/geojsonType';
import { Partner } from '../../domain/models/partner/partner';
export class PartnerMapper {
  public static toDomain(requestPartner: PartnerApplicationModel): Partner {
    try {
      const builder = Partner.builder()
        .withTradingName(requestPartner.tradingName)
        .withOwnerName(requestPartner.ownerName)
        .withDocument(requestPartner.document);

      if (requestPartner.coverageArea) {
        builder.withCoverageArea(
          CoverageArea.builder().withType(GeojsonType.MultiPolygon).withCoordinates(requestPartner.coverageArea.coordinates).build()
        );
      }

      if (requestPartner.address) {
        builder.withAddress(Address.builder().withType(GeojsonType.Point).withCoordinates(requestPartner.address.coordinates).build());
      }

      return builder.build();
    } catch (error) {
      if (error instanceof IllegalArgumentException) {
        throw error;
      }

      throw new IllegalArgumentException('Invalid request body: error when try to create model partner');
    }
  }
}

export type PartnerApplicationModel = {
  id?: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: {
    type: string;
    coordinates: number[][][][];
  };
  address: {
    type: string;
    coordinates: number[];
  };
};

export type PartnerApplicationModelId = { id: string };

export type LocationApplicationModel = { longitude: number; latitude: number };
