import mathService from './services/MathService';
import verifyService from './services/VerifyService';
import mapFollowingService from './services/MapFollowingService';
import { numbers } from './data/numbers-1day';
import { passwords } from './data/passwords-2day';
import { map } from './data/map-3day';

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
