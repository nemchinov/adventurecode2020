class DeclarationService {
  public getGroupsCountAnswers(answers: string[]) {
    let count: number[] = [];

    for (const group of answers) {
      count.push((new Set(group.replace(/\s*/g, '').split(''))).size);
    }

    return count;
  }

  public getGroupsCountSameAnswers(answers: string[]) {
    let count: number[] = [];

    for (const group of answers) {
      const groupSplit = group.split('\n').map((v) => v.trim().split(''));
      let intersection = groupSplit[0];

      for (let i = 1; i < groupSplit.length; i++) {
        intersection = intersection.filter(x => groupSplit[i].includes(x));
      }

      count.push(new Set(intersection).size);
    }

    return count;
  }
}

export default new DeclarationService();