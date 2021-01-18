import { IllegalArgumentException } from '../../exceptions/IllegalArgumentException';
import { Address } from './address';
import { CoverageArea } from './coverageArea';
import { Document } from './document';
import { PartnerBuilder } from './partnerBuilder';

export class Partner {
  private id: string;
  private tradingName: string;
  private ownerName: string;
  private document: Document;
  private coverageArea: CoverageArea;
  private address: Address;
  public static LONGITUDE = 0;
  public static LATITUDE = 1;

  private constructor(id: string, tradingName: string, ownerName: string, document: Document, coverageArea: CoverageArea, address: Address) {
    this.id = id;
    this.tradingName = tradingName;
    this.ownerName = ownerName;
    this.document = document;
    this.coverageArea = coverageArea;
    this.address = address;
  }

  public getId(): string {
    return this.id;
  }

  public getTradingName(): string {
    return this.tradingName;
  }

  public getOwnerName(): string {
    return this.ownerName;
  }

  public getDocumentNumber(): string {
    return this.document.getNumber();
  }

  public getCoverageArea(): CoverageArea {
    return this.coverageArea;
  }

  public getAddress(): Address {
    return this.address;
  }

  public getAddressCoordinates(): number[] {
    return this.getAddress().getCoordinates();
  }

  public getAddressType(): string {
    return this.getAddress().getType();
  }

  public getCoverageCoordinates(): number[][][][] {
    return this.getCoverageArea().getCoordinates();
  }

  public getCoverageAreaType(): string {
    return this.getCoverageArea().getType();
  }

  public static builder(): PartnerBuilder {
    return new PartnerBuilder();
  }

  public validate(): boolean {
    ['tradingName', 'document', 'coverageArea', 'address'].map((field) => {
      if (!this[field]) {
        throw new IllegalArgumentException(`Property ${field} must be defined`);
      }
    });

    return true;
  }

  public static create(id: string, tradingName: string, ownerName: string, document: Document, coverageArea: CoverageArea, address: Address): Partner {
    const partner = new Partner(id, tradingName, ownerName, document, coverageArea, address);
    partner.validate();

    return partner;
  }
}
