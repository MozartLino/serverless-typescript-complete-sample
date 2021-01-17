import { Request } from '../../infrastructure/utils/Request';
import { PartnerService } from '../../application/services/partnerService';
import { Response, ResponseData } from '../../infrastructure/utils/Response';
import { Partner } from '../../domain/models/partner/partner';
import { PartnerViewModel } from './PartnerViewModel';
import { LocationApplicationModel, PartnerApplicationModel, PartnerApplicationModelId } from '../../application/mappers/PartnerMapper';

export class PartnerController {
  private partnerService: PartnerService;

  constructor(partnerService: PartnerService) {
    this.partnerService = partnerService;
  }

  public async post(event: any): Promise<ResponseData> {
    try {
      const partnerApplicationModel = <PartnerApplicationModel>Request.parse(event.body);
      const partner = await this.partnerService.save(partnerApplicationModel);

      return Response.success(this.toModelView(partner), 201);
    } catch (error) {
      return Response.error(error);
    }
  }

  public async get(event: any): Promise<ResponseData> {
    try {
      const partnerApplicationModelId = <PartnerApplicationModelId>event.pathParameters;
      const partner = await this.partnerService.find(partnerApplicationModelId);

      return Response.success(this.toModelView(partner));
    } catch (error) {
      return Response.error(error);
    }
  }

  public async getPartnerByCoordinates(eventPathParameters: any): Promise<ResponseData> {
    try {
      const coordinates = this.getCoordinatesFrom(eventPathParameters);
      const partner = await this.partnerService.findNearestBy(coordinates);

      return Response.success(this.toModelView(partner));
    } catch (error) {
      return Response.error(error);
    }
  }

  private toModelView(partner: Partner): PartnerViewModel {
    return {
      id: partner.getId(),
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

  private getCoordinatesFrom(event: any): number[] {
    const partnerApplicationModel = <LocationApplicationModel>event.pathParameters;
    return [+partnerApplicationModel.longitude, +partnerApplicationModel.latitude];
  }
}
