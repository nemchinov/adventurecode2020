enum CMD {
  JMP = 'jmp',
  NOP = 'nop',
  ACC = 'acc',
};

enum Statuses {
  Finish = 'finish',
  Loop = 'loop',
};

class CodeRunService {
  public getValue(instructions: string[]) {
    let i = 1;
    do {
      const cmd = this.parseRawRow(instructions[i]).cmd;
      if ([CMD.JMP, CMD.NOP].includes(cmd)) {
        const { status, value } = this.getValueBeforeLoop(instructions, i);
        if (status === Statuses.Finish) {
          return value;
        }
      }
      i++;
    } while(i <= (instructions.length - 1));

    throw Error('Not found solution.');
  }

  public getValueBeforeLoop(instructions: string[], replaceIndex?: number) {
    const indexSet = new Set();
    let globalValue = 0;
    let index = 0;

    while(true) {
      if (index === instructions.length) {
        return { status: Statuses.Finish, value: globalValue };
      }

      indexSet.add(index);

      let { cmd, number } = this.parseRawRow(instructions[index]);

      if (replaceIndex === index) {
        cmd = cmd === CMD.JMP ? CMD.NOP : CMD.JMP;
      }

      switch (cmd) {
        case CMD.ACC:
          globalValue += number;
          index++;
          break;
        case CMD.JMP:
          index += number;
          break;
        case CMD.NOP:
          index++;
          break;
        default:
          throw new Error(`Unknown instruction: ${cmd}`);
      }

      if (indexSet.has(index)) {
        return { status: Statuses.Loop, value: globalValue };
      }
    }
  }

  private parseRawRow(row: string) {
    let [cmd, value] = row.split(' ');
    const num = Number(value);
    
    if (Number.isNaN(num)) {
      throw new Error(`Can't parse number: ${value}`);
    }

    return { cmd: cmd as CMD, number: num };
  }
}

export default new CodeRunService();