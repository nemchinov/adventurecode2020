export type PasswordRule = {
  letter: string;
  min: number;
  max: number;
};

class VerifyService {
  public getCountValidPasswords(rows: string[]) {
    let count = 0;
    const parsedRows = this.parsePasswords(rows);

    parsedRows.forEach(({ password, rule }) => {
      if (this.checkPassword(password, rule)) {
        count++;
      }
    });

    return count;
  }

  public getCountValidPasswordsByPosition(rows: string[]) {
    let count = 0;
    const parsedRows = this.parsePasswords(rows);

    parsedRows.forEach(({ password, rule }) => {
      if (this.checkPasswordByPosition(password, rule)) {
        count++;
      }
    });

    return count;
  }

  public parsePasswords(rows: string[]) {
    const parsedRows = rows.map((row) => {
      const splitData = row.split(':');

      if(splitData.length !== 2) {
        throw Error(`can't parse: ${row}`);
      }

      const password = splitData[1].trim();
      const rule: PasswordRule = {
        letter: splitData[0].match(/\s.*/)[0].trim(),
        min: Number(splitData[0].match(/^\d+/)[0]),
        max: Number(splitData[0].match(/\-(\d*)/)[1]),
      };

      return { password, rule };
    });

    return parsedRows;
  }

  public checkPassword(password: string, rule: PasswordRule) {
    const regexp = new RegExp(rule.letter, 'g')
    const count = (password.match(regexp) || []).length
    return count >= rule.min && count <= rule.max;
  }

  public checkPasswordByPosition(password: string, rule: PasswordRule) {
    const firstLetter = password[rule.min - 1];
    const lastLetter = password[rule.max - 1];

    return firstLetter != lastLetter && (firstLetter === rule.letter || lastLetter === rule.letter);
  }
}

export default new VerifyService();
