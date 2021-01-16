import { IPartnerRepository } from '../../domain/models/partner/IPartnerRepository';
import { PartnerApplicationModel } from '../mappers/PartnerApplicationModel';
import { PartnerMapper } from '../mappers/PartnerMapper';

export class PartnerService {
  private partnerRepository: IPartnerRepository;

  public constructor(partnerRepository: IPartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  public async save(partnerApplicationModel: PartnerApplicationModel): Promise<void> {
    const partner = PartnerMapper.toDomain(partnerApplicationModel);

    await this.partnerRepository.save(partner);
  }
}
