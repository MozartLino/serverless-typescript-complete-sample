import { Address } from './Address_';
import { CoverageArea } from './CoverageArea_';
import { Document } from './Document_';
import { GeojsonType } from './GeojsonType_';
import { Partner } from './Partner_';

export class PartnerBuilder {
  private id: string;
  private tradingName: string;
  private ownerName: string;
  private document: Document;
  private coverageArea: CoverageArea;
  private address: Address;

  public withId(id: string): PartnerBuilder {
    this.id = id;
    return this;
  }

  public withTradingName(tradingName: string): PartnerBuilder {
    this.tradingName = tradingName;
    return this;
  }

  public withOwnerName(ownerName: string): PartnerBuilder {
    this.ownerName = ownerName;
    return this;
  }

  public withDocument(document: string): PartnerBuilder {
    this.document = Document.create(document);
    return this;
  }

  public withCoverageArea(coverageArea: CoverageArea): PartnerBuilder {
    this.coverageArea = coverageArea;
    return this;
  }

  public withAddress(address: Address): PartnerBuilder {
    this.address = address;
    return this;
  }

  public build(): Partner {
    return Partner.create(this.id, this.tradingName, this.ownerName, this.document, this.coverageArea, this.address);
  }
}

export class CoverageAreaBuilder {
  private type: GeojsonType;
  private coordinates: number[][][][];

  public withType(type: GeojsonType): CoverageAreaBuilder {
    this.type = type;
    return this;
  }

  public withCoordinates(coordinates: number[][][][]): CoverageAreaBuilder {
    this.coordinates = coordinates;
    return this;
  }

  public build(): CoverageArea {
    return CoverageArea.create(this.type, this.coordinates);
  }
}

export class AddressBuilder {
  private type: GeojsonType;
  private coordinates: number[];

  public withType(type: GeojsonType): AddressBuilder {
    this.type = type;
    return this;
  }

  public withCoordinates(coordinates: number[]): AddressBuilder {
    this.coordinates = coordinates;
    return this;
  }

  public build(): Address {
    return Address.create(this.type, this.coordinates);
  }
}
