import { Button, ButtonProps, Space, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "./ProfileButton.css";

interface ProfileButtonProps extends ButtonProps {
  avatar?: React.ReactNode;
  title: "password" | string;
  children?: string;
}

export default function ProfileButton({ ...props }: ProfileButtonProps) {
  return (
    <Button {...props} className="profile-btn">
      <Space className="profile-btn_inner-wrapper" direction="horizontal">
        <Typography.Title className="profile-btn_title">
          {props.title}
        </Typography.Title>
        {props.title === "password" ? (
          <Typography.Text className="profile-btn_description">
            Click here to change your password
          </Typography.Text>
        ) : (
          <Typography.Text className="profile-btn_description">
            {props.children}
          </Typography.Text>
        )}
        <RightOutlined />
      </Space>
    </Button>
  );
}
