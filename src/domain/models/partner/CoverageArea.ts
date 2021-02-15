import { IllegalArgumentException } from '../../exceptions/IllegalArgumentException';
import { GeojsonType } from './GeojsonType';
import { CoverageAreaBuilder } from './PartnerBuilder_';

export class CoverageArea {
  private type: GeojsonType;
  private coordinates: number[][][][];

  private constructor(type: GeojsonType, coordinates: number[][][][]) {
    this.type = type;
    this.coordinates = coordinates;
  }

  public getType(): GeojsonType {
    return this.type;
  }

  public getCoordinates(): number[][][][] {
    return this.coordinates;
  }

  public static create(type: GeojsonType, coordinates: number[][][][]) {
    if (!type) {
      throw new IllegalArgumentException('Property type must be defined');
    }

    if (!coordinates) {
      throw new IllegalArgumentException('Property coordinates must be defined');
    }

    return new CoverageArea(type, coordinates);
  }

  public static builder(): CoverageAreaBuilder {
    return new CoverageAreaBuilder();
  }
}
