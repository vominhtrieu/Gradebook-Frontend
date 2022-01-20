import { Rule } from "rc-field-form/lib/interface";

const userPasswordValidator = async (
  rule: any,
  value: any
): Promise<string> => {
  if (!value) {
    throw Error("Please input your password!");
  }

  const minLength = 8;
  const maxLength = 16;
  const valueStr = value as string;

  if (valueStr.length < minLength) {
    throw Error(`Password cannot be shorter than ${minLength} characters!`);
  }

  if (valueStr.length > maxLength) {
    throw Error(`Password cannot be longer than ${maxLength} characters!`);
  }

  return "";
};

const userPasswordRules: Rule[] = [
  {
    validator: userPasswordValidator,
  },
];

export default userPasswordRules;
