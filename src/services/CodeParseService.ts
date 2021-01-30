class CodeParseService {
  public getExtraNumber(codes: number[], interval: number): number {
    let result = 0;
    const checkValues = [];

    for (let i = 0; i <= codes.length; i++) {
      checkValues.push(codes[i]);
      if (i < interval) {
        continue;
      }
      if (!this.isValidValue(codes[i], checkValues)) {
        return codes[i];
      }
      checkValues.shift();
    }

    return null;
  }

  public getSumRangeForExtraNumber(codes: number[], interval: number): number[] {
    const checkValues = [];

    for (let i = 0; i <= codes.length; i++) {
      checkValues.push(codes[i]);
      if (i < interval) {
        continue;
      }
      if (!this.isValidValue(codes[i], checkValues)) {
        const invalidCode = codes[i];
        let startIndex = 0;

        do {
          const result = this.findSumInterval(startIndex, i, invalidCode, codes);
          if (result) {
            return [result[0], result[result.length - 1]];
          }
          startIndex++;
        } while(startIndex < i);

        return [];
      }
      checkValues.shift();
    }

    return null;
  }

  private findSumInterval(startIndex: number, endIndex: number, checkSum: number, array: number[]) {
    let sum = 0;
    for (let i = startIndex; i < endIndex; i++) {
      sum += array[i];
      if (sum === checkSum) {
        return array
          .splice(startIndex, i - startIndex + 1)
          .sort((a, b) => a - b);
      }
      if (sum > checkSum) {
        return null;
      }
    }

    return null;
  }

  private isValidValue(value: number, array: number[]) {
    for (let i = 0; i <= array.length; i++) {
      for (let j = i + 1; j <= array.length; j++) {
        if ((array[i] + array[j]) === value) {
          return true;
        }
      }
    }
    return false;
  }
}

export default new CodeParseService();