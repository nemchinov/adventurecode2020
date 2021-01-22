import { assert } from 'chai';

import app from '../src/app';
import verifyService from '../src/services/VerifyService';

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

  describe('2 day', () => {
    it('step 1', async () => {
      const rows = [
        '1-3 a: abcde',
        '1-3 b: cdefg',
        '2-9 c: ccccccccc',
      ];
      const result = verifyService.getCountValidPasswords(rows);
  
      assert.equal(result, 2);
    });
  });
});
