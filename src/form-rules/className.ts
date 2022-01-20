import { Rule } from "rc-field-form/lib/interface";

const classNameValidator = async (rule: any, value: any): Promise<string> => {
  if (!value) {
    throw Error("Please input your class name!");
  }

  const minLength = 3;
  const maxLength = 255;
  const valueStr = (value as string).trim();

  if (valueStr.length < minLength) {
    throw Error(`Class name cannot be shorter than ${minLength} characters!`);
  }

  if (valueStr.length > maxLength) {
    throw Error(`Class name cannot be longer than ${maxLength} characters!`);
  }

  return "";
};

const classNameRules: Rule[] = [{ validator: classNameValidator }];

export default classNameRules;
