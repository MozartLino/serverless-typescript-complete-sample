import { Request } from '../../infrastructure/utils/Request';
import { PartnerService } from '../../application/services/partner';
import { PartnerApplicationModel } from '../../application/mappers/PartnerApplicationModel';
import { Response, ResponseData } from '../../infrastructure/utils/Response';

export class PartnerController {
  private partnerService: PartnerService;

  constructor(partnerService: PartnerService) {
    this.partnerService = partnerService;
  }

  public async save(event: any): Promise<ResponseData> {
    try {
      const partnerApplicationModel = <PartnerApplicationModel>Request.parse(event.body);
      await this.partnerService.save(partnerApplicationModel);

      return Response.success({}, 201);
    } catch (error) {
      return Response.error(error);
    }
  }
}
