import * as geolib from 'geolib';
import { Partner } from '../../domain/models/partner/partner';
import { PartnerDBModel } from '../mongodb/models/PartnerDBModel';

export class FindNearest {
  public static from(clientCoordinates: GeolibCoordinates, partners: PartnerDBModel[]): PartnerDBModel {
    const partnersCordinates = partners.map((partner) => ({
      ...partner,
      longitude: partner.address.coordinates[Partner.LONGITUDE],
      latitude: partner.address.coordinates[Partner.LATITUDE],
    }));

    return <PartnerDBModel>(<unknown>geolib.findNearest(clientCoordinates, partnersCordinates));
  }
}

export type GeolibCoordinates = { longitude: number; latitude: number };
