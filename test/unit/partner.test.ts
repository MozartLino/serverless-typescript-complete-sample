import { expect } from 'chai';
import { IllegalArgumentException } from '../../src/domain/exceptions/IllegalArgumentException';
import { Partner } from '../../src/domain/models/partner/Partner_';
import * as mocks from '../mocks';

describe('Unit tests for Partner model', () => {
  context('When creating a model partner', () => {
    it(`Should return a consistent Partner model when it's build correctly`, () => {
      const partner = Partner.create(null, 'Ze drinks', 'Ze Delivery', mocks.document, mocks.coverageArea, mocks.address);

      expect(partner.constructor.name).to.be.equal('Partner');
      expect(partner.validate()).to.be.true;
    });

    it('Should return error when the partner (address) is build incorrectly', () => {
      try {
        Partner.create(null, 'Ze drinks', 'Ze Delivery', mocks.document, mocks.coverageArea, null);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Property address must be defined');
      }
    });
  });
});
