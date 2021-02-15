import { DuplicateKeyException } from '../../../domain/exceptions/DuplicateKeyException';
import { NotFoundPartnerException } from '../../../domain/exceptions/NotFoundPartnerException';
import { SavePartnerException } from '../../../domain/exceptions/SavePartnerException';
import { GeojsonType } from '../../../domain/models/partner/GeojsonType';
import { IPartnerRepository } from '../../../domain/models/partner/IPartnerRepository';
import { Partner } from '../../../domain/models/partner/Partner';
import { MongoHelper } from '../../utils/MongoHelper';
import { Util } from '../../utils/Util';
import { CodeException } from '../CodeException';
import { PartnerDBModelMapper } from '../mappers/PartnerDBModelMapper';
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
      const partnerDBModel = PartnerDBModelMapper.toDbModel(partner);
      const result = await this.repository.save(partnerDBModel);

      return PartnerDBModelMapper.toDomain(result);
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

      return PartnerDBModelMapper.toDomain(partnerDBModel);
    } catch (error) {
      if (error instanceof NotFoundPartnerException) {
        throw error;
      }

      throw new SavePartnerException(error.message);
    }
  }

  public async findWithin(coordinates: number[]): Promise<Partner[]> {
    try {
      const partnersWithinCoordinates = await this.repository.find(this.createFilter(coordinates));

      if (Util.isEmpty(partnersWithinCoordinates)) {
        throw new NotFoundPartnerException('No partner found in this area');
      }

      return partnersWithinCoordinates.map((partner) => PartnerDBModelMapper.toDomain(partner));
    } catch (error) {
      if (error instanceof NotFoundPartnerException) {
        throw error;
      }

      throw new SavePartnerException(error.message);
    }
  }

  private createFilter(coordinates: number[]) {
    return {
      coverageArea: {
        $geoIntersects: {
          $geometry: {
            type: GeojsonType.Point,
            coordinates: coordinates,
          },
        },
      },
    };
  }
}
