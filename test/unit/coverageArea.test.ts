import { expect } from 'chai';
import { IllegalArgumentException } from '../../src/domain/exceptions/IllegalArgumentException';
import { CoverageArea } from '../../src/domain/models/partner/coverageArea_';
import { GeojsonType } from '../../src/domain/models/partner/geojsonType';

describe('Unit tests for coverageArea VO', () => {
  context('When creating a coverageArea', () => {
    it(`Should return a consistent coverageArea VO when it's build correctly`, () => {
      const coverageArea = CoverageArea.create(GeojsonType.MultiPolygon, [[[[0, 0, 0, 1, 0, 2, 0, 0]]]]);

      expect(coverageArea.constructor.name).to.be.equal('CoverageArea');
      expect(coverageArea.getType()).to.be.equal(GeojsonType.MultiPolygon);
    });

    it('Should return error when the coverageArea (type) is build incorrectly', () => {
      try {
        CoverageArea.create(null, [[[[0, 0, 0, 1, 0, 2, 0, 0]]]]);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Property type must be defined');
      }
    });

    it('Should return error when the CoverageArea (coordinates) is build incorrectly', () => {
      try {
        CoverageArea.create(GeojsonType.MultiPolygon, null);
      } catch (error) {
        expect(error).to.be.instanceOf(IllegalArgumentException);
        expect(error.message).to.be.equal('Property coordinates must be defined');
      }
    });
  });
});
