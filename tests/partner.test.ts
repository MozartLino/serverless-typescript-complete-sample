import { expect } from 'chai';
import { savePartner } from '../index';
import * as mocks from './mocks/partners';

describe('partner', function () {
  it('should save a partner when partner is ok', function () {
    let result = savePartner(mocks.newPartner);
    expect(result.statusCode).to.be.equal(201);
  });
});
