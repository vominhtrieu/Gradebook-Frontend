import { Rule } from "rc-field-form/lib/interface";

const userEmailValidator = async (rule: any, value: any): Promise<string> => {
  if (!value) {
    throw Error("Please input your email!");
  }

  const pattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const valueStr = (value as string).trim();

  if (pattern.test(valueStr)) {
    const localLimitLen = 64;
    const domainLimitLen = 255;
    const localPart = valueStr.split("@")[0];
    const domainPart = valueStr.split("@")[1];

    if (
      localPart.length > localLimitLen ||
      domainPart.length > domainLimitLen
    ) {
      throw Error("Invalid email!");
    }

    return "";
  } else {
    throw Error("Invalid email!");
  }
};

const userEmailRules: Rule[] = [{ validator: userEmailValidator }];

export default userEmailRules;
