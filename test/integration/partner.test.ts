import { expect } from 'chai';
import { ResponseData } from '../../src/infrastructure/utils/Response';
import { PartnerController } from '../../src/presentation/controllers/PartnerController';
import DatabaseHelper from './database/databaseHelper';
import * as mocks from '../mocks/partners';

describe('Save Partner Controller', function () {
  const databaseHelper = new DatabaseHelper();

  before(async function () {
    await databaseHelper.setup();
  });

  afterEach(async function () {
    const partnersColletion = await databaseHelper.getDb().getCollection('partners');
    await partnersColletion.deleteMany({});
  });

  after(async function () {
    await databaseHelper.teardown();
  });

  it('should save a partner when a new parter is ok', async function () {
    const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
    const result: ResponseData = await partnerController.save(mocks.newPartnerEvent);

    expect(result.statusCode).to.be.equal(201);
  });

  it('should return error 409 when try to save a partner with the same document', async function () {
    const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getDb()));
    const firstPartner = mocks.newPartnerEvent;
    const secondPartnerWithTheSameDocument = mocks.newPartnerEvent;

    await partnerController.save(firstPartner);
    const result: ResponseData = await partnerController.save(secondPartnerWithTheSameDocument);

    expect(result.statusCode).to.be.equal(409);
  });

  it('should return error 400 when try to save a invalid partner', async function () {
    const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
    const result: ResponseData = await partnerController.save(mocks.newInvalidAddressPartnerEvent);

    expect(result.statusCode).to.be.equal(400);
  });

  it('should return error when mongo is unavailabe', async function () {
    const partnerController = new PartnerController(await mocks.partnerService(databaseHelper.getInvalidDb()));
    const result: ResponseData = await partnerController.save(mocks.newPartnerEvent);

    expect(result.statusCode).to.be.equal(503);
  });
});
