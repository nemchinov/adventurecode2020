import { mainModule } from "process";

export enum FieldTypes {
  NUMBER = 'number',
  SIZE = 'size',
  COLOR = 'color',
  ENUM = 'enum',
  PID = 'pid',
};

export enum MeasurementType {
  INCHES = 'in',
  SM = 'sm',
};

export type PassportType = {
  [key: string]: string;
};

export type FieldRule = {
  type: FieldTypes;
  min?: number;
  max?: number;
  measurement?: {
    [key: string]: {
      min: number;
      max: number;
    }
  };
  values?: string[];
  ignore?: boolean;
};

export const fieldRules: { [key: string]: FieldRule } = {
  byr: {
    type: FieldTypes.NUMBER,
    min: 1920,
    max: 2002,
  },
  iyr: {
    type: FieldTypes.NUMBER,
    min: 2010,
    max: 2020,
  },
  eyr: {
    type: FieldTypes.NUMBER,
    min: 2020,
    max: 2030,
  },
  hgt: {
    type: FieldTypes.SIZE,
    measurement: {
      [MeasurementType.INCHES]: {
        min: 59,
        max: 76,
      },
      [MeasurementType.SM]: {
        min: 150,
        max: 193,
      }
    }
  },
  hcl: {
    type: FieldTypes.COLOR,
  },
  ecl: {
    type: FieldTypes.ENUM,
    values: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
  },
  pid: {
    type: FieldTypes.PID,
  },
  cid: {
    type: FieldTypes.PID,
    ignore: true,
  }
};

class PassportService {
  public getCountValidPassports(passportsRaw: string[], strict = false) {
    const fieldList = Object.keys(fieldRules).filter((key) => !fieldRules[key].ignore);
    return passportsRaw.filter((raw) => {
      const allFieldsExists = this.checkPassportFieldExists(raw, fieldList);
      if (allFieldsExists && strict) {
        const passport = this.parsePassport(raw);
        return this.checkPassportFieldTypes(passport);
      }
      return allFieldsExists;
    }).length;
  }

  private checkPassportFieldExists(raw: string, fieldsList: string[]) {
    const regexp = new RegExp(`(${ fieldsList.join('|') })`, 'gmi')
    const findFields = raw.match(regexp);
    return fieldsList.length === new Set(findFields).size;
  }

  private checkPassportFieldTypes(passport: PassportType) {
    for(const [fieldKey, fieldValue] of Object.entries(passport)) {
      const fieldRule = fieldRules[fieldKey];
      
      if (fieldRule.ignore) {
        continue;
      }

      switch(fieldRule.type) {
        case FieldTypes.NUMBER:
          const number = Number(fieldValue);
          if (!(Number.isInteger(number) && number >= fieldRule.min && number <= fieldRule.max)) {
            return false;
          }
          break;
        case FieldTypes.COLOR:
          // # followed by exactly six characters 0-9 or a-f
          if (!/^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(fieldValue)) {
            return false;
          }
          break;
        case FieldTypes.ENUM:
          if(!fieldRule.values.includes(fieldValue)) {
            return false;
          }
          break;
        case FieldTypes.PID:
          // nine-digit number, including leading zeroes
          if (!/^\d{9}$/i.test(fieldValue)) {
            return false;
          }
          break;
        case FieldTypes.SIZE:
          if (!/^\d*(in|cm)$/.test(fieldValue)) {
            return false;
          }
          const measurement = fieldValue.includes(MeasurementType.INCHES) ? MeasurementType.INCHES : MeasurementType.SM;
          const value = Number(fieldValue.replace(/[a-z]/g, ''));
          const rule = fieldRule.measurement[measurement];
          if (!(value <= rule.max && value >= rule.min)) {
            return false;
          }
          break;
        default:
          throw new Error('Unknown field type');
      }
    }

    return true;
  }

  private parsePassport(raw: string): PassportType {
    const fields = raw.split(/\s|\n/g);
    return fields.reduce((collector, field) => {
      if (field) {
        const parsedField = field.split(':');
        collector[parsedField[0]] = parsedField[1];
      }

      return collector;
    }, {});
  }
}

export default new PassportService();