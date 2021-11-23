import { Rule } from "rc-field-form/lib/interface";

const userNameValidator = async (rule: any, value: any): Promise<string> => {
  if (!value) {
    throw Error("Please input your name!");
  }

  const minLength = 6;
  const maxLength = 60;
  const pattern = /[^a-zA-Z0-9 ]/;
  const valueStr = (value as string).trim();

  if (pattern.test(valueStr)) {
    throw Error("Name must not contain special characters!");
  }

  if (valueStr.length < minLength) {
    throw Error(`Name can be no shorter than ${minLength} characters!`);
  }

  if (valueStr.length > maxLength) {
    throw Error(`Name can be no longer than ${maxLength} characters!`);
  }

  return "";
};

const userNameRules: Rule[] = [{ validator: userNameValidator }];

export default userNameRules;
