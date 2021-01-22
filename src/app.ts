import mathService from './services/MathService';
import { numbers } from './data/numbers-1day';

class App {
  public start(step: string) {
    let result;
    switch (step) {
      case '1-1':
        result = this.findPair(numbers, 2020);
        console.log(result.join(', '));
        break;
      case '1-2':
        result = this.findN(numbers, 2020, 3);
        console.log(result.join(', '));
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
