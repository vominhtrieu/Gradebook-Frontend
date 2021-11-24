import {Avatar, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import React from "react";

const {Text} = Typography;

type Props = {
    user: {
        avatar: string,
        name: string
    }
}

export default function UserItem({user}: Props) {
    return (
        <Space align="center">
            {user && user.avatar ? <Avatar size={50} src={`${process.env.REACT_APP_API_HOST}${user.avatar}`} /> :
                <Avatar size={50} icon={<UserOutlined />} />}
            <Text>{user.name}</Text>
        </Space>
    )
}