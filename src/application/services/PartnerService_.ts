import { IPartnerRepository } from '../../domain/models/partner/IPartnerRepository';
import { PartnerApplicationModel, PartnerApplicationModelId, PartnerMapper } from '../mappers/PartnerMapper';
import { Partner } from '../../domain/models/partner/Partner_';
import { PartnerLocation } from '../../domain/services/PartnerLocation_';
import { CustomerCoordinate } from '../../domain/models/customer/CustomerCoordinate';

export class PartnerService {
  private partnerRepository: IPartnerRepository;
  private partnerLocation: PartnerLocation;

  public constructor(partnerRepository: IPartnerRepository, partnerLocation: PartnerLocation) {
    this.partnerRepository = partnerRepository;
    this.partnerLocation = partnerLocation;
  }

  public async save(partnerApplicationModel: PartnerApplicationModel): Promise<Partner> {
    const partner = PartnerMapper.toDomain(partnerApplicationModel);
    return this.partnerRepository.save(partner);
  }

  public async find(partnerApplicationModelId: PartnerApplicationModelId): Promise<Partner> {
    return this.partnerRepository.findOne(partnerApplicationModelId.id);
  }

  public async findNearestBy(coordinates: number[]): Promise<Partner> {
    const partnersWithiTheArea = await this.partnerRepository.findWithin(coordinates);

    return this.partnerLocation.getNearest(partnersWithiTheArea, this.getPoint(coordinates));
  }

  private getPoint(coordinates: number[]): CustomerCoordinate {
    return { latitude: coordinates[Partner.LATITUDE], longitude: coordinates[Partner.LONGITUDE] };
  }
}
