import { IllegalArgumentException } from '../../exceptions/IllegalArgumentException';
import { GeojsonType } from './GeojsonType_';
import { AddressBuilder } from './PartnerBuilder';

export class Address {
  private type: GeojsonType;
  private coordinates: number[];

  private constructor(type: GeojsonType, coordinates: number[]) {
    this.type = type;
    this.coordinates = coordinates;
  }

  public getType(): GeojsonType {
    return this.type;
  }

  public getCoordinates(): number[] {
    return this.coordinates;
  }

  static create(type: GeojsonType, coordinates: number[]): Address {
    if (!type) {
      throw new IllegalArgumentException('Property type must be defined');
    }

    if (!coordinates) {
      throw new IllegalArgumentException('Property coordinates must be defined');
    }

    return new Address(type, coordinates);
  }

  public static builder(): AddressBuilder {
    return new AddressBuilder();
  }
}
