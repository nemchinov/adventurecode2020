export enum VALUES {
  B = 'B',
  F = 'F',
  R = 'R',
  L = 'L',
};

class FlyPassService {
  private rows = {
    min: 0,
    max: 127,
  };
  private columns = {
    min: 0,
    max: 7,
  };

  public getMaxSeatNumber(passKeys: string[]) {
    let maxKey = 0;
    for (const key of passKeys) {
      const id = this.parseSeatKey(key);
      if (id > maxKey) {
        maxKey = id;
      }
    }
    return maxKey;
  }

  public getFreeSeatNumber(passKeys: string[]) {
    let ids: number[] = [];

    for (const key of passKeys) {
      const id = this.parseSeatKey(key);
      ids.push(id);
    }

    const sortedIds = ids.sort((a, b) => a - b);

    for (let i = 0; i < sortedIds.length - 1; i++) {
      if (sortedIds[i] + 1 !== sortedIds[i + 1]) {
        return sortedIds[i] + 1;
      }
    }

    throw new Error('Not found');
  }

  public parseSeatKey(seatKey: string) {
    const keys = seatKey.split('');
    let rowMin = this.rows.min;
    let rowInterval = this.rows.max;
    let columnMin = this.columns.min;
    let columnInterval = this.columns.max;

    for (const key of keys) {
      switch(key) {
        case VALUES.B: // Upper
          rowInterval = Math.ceil(rowInterval / 2);
          rowMin += rowInterval;
          break;
        case VALUES.F: // Lower
          rowInterval = Math.floor(rowInterval / 2);
          break;
        case VALUES.L: // Lower
          columnInterval = Math.floor(columnInterval / 2);
          break;
        case VALUES.R: // Upper
          columnInterval = Math.ceil(columnInterval / 2);
          columnMin += columnInterval;
          break;
        default:
          throw new Error(`Unknown symbol: ${key}`);
      }
    }

    return this.getSeatID(rowMin, columnMin);
  }

  public getSeatID(row: number, column: number) {
    return row * 8 + column;
  }
}

export default new FlyPassService();