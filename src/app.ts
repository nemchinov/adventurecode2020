import mathService from './services/MathService';
import verifyService from './services/VerifyService';
import mapFollowingService from './services/MapFollowingService';
import passportService from './services/PassportService';
import flyPassService from './services/FlyPassService';
import declarationService from './services/DeclarationService';
import bagService from './services/BagService';
import codeRunService from './services/CodeRunService';
import codeParseService from './services/CodeParseService';

import { numbers } from './data/numbers-1day';
import { passwords } from './data/passwords-2day';
import { map } from './data/map-3day';
import { passports } from './data/passports-4day';
import { passes } from './data/pass-5day';
import { answers } from './data/declaration-6day';
import { rules } from './data/bagsRules7';
import { instructions } from './data/comands8';
import { codes } from './data/code9';

class App {
  public start(step: string) {
    let result;
    console.log('Result:');
    switch (step) {
      case '1-1':
        result = this.findPair(numbers, 2020);
        console.log(result.join(', '));
        break;
      case '1-2':
        result = this.findN(numbers, 2020, 3);
        console.log(result.join(', '));
        break;
      case '2-1':
        result = verifyService.getCountValidPasswords(passwords);
        console.log(result);
        break;
      case '2-2':
        result = verifyService.getCountValidPasswordsByPosition(passwords);
        console.log(result);
        break;
      case '3-1':
        result = mapFollowingService.getTreesCount(map, { right: 3, down: 1 }, { X: 0, Y: 0 });
        console.log(result);
        break;
      case '3-2':
        const steps = [
          { right: 1, down: 1 },
          { right: 3, down: 1 },
          { right: 5, down: 1 },
          { right: 7, down: 1 },
          { right: 1, down: 2 },
        ];
        let multiple = 1;
  
        steps.forEach((step) => {
          const result = mapFollowingService.getTreesCount(map, step, { X: 0, Y: 0 });
          multiple *= result;
        });

        console.log(multiple);
        break;
      case '4-1':
        result = passportService.getCountValidPassports(passports);
        console.log(result);
        break;
      case '4-2':
        result = passportService.getCountValidPassports(passports, true);
        console.log(result);
        break;
      case '5-1':
        result = flyPassService.getMaxSeatNumber(passes);
        console.log(result);
        break;
      case '5-2':
        result = flyPassService.getFreeSeatNumber(passes);
        console.log(result);
        break;
      case '6-1':
        result = declarationService.getGroupsCountAnswers(answers);
        console.log(result.reduce((c, v) => (c + v), 0));
        break;
      case '6-2':
        result = declarationService.getGroupsCountSameAnswers(answers);
        console.log(result.reduce((c, v) => (c + v), 0));
        break;
      case '7-1':
        result = bagService.getBagColorsByContainColor(rules, 'shiny gold');
        console.log(result);
        break;
      case '7-2':
        result = bagService.getBagsCount(rules, 'shiny gold');
        console.log(result);
        break;
      case '8-1':
        result = codeRunService.getValueBeforeLoop(instructions);
        console.log(result.value);
        break;
      case '8-2':
        result = codeRunService.getValue(instructions);
        console.log(result);
        break;
      case '9-1':
        result = codeParseService.getExtraNumber(codes, 25);
        console.log(result);
        break;
      case '9-2':
        result = codeParseService.getSumRangeForExtraNumber(codes, 25);
        console.log(result[0] + result[result.length - 1]);
        break;
      case '10-1':
        console.log(result);
        break;
      case '10-2':
        console.log(result);
        break;
      case '11-1':
        console.log(result);
        break;
      case '11-2':
        console.log(result);
        break;
      case '12-1':
        console.log(result);
        break;
      case '12-2':
        console.log(result);
        break;
      case '13-1':
        console.log(result);
        break;
      case '13-2':
        console.log(result);
        break;
      case '14-1':
        console.log(result);
        break;
      case '14-2':
        console.log(result);
        break;
      case '15-1':
        console.log(result);
        break;
      case '15-2':
        console.log(result);
        break;
      case '16-1':
        console.log(result);
        break;
      case '16-2':
        console.log(result);
        break;
      case '17-1':
        console.log(result);
        break;
      case '17-2':
        console.log(result);
        break;
      case '18-1':
        console.log(result);
        break;
      case '18-2':
        console.log(result);
        break;
      case '19-1':
        console.log(result);
        break;
      case '19-2':
        console.log(result);
        break;
      case '20-1':
        console.log(result);
        break;
      case '20-2':
        console.log(result);
        break;
      default:
        throw new Error('Unknown step');
    }
  }

  public findPair(payload: number[], sum: number) {
    const pairs = mathService.findNItemsEqual(payload, sum, 2);
    const result: string[] = [];

    for (const pair of pairs) {
      result.push(`${pair[0]} * ${pair[1]} = ${pair[0] * pair[1]}`);
    }

    return result;
  }

  public findN(payload: number[], sum: number, count: number) {
    const pairs = mathService.findNItemsEqual(payload, sum, count);
    const result: string[] = [];

    for (const pair of pairs) {
      result.push(`${pair.join(' * ')} = ${pair.reduce((r,c) => r * c)}`);
    }

    return result;
  }
}

export default new App();
