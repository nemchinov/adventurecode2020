class MathService {
  // numbers should be sorted
  public findPair(numbers: number[], sum: number): number[][] {
    const result: number[][] = [];

    if (numbers.length < 2) { return result; }

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

  public findNItemsEqual(numbers: number[], sum: number, count: number): number[][] {
    if (count < 2) {
      throw new Error('Minimal count numbers for sum is two');
    }
    const sorted = numbers.sort();

    return this.findNItemsEqualRecursion(sorted, sum, count);
  }

  private findNItemsEqualRecursion(numbers: number[], sum: number, count: number): number[][] {
    const result: number[][] = [];

    // Take last item => A
    // send to recursion function array without last element, sum - A, count--
    // stop if sum <= 0
    // if count === 2 call findPair else go to previous step

    if (count === 2) {
      return this.findPair(numbers, sum);
    } else {
      const levelCount = count - 1;
      while(numbers.length) {
        const last = numbers.pop();
        const newSum = sum - last;
        if (newSum <= 0 || numbers.length < levelCount) {
          break;
        }
        const data = this.findNItemsEqualRecursion(numbers, newSum, levelCount);

        if (data.length) {
          data.forEach((items) => {
            result.push([...items, last]);
          });
        }
      }
    }

    return result;
  }
}

export default new MathService();