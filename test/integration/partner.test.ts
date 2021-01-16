import { expect } from 'chai';
import { ResponseData } from '../../src/infrastructure/utils/Response';
import { PartnerController } from '../../src/presentation/controllers/PartnerController';
import DatabaseHelper from './database/databaseHelper';
import * as mocks from '../mocks/partners';
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

  context('when try to save a partner', async function () {
    it('should save a partner when a new partner is ok', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
      const result: ResponseData = await partnerController.post(mocks.newPartnerEvent);

      expect(result.statusCode).to.be.equal(201);
    });

    it('should return error 409 when try to save a partner with the same document', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
      const firstPartner = mocks.newPartnerEvent;
      const secondPartnerWithTheSameDocument = mocks.newPartnerEvent;

      await partnerController.post(firstPartner);
      const result: ResponseData = await partnerController.post(secondPartnerWithTheSameDocument);

      expect(result.statusCode).to.be.equal(409);
    });

    it('should return error 400 when try to save a invalid partner', async function () {
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

    it('should return not found when the id do not exists in the repository', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));

      const result: ResponseData = await partnerController.get({});

      expect(result.statusCode).to.be.equal(400);
    });

    it('should return error when mongo is unavailabe', async function () {
      const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
      const result: ResponseData = await partnerController.get({ pathParameters: { id: 'someId' } });

      expect(result.statusCode).to.be.equal(503);
    });
  });
});
