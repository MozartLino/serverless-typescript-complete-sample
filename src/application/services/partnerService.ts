import { IPartnerRepository } from '../../domain/models/partner/IPartnerRepository';
import { PartnerApplicationModel, PartnerApplicationModelId, PartnerMapper } from '../mappers/PartnerMapper';
import { Partner } from '../../domain/models/partner/partner';

export class PartnerService {
  private partnerRepository: IPartnerRepository;

  public constructor(partnerRepository: IPartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  public async save(partnerApplicationModel: PartnerApplicationModel): Promise<Partner> {
    const partner = PartnerMapper.toDomain(partnerApplicationModel);
    return this.partnerRepository.save(partner);
  }

  public async find(partnerApplicationModelId: PartnerApplicationModelId): Promise<Partner> {
    return this.partnerRepository.findOne(partnerApplicationModelId.id);
  }

  public async findNearestBy(cordinates: number[]): Promise<Partner> {
    return this.partnerRepository.findNearestBy(cordinates);
  }
}
