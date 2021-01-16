import { DuplicateKeyException } from '../../../domain/exceptions/DuplicateKeyException';
import { NotFoundPartnerException } from '../../../domain/exceptions/NotFoundPartnerException';
import { SavePartnerException } from '../../../domain/exceptions/SavePartnerException';
import { Address } from '../../../domain/models/partner/address';
import { CoverageArea } from '../../../domain/models/partner/CoverageArea';
import { GeojsonType } from '../../../domain/models/partner/geojsonType';
import { IPartnerRepository } from '../../../domain/models/partner/IPartnerRepository';
import { Partner } from '../../../domain/models/partner/partner';
import { MongoHelper } from '../../utils/MongoHelper';
import { CodeException } from '../CodeException';
import { PartnerDBModel } from '../models/PartnerDBModel';
import { Repository } from './Repository';

export class RepositoryImpl extends Repository<PartnerDBModel> {
  constructor(db: MongoHelper, collectionName: string) {
    super(db, collectionName);
  }
}

export class PartnerRepository implements IPartnerRepository {
  private repository: RepositoryImpl;

  constructor(db: MongoHelper, collectionName: string) {
    this.repository = new RepositoryImpl(db, collectionName);
  }

  public async save(partner: Partner): Promise<Partner> {
    try {
      const partnerDBModel = this.toDbModel(partner);
      const result = await this.repository.save(partnerDBModel);

      return this.toDomain(result);
    } catch (error) {
      if (error.code === CodeException.DuplicateKeyException) {
        throw new DuplicateKeyException(error.message);
      }

      throw new SavePartnerException(error.message);
    }
  }

  public async findOne(id: string): Promise<Partner> {
    try {
      const partnerDBModel = await this.repository.findOne({ _id: id });

      if (!partnerDBModel) {
        throw new NotFoundPartnerException('Partner id not found');
      }

      return this.toDomain(partnerDBModel);
    } catch (error) {
      if (error instanceof NotFoundPartnerException) {
        throw error;
      }

      throw new SavePartnerException(error.message);
    }
  }

  private toDbModel(partner: Partner): PartnerDBModel {
    return {
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

  private toDomain(partnerDBModel: PartnerDBModel): Partner {
    return Partner.builder()
      .withId(partnerDBModel._id)
      .withTradingName(partnerDBModel.tradingName)
      .withOwnerName(partnerDBModel.ownerName)
      .withDocument(partnerDBModel.document)
      .withCoverageArea(
        CoverageArea.builder().withType(GeojsonType[partnerDBModel.address.type]).withCoordinates(partnerDBModel.coverageArea.coordinates).build()
      )
      .withAddress(Address.builder().withType(GeojsonType[partnerDBModel.coverageArea.type]).withCoordinates(partnerDBModel.address.coordinates).build())
      .build();
  }
}
