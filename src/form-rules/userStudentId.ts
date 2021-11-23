import { Rule } from "rc-field-form/lib/interface";

const userStudentIdValidator = async (
  rule: any,
  value: any
): Promise<string> => {
  if (!value) {
    throw Error("Please input your student id!");
  }

  const length = 8;
  const pattern = /^\d+$/;
  const valueStr = (value as string).trim();

  if (valueStr.length !== length) {
    throw Error(`Student Id must have 8 digits`);
  }

  if (pattern.test(valueStr)) {
    return "";
  } else {
    throw Error(`Student Id must have 8 digits`);
  }
};

const userStudentIdRules: Rule[] = [{ validator: userStudentIdValidator }];

export default userStudentIdRules;
