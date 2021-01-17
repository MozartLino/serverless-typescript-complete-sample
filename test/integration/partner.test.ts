import { expect } from 'chai';
import { ResponseData } from '../../src/infrastructure/utils/Response';
import { PartnerController } from '../../src/presentation/controllers/PartnerController';
import DatabaseHelper from './database/databaseHelper';
import * as mocks from '../mocks';
const databaseHelper = new DatabaseHelper();

describe('Partner Controller', function () {
  before(async function () {
    await databaseHelper.setup();
  });

  after(async function () {
    await databaseHelper.teardown();
  });

  afterEach(async function () {
    const partnersColletion = await databaseHelper.getDb().getCollection('partners');
    await partnersColletion.deleteMany({});
  });

  context(
    `knowing that we have two partners that both cover the same area
    but they are too far from each other (Guaianases and Pinheiros)
    when given Itaim Paulista location that is closer to Guaianase than Pinheiros`,
    async function () {
      it('should return the partner which is located in Guaianases', async function () {
        const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));

        const itaimPaulistaLocation = { pathParameters: { longitude: -46.3969364, latitude: -23.4995053 } };
        await partnerController.post(mocks.partnerGuaianasesMock);
        await partnerController.post(mocks.partnerPinheirosMock);

        const responsePartner: ResponseData = await partnerController.getPartnerByCoordinates(itaimPaulistaLocation);

        expect(responsePartner.statusCode).to.be.equal(200);
        expect(JSON.parse(responsePartner.body).tradingName).to.be.equal('Zé Guaianases');
        expect(JSON.parse(responsePartner.body).ownerName).to.be.equal('Guaianases');
        expect(JSON.parse(responsePartner.body).document).to.be.equal('60.588.840/0001-49');
      });
    }
  );

  context(
    `knowing that we have two partners that only one of them covers the client area (Zé Pinheiros partner)
    also knowing that the nearest partner do not cover the client area (Zé Guaianases parter)`,
    async function () {
      it('should return the partner Pinheiros which is located far away from client(Itaim Paulista) but cover the cliet area', async function () {
        const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));

        const itaimPaulistaLocation = { pathParameters: { longitude: -46.3969364, latitude: -23.4995053 } };
        await partnerController.post(mocks.partnerGuaianasesSmallCoveregeAreaMock);
        await partnerController.post(mocks.partnerPinheirosMock);

        const responsePartner: ResponseData = await partnerController.getPartnerByCoordinates(itaimPaulistaLocation);

        expect(responsePartner.statusCode).to.be.equal(200);
        expect(JSON.parse(responsePartner.body).tradingName).to.be.equal('Zé Pinheiros');
        expect(JSON.parse(responsePartner.body).ownerName).to.be.equal('Pinheiros');
        expect(JSON.parse(responsePartner.body).document).to.be.equal('39.496.795/0001-06');
      });
    }
  );

  context('knowing that we have no partners that covers the client area', async function () {
    it('should return not found when there is no parter that covers the area', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));

      const itaimPaulistaLocation = { pathParameters: { longitude: -46.3969364, latitude: -23.4995053 } };
      await partnerController.post(mocks.partnerGuaianasesSmallCoveregeAreaMock);

      const responsePartner: ResponseData = await partnerController.getPartnerByCoordinates(itaimPaulistaLocation);

      expect(responsePartner.statusCode).to.be.equal(404);
    });
  });

  context('When try to get the nearest partner ', async function () {
    it('should return error when mongo is unavailabe', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
      const someLocation = { pathParameters: { longitude: -46.3969364, latitude: -23.4995053 } };

      const result: ResponseData = await partnerController.getPartnerByCoordinates(someLocation);

      expect(result.statusCode).to.be.equal(503);
    });
  });

  context('when try to save a partner', async function () {
    it('should save a new one when is registered correctly', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
      const result: ResponseData = await partnerController.post(mocks.newPartnerEvent);

      expect(result.statusCode).to.be.equal(201);
    });

    it('should not allow to save a partner (error 409) when try to save with the same document', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
      const firstPartner = mocks.newPartnerEvent;
      const secondPartnerWithTheSameDocument = mocks.newPartnerEvent;

      await partnerController.post(firstPartner);
      const result: ResponseData = await partnerController.post(secondPartnerWithTheSameDocument);

      expect(result.statusCode).to.be.equal(409);
    });

    it('should not allow to save a partner (error 400) when try to save a invalid partner', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
      const result: ResponseData = await partnerController.post(mocks.newInvalidAddressPartnerEvent);

      expect(result.statusCode).to.be.equal(400);
    });

    it('should return error when mongo is unavailabe', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
      const result: ResponseData = await partnerController.post(mocks.newPartnerEvent);

      expect(result.statusCode).to.be.equal(503);
    });
  });

  context('when try to find a partner', async function () {
    it('should return a partner when the id exists in the repository', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
      const savedPartner: ResponseData = await partnerController.post(mocks.newPartnerEvent);
      const partnerResultBody = JSON.parse(savedPartner.body);

      const result: ResponseData = await partnerController.get({ pathParameters: { id: partnerResultBody.id } });

      expect(result.statusCode).to.be.equal(200);
      expect(JSON.parse(result.body).id).to.be.equal(partnerResultBody.id);
    });

    it('should return not found when the id do not exists in the repository', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));

      const result: ResponseData = await partnerController.get({ pathParameters: { id: 'notExistId' } });

      expect(result.statusCode).to.be.equal(404);
    });

    it('should return error when mongo is unavailabe', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
      const result: ResponseData = await partnerController.get({ pathParameters: { id: 'someId' } });

      expect(result.statusCode).to.be.equal(503);
    });
  });
});
