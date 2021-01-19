import { ILocation } from './ILocation';
import { Partner } from '../models/partner/partner';
import { CustomerCoordinate } from '../models/customer/CustomerCoordinate';

export class PartnerLocation {
  private location: ILocation;

  constructor(location: ILocation) {
    this.location = location;
  }

  public getNearest(partners: Partner[], point: CustomerCoordinate): Partner {
    return this.sort(partners, point)[0];
  }

  private sort(partners: Partner[], point: CustomerCoordinate): Partner[] {
    return partners.sort((a, b) => this.location.getDistance(a, point) - this.location.getDistance(b, point));
  }
}
