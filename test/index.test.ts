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
    it('step 1', async () => {
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
      const result = passportService.getCountValidPassports(passports);
  
      assert.equal(result, 2);
    });

    it('step 2', async () => {
      const invalid = [
        `eyr:1972 cid:100
        hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926`,
        `iyr:2019
        hcl:#602927 eyr:1967 hgt:170cm
        ecl:grn pid:012533040 byr:1946`,
        `hcl:dab227 iyr:2012
        ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277`,
        `hgt:59cm ecl:zzz
        eyr:2038 hcl:74454a iyr:2023
        pid:3556412378 byr:2007`,
      ];
      const valid = [
        `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
        hcl:#623a2f`,
        `eyr:2029 ecl:blu cid:129 byr:1989
        iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm`,
        `hcl:#888785
        hgt:164cm byr:2001 iyr:2015 cid:88
        pid:545766238 ecl:hzl
        eyr:2022`,
        `iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`,
      ];
  
      assert.equal(passportService.getCountValidPassports(invalid, true), 0);
      assert.equal(passportService.getCountValidPassports(valid, true), valid.length);
    })
  })
});
