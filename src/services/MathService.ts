class MathService {
  public findPair(numbers: number[], sum: number): number[][] {
    const sorted = numbers.sort();
    const result: number[][] = [];

    // from last A to first B
    // if B * A > find --> continue
    // A = previous A

    for (let i = numbers.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        const stepSum = numbers[i] + numbers[j];
        if (stepSum === sum) {
          result.push([numbers[j], numbers[i]]);
        }
        if (stepSum > sum) {
          continue;
        }
      }
    }

    return result;
  }
}

export default new MathService();