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