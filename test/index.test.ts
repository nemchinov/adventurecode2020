import * as supertest from 'supertest';
import { assert } from 'chai';

import app from '../src/app';

describe('adventure code', () => {
  describe('1 day', () => {
    it('step 1', async () => {
      const numbers = [
        1721,
        979,
        366,
        299,
        675,
        1456,
      ];
      const result = app.findPair(numbers, 2020);
  
      assert.equal(result[0], '1721 * 299 = 514579');
    });
    it('step 2', async () => {
      const numbers = [
        1721,
        979,
        366,
        299,
        675,
        1456,
      ];
      const result = app.findN(numbers, 2020, 3);
  
      assert.equal(result[0], '366 * 675 * 979 = 241861950');
    });
  });
});
