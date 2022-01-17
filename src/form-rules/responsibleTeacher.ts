import { Rule } from "rc-field-form/lib/interface";

const responsibleTeacherValidator = async (
  rule: any,
  value: any
): Promise<string> => {
  if (value === undefined) {
    throw Error("Please select responsible teacher!");
  }

  return "";
};

const responsibleTeacherRules: Rule[] = [
  { validator: responsibleTeacherValidator },
];

export default responsibleTeacherRules;
