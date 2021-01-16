import { IllegalArgumentException } from '../../domain/exceptions/IllegalArgumentException';
import { IPartnerRepository } from '../../domain/models/partner/IPartnerRepository';
import { PartnerApplicationModel, PartnerApplicationModelId } from '../mappers/PartnerApplicationModel';
import { PartnerMapper } from '../mappers/PartnerMapper';
import { PartnerViewModel } from '../mappers/PartnerViewModel';

export class PartnerService {
  private partnerRepository: IPartnerRepository;

  public constructor(partnerRepository: IPartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  public async save(partnerApplicationModel: PartnerApplicationModel): Promise<PartnerViewModel> {
    const partner = PartnerMapper.toDomain(partnerApplicationModel);
    const result = await this.partnerRepository.save(partner);

    return PartnerMapper.toModelView(result);
  }

  public async find(partnerApplicationModelId: PartnerApplicationModelId): Promise<PartnerViewModel> {
    if (partnerApplicationModelId && partnerApplicationModelId.id) {
      const partner = await this.partnerRepository.findOne(partnerApplicationModelId.id);

      return PartnerMapper.toModelView(partner);
    }

    throw new IllegalArgumentException('Partner id must be sent');
  }
}
