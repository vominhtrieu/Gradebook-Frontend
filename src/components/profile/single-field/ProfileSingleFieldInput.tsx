import { Input, InputProps } from "antd";

export default function ProfileSingleFieldInput({ ...props }: InputProps) {
  return (
    <>
      {props.type === "password" ? (
        <Input.Password
          {...props}
          style={{
            height: "45px",
            marginBottom: "3px",
            borderRadius: "5px",
          }}
        />
      ) : (
        <Input
          {...props}
          style={{
            height: "45px",
            marginBottom: "3px",
            borderRadius: "5px",
          }}
        />
      )}
    </>
  );
}
