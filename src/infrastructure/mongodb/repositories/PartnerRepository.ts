import { DuplicateKeyException } from '../../../domain/exceptions/DuplicateKeyException';
import { SavePartnerException } from '../../../domain/exceptions/SavePartnerException';
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

  public async save(partner: Partner): Promise<void> {
    try {
      const partnerDBModel = this.toDbModel(partner);

      await this.repository.save(partnerDBModel);
    } catch (error) {
      if (error.code === CodeException.DuplicateKeyException) {
        throw new DuplicateKeyException(error.message);
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
}
