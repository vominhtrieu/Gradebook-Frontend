import { Button, ButtonProps, Space, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "./ProfileButton.css";
import React from "react";
import { Link } from "react-router-dom"

interface ProfileButtonProps extends ButtonProps {
    avatar?: React.ReactNode;
    title: string;
    value: string;
    href: string;
}

export default function ProfileButton({title, value, href}: ProfileButtonProps) {
    const buttonDom = <Button style={{height: "fit-content"}} block className="profile-btn">
        <Space className="profile-btn_inner-wrapper" direction="horizontal">
            <Typography.Title className="profile-btn_title">
                {title}
            </Typography.Title>

            <div style={{display: "flex", justifyContent: "start", alignItems: "start", flexFlow: "column", padding: 0, margin: 0}}>
                <Typography.Text style={{height: 20, textAlign: "left"}}>
                    {value}
                </Typography.Text>
                {href.length > 0 ? <Typography.Text italic  style={{height: 20}}>
                    Click here to change
                </Typography.Text> : null}
            </div>
            {href.length > 0 ? <RightOutlined /> : null}
        </Space>
    </Button>
    if (href !== "") {
        return (
            <Link to={href}>
                {buttonDom}
            </Link>
        );
    }
    return buttonDom
}
