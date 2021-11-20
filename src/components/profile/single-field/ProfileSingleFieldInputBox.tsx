import { FormItemProps } from "antd";
import FormItem from "antd/lib/form/FormItem";

export default function ProfileSingleFieldInputBox({
  ...props
}: FormItemProps) {
  return (
    <FormItem
      {...props}
      style={{
        fontWeight: 700,
        marginBottom: "10px",
        textTransform: "uppercase",
      }}
    />
  );
}
