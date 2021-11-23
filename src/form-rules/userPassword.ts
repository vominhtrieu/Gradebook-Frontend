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
  const pattern = /[^a-zA-Z0-9]/;
  const valueStr = value as string;

  if (pattern.test(valueStr)) {
    throw Error("Password must not contain special characters and space!");
  }

  if (valueStr.length < minLength) {
    throw Error(`Password can be no shorter than ${minLength} characters!`);
  }

  if (valueStr.length > maxLength) {
    throw Error(`Password can be no longer than ${maxLength} characters!`);
  }

  return "";
};

const userPasswordRules: Rule[] = [
  {
    validator: userPasswordValidator,
  },
];

export default userPasswordRules;
