import { assert, expect } from 'chai';

import app from '../src/app';
import verifyService from '../src/services/VerifyService';
import mapFollowingService from '../src/services/MapFollowingService';
import passportService from '../src/services/PassportService';
import flyPassService from '../src/services/FlyPassService';
import declarationService from '../src/services/DeclarationService';
import bagService from '../src/services/BagService';
import codeRunService from '../src/services/CodeRunService';
import codeParseService from '../src/services/CodeParseService';

describe('adventure code', () => {
  describe('day 1', () => {
    const numbers = [
      1721,
      979,
      366,
      299,
      675,
      1456,
    ];
    it('part 1', () => {
      const result = app.findPair(numbers, 2020);
  
      assert.equal(result[0], '1721 * 299 = 514579');
    });
    it('part 2', () => {
      const result = app.findN(numbers, 2020, 3);
  
      assert.equal(result[0], '366 * 675 * 979 = 241861950');
    });
  });

  describe('day 2', () => {
    const rows = [
      '1-3 a: abcde',
      '1-3 b: cdefg',
      '2-9 c: ccccccccc',
    ];
    it('part 1', () => {
      const result = verifyService.getCountValidPasswords(rows);
  
      assert.equal(result, 2);
    });

    it('part 2', () => {
      const result = verifyService.getCountValidPasswordsByPosition(rows);
  
      assert.equal(result, 1);
    });
  });

  describe('day 3', () => {
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
    it('part 1', () => {
      const result = mapFollowingService.getTreesCount(rows, { right: 3, down: 1 }, { X: 0, Y: 0 });
  
      assert.equal(result, 7);
    });

    it('part 2', () => {
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

  describe('day 4', () => {
    it('part 1', () => {
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

    it('part 2', () => {
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

  describe('day 5', () => {
    it('part 1', () => {
      const ID = flyPassService.getSeatID(44, 5);
      assert.equal(ID, 357);

      const rows: [string, number][] = [
        ['FBFBBFFRLR', 357],
        ['BFFFBBFRRR', 567],
        ['FFFBBBFRRR', 119],
        ['BBFFBBFRLL', 820],
      ];

      rows.forEach(([key, id]) => {
        assert.equal(flyPassService.parseSeatKey(key), id);
      });

      assert.equal(flyPassService.getMaxSeatNumber(rows.map((row) => row[0])), 820);
    });
  });

  describe('day 6', () => {
    const answers = [
      `abc`,
      `a
      b
      c`,
      `ab
      ac`,
      `a
      a
      a
      a`,
      `b`,
    ];

    it('part 1', () => {
      const result = declarationService.getGroupsCountAnswers(answers);
      assert.equal(result.reduce((c, v) => (c + v), 0), 11);
    });

    it('part 2', () => {
      const result = declarationService.getGroupsCountSameAnswers(answers);
      assert.equal(result.reduce((c, v) => (c + v), 0), 6);
    });
  });

  describe('day 7', () => {
    const rules = [
      'light red bags contain 1 bright white bag, 2 muted yellow bags',
      'dark orange bags contain 3 bright white bags, 4 muted yellow bags',
      'bright white bags contain 1 shiny gold bag',
      'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags',
      'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags',
      'dark olive bags contain 3 faded blue bags, 4 dotted black bags',
      'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags',
      'faded blue bags contain no other bags',
      'dotted black bags contain no other bags',
    ];
    const rules2 = [
      'shiny gold bags contain 2 dark red bags',
      'dark red bags contain 2 dark orange bags',
      'dark orange bags contain 2 dark yellow bags',
      'dark yellow bags contain 2 dark green bags',
      'dark green bags contain 2 dark blue bags',
      'dark blue bags contain 2 dark violet bags',
      'dark violet bags contain no other bags',
    ];
    it('part 1', () => {
      const result = bagService.getBagColorsByContainColor(rules, 'shiny gold');
      assert.equal(result, 4);
    });
    it('part 2', () => {
      let result = bagService.getBagsCount(rules, 'shiny gold');
      assert.equal(result, 32);

      result = bagService.getBagsCount(rules2, 'shiny gold');
      assert.equal(result, 126);
    });
  });

  describe('day 8', () => {
    const  instructions = [
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ];

    it('part 1', () => {
      const result = codeRunService.getValueBeforeLoop(instructions);
      assert.equal(result.value, 5);
    });
    it('part 2', () => {
      const result = codeRunService.getValue(instructions);
      assert.equal(result, 8);
    });
  });

  describe('day 9', () => {
    const data = [
      35,
      20,
      15,
      25,
      47,
      40,
      62,
      55,
      65,
      95,
      102,
      117,
      150,
      182,
      127,
      219,
      299,
      277,
      309,
      576,
    ];
    it.only('part 1', () => {
      const result = codeParseService.getExtraNumber(data, 5);
      expect(result).equal(127);
    });
    it('part 2', () => {});
  });

  describe('day 10', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });

  describe('day 11', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });

  describe('day 12', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });

  describe('day 13', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 14', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 15', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 16', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 17', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 18', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 19', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });
  
  describe('day 20', () => {
    it('part 1', () => {});
    it('part 2', () => {});
  });  
});
