type RulesMap = {
  [key: string]: {
    [key: string]: number;
  };
};

enum Sort {
  ASC = 'asc',
  DESC = 'desc',
};

class BagService {
  public getBagColorsByContainColor(rules: string[], searchColor: string) {
    const rulesMap = this.getRulesMap(rules);
    const colors = this.getBagsChain(rulesMap, searchColor);
    return (new Set((colors as any).flat())).size;
  }

  public getBagsCount(rules: string[], searchColor: string) {
    const rulesMap = this.getRulesMap(rules, Sort.DESC);
    return this.getBugsCount(rulesMap, searchColor);
  }

  private getRulesMap(rules: string[], sort: Sort = Sort.ASC) {
    const rulesMap:RulesMap = {};
    const isAcs = sort === Sort.ASC;

    rules.forEach((row) => {
      const mainColor = row.replace(/\sbags contain.*/, '');
      const children = row.replace(/.*\sbags contain\s/, '').split(', ');

      if (children[0].trim() === 'no other bags') {
          return;
      }
      
      if (!isAcs && !rulesMap[mainColor]) {
        rulesMap[mainColor] = {};
      }

      children.forEach((child) => {
        const count = Number(child.replace(/\s.*bag.?/, ''));
        const color = child.replace(/\d*\s/, '').replace(/\sbag.?/, '');

        if (isAcs) {
          if (!rulesMap[color]) {
            rulesMap[color] = {};
          }
          rulesMap[color][mainColor] = count;
        } else {
          rulesMap[mainColor][color] = count;
        }
      });
    });

    return rulesMap;
  }

  private getBagsChain(rules: RulesMap, searchColor: string) {
    const colors: string[][] = [];

    if(!rules[searchColor]) {
      return colors;
    }
    
    for (const color of Object.keys(rules[searchColor])) {
      const topColors = this.getBagsChain(rules, color);
      if (!topColors.length) {
        colors.push([color]);
      }
      topColors.forEach((top) => {
        colors.push([...top, color]);
      });
    }

    return colors;
  }

  private getBugsCount(rules: RulesMap, searchColor: string) {
    let count = 0;

    if(!rules[searchColor]) {
      return count;
    }

    for (const color of Object.keys(rules[searchColor])) {
      const countInside = this.getBugsCount(rules, color);

      count += rules[searchColor][color] + countInside * rules[searchColor][color];
    }

    return count;
  }
}

export default new BagService();