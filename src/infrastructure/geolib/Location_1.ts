import { CustomerCoordinate } from '../../domain/models/customer/CustomerCoordinate';
import { Partner } from '../../domain/models/partner/Partner_';
import { ILocation } from '../../domain/services/ILocation';

export class Location implements ILocation {
  private geoLocation: any;
  constructor(geoLocation: any) {
    this.geoLocation = geoLocation;
  }

  getDistance(partner: Partner, point: CustomerCoordinate): number {
    return this.geoLocation.getDistance(point, {
      longitude: partner.getLongitudeCoverageArea(),
      latitude: partner.getLatitudeCoverageArea(),
    });
  }
}
