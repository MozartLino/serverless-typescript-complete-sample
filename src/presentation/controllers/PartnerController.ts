import { Request } from '../../infrastructure/utils/Request';
import { PartnerService } from '../../application/services/partner';
import { PartnerApplicationModel, PartnerApplicationModelId } from '../../application/mappers/PartnerApplicationModel';
import { Response, ResponseData } from '../../infrastructure/utils/Response';

export class PartnerController {
  private partnerService: PartnerService;

  constructor(partnerService: PartnerService) {
    this.partnerService = partnerService;
  }

  public async post(event: any): Promise<ResponseData> {
    try {
      const partnerApplicationModel = <PartnerApplicationModel>Request.parse(event.body);
      const partnerModelView = await this.partnerService.save(partnerApplicationModel);

      return Response.success(partnerModelView, 201);
    } catch (error) {
      return Response.error(error);
    }
  }

  public async get(event: any): Promise<ResponseData> {
    try {
      const partnerApplicationModelId = <PartnerApplicationModelId>event.pathParameters;
      const partnerModelView = await this.partnerService.find(partnerApplicationModelId);

      return Response.success(partnerModelView, 200);
    } catch (error) {
      return Response.error(error);
    }
  }
}
