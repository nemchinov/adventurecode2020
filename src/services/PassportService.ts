class PassportService {
  public getCountValidPassports(passportsRaw: string[], fieldsList: string[], fieldCanSkip: string[]) {
    const fields = fieldsList.filter((field) => !(fieldCanSkip.includes(field)));
    return passportsRaw.filter((raw) => {
      return this.checkPassport(raw, fields);
    }).length;
  }

  private checkPassport(raw: string, fieldsList: string[]) {
    const regexp = new RegExp(`(${ fieldsList.join('|') })`, 'gmi')
    const findFields = raw.match(regexp);
    return fieldsList.length === new Set(findFields).size;
  }
}

export default new PassportService();