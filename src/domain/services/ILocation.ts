import { CustomerCoordinate } from '../models/customer/CustomerCoordinate';
import { Partner } from '../models/partner/Partner';

export interface ILocation {
  getDistance(partner: Partner, clientLocation: CustomerCoordinate): number;
}
