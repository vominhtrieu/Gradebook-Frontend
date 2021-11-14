import { Button, ButtonProps } from "antd";

export default function ProfileSingleFieldButton({ ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      style={{
        borderRadius: "5px",
      }}
    />
  );
}
