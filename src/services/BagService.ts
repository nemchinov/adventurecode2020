type RulesMap = {
  [key: string]: {
    [key: string]: number;
  };
};

class BagService {
  public getBagColorsByContainColor(rules: string[], searchColor: string) {
    const { rulesMap, lists } = this.getRulesMap(rules);
    const colors = this.getbagsChain(rulesMap, searchColor);
    return (new Set((colors as any).flat())).size;
  }

  public getRulesMap(rules: string[]) {
    const rulesMap:RulesMap = {};
    const lists = new Set();
    const tops = new Set();

    rules.forEach((row) => {
      const mainColor = row.replace(/\sbags contain.*/, '');
      const children = row.replace(/.*\sbags contain\s/, '').split(', ');

      if (children[0] === 'no other bags') {
        lists.add(mainColor);
        return;
      }

      tops.add(mainColor);
      children.forEach((child) => {
        const count = Number(child.replace(/\s.*bag.?/, ''));
        const color = child.replace(/\d*\s/, '').replace(/\sbag.?/, '');

        if (!rulesMap[color]) {
          rulesMap[color] = {};
        }
        rulesMap[color][mainColor] = count;
        tops.delete(color);
      });
    });

    return { rulesMap, lists: Array.from(lists.keys()), tops: Array.from(tops.keys()) };
  }

  private getbagsChain(rules: RulesMap, searchColor: string) {
    const colors: string[][] = [];

    if(!rules[searchColor]) {
      return colors;
    }
    
    for (const color of Object.keys(rules[searchColor])) {
      const topColors = this.getbagsChain(rules, color);
      if (!topColors.length) {
        colors.push([color]);
      }
      topColors.forEach((top) => {
        colors.push([...top, color]);
      });
    }

    return colors;
  }
}

export default new BagService();