import { expect } from 'chai';
import { IllegalArgumentException } from '../../src/domain/exceptions/IllegalArgumentException';
import { Address } from '../../src/domain/models/partner/Address_';
import { GeojsonType } from '../../src/domain/models/partner/GeojsonType_';

describe('Unit tests for Address VO', () => {
  context('When creating a address', () => {
    it(`Should return a consistent Address VO when it's build correctly`, () => {
      const address = Address.create(GeojsonType.Point, [0, 0]);

      expect(address.constructor.name).to.be.equal('Address');
      expect(address.getType()).to.be.equal(GeojsonType.Point);
    });

    it('Should return error when the address (type) is build incorrectly', () => {
      try {
        Address.create(null, [0, 0]);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Property type must be defined');
      }
    });

    it('Should return error when the address (coordinates) is build incorrectly', () => {
      try {
        Address.create(GeojsonType.Point, null);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Property coordinates must be defined');
      }
    });
  });
});
