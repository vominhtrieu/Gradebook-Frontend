import { Rule } from "rc-field-form/lib/interface";

const studentGradeValidator = async (
  rule: any,
  value: any
): Promise<string> => {
  if (!value) {
    throw Error("Please input grade!");
  }

  const pattern = /[+-]?([0-9]*[.])?[0-9]+/;
  const valueStr = (value as string).trim();
  const valueNumber = parseFloat(valueStr);

  if (pattern.test(valueStr) && valueNumber >= 0 && valueNumber <= 100) {
    return "";
  } else if (valueNumber < 0) {
    throw Error("Student grade must be equal or greater than 0");
  } else if (valueNumber > 100) {
    throw Error("Student grade must be equal or less than 100");
  } else {
    throw Error("Student grade must be a value between 0 and 100");
  }
};

const studentGradeRules: Rule[] = [{ validator: studentGradeValidator }];

export default studentGradeRules;
