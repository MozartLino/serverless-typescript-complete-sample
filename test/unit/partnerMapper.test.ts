import { expect } from 'chai';
import { PartnerMapper } from '../../src/application/mappers/PartnerMapper';
import { IllegalArgumentException } from '../../src/domain/exceptions/IllegalArgumentException';
import * as mocks from '../mocks/partners';

describe('Unit tests for PartnerMapper', () => {
  context('When convert to domain', () => {
    it(`Should map a request object to domain model object when it's build by the builder`, () => {
      const partner = PartnerMapper.toDomain(mocks.partnerMock);

      expect(partner.constructor.name).to.be.equal('Partner');
      expect(partner.validate()).to.be.true;
    });

    it('Should return error when try to convert a incorrect request object', () => {
      try {
        PartnerMapper.toDomain(null);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Invalid request body: error when try to create model partner');
      }
    });

    it('Should return error when try to convert a incomplete request object', () => {
      try {
        const partner = mocks.partnerMock;
        partner.address = null;
        partner.coverageArea = null;

        PartnerMapper.toDomain(partner);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Property coverageArea must be defined');
      }
    });
  });
});
