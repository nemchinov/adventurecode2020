import { assert } from 'chai';

import app from '../src/app';
import verifyService from '../src/services/VerifyService';
import mapFollowingService from '../src/services/MapFollowingService';
import passportService from '../src/services/PassportService';

describe('adventure code', () => {
  describe('1 day', () => {
    const numbers = [
      1721,
      979,
      366,
      299,
      675,
      1456,
    ];
    it('step 1', async () => {
      const result = app.findPair(numbers, 2020);
  
      assert.equal(result[0], '1721 * 299 = 514579');
    });
    it('step 2', async () => {
      const result = app.findN(numbers, 2020, 3);
  
      assert.equal(result[0], '366 * 675 * 979 = 241861950');
    });
  });

  describe('2 day', () => {
    const rows = [
      '1-3 a: abcde',
      '1-3 b: cdefg',
      '2-9 c: ccccccccc',
    ];
    it('step 1', async () => {
      const result = verifyService.getCountValidPasswords(rows);
  
      assert.equal(result, 2);
    });

    it('step 2', async () => {
      const result = verifyService.getCountValidPasswordsByPosition(rows);
  
      assert.equal(result, 1);
    });
  });

  describe('3 day', () => {
    const rows = [
      '..##.......',
      '#...#...#..',
      '.#....#..#.',
      '..#.#...#.#',
      '.#...##..#.',
      '..#.##.....',
      '.#.#.#....#',
      '.#........#',
      '#.##...#...',
      '#...##....#',
      '.#..#...#.#',
    ];
    it('step 1', async () => {
      const result = mapFollowingService.getTreesCount(rows, { right: 3, down: 1 }, { X: 0, Y: 0 });
  
      assert.equal(result, 7);
    });

    it('step 2', async () => {
      const steps = [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 },
      ];
      let multiple = 1;

      steps.forEach((step) => {
        const result = mapFollowingService.getTreesCount(rows, step, { X: 0, Y: 0 });
        multiple *= result;
      });
  
      assert.equal(multiple, 336);
    });
  });

  describe.only('day 4', () => {
    const passports = [
      `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
      byr:1937 iyr:2017 cid:147 hgt:183cm`,
      `iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
      hcl:#cfa07d byr:1929`,
      `hcl:#ae17e1 iyr:2013
      eyr:2024
      ecl:brn pid:760753108 byr:1931
      hgt:179cm`,
      `hcl:#cfa07d eyr:2025 pid:166559648
      iyr:2011 ecl:brn hgt:59in`,
    ];
    const fields = [
      'byr',
      'iyr',
      'eyr',
      'hgt',
      'hcl',
      'ecl',
      'pid',
      'cid',
    ];

    it('step 1', async () => {
      const canSkip = ['cid'];
      const result = passportService.getCountValidPassports(passports, fields, canSkip);
  
      assert.equal(result, 2);
    });
  })
});
