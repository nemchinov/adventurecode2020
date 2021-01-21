import mathService from './services/MathService';
import { numbers } from './data/numbers-1day';

class App {
  public start(step: number) {
    switch (step) {
      case 1:
        const result = this.findPair(numbers, 2020);
        console.log(result.join(', '));
        break;
      default:
        throw new Error('Unknown step');
    }
  }

  public findPair(payload: number[], sum: number) {
    const pairs = mathService.findPair(payload, sum);
    const result: string[] = [];

    for (const pair of pairs) {
      result.push(`${pair[0]} * ${pair[1]} = ${pair[0] * pair[1]}`);
    }

    return result;
  }
}

export default new App();
