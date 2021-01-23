class DeclarationService {
  public getGroupsCountAnswers(answers: string[]) {
    let count: number[] = [];

    for (const group of answers) {
      count.push((new Set(group.replace(/\s*/g, '').split(''))).size);
    }

    return count;
  }
}

export default new DeclarationService();