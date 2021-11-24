import {Avatar, Space} from "antd";
import {API_HOST} from "../../configs/api";
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
            {user && user.avatar ? <Avatar size={80} src={`${API_HOST}${user.avatar}`} /> :
                <Avatar size={50} icon={<UserOutlined />} />}
            <Text>{user.name}</Text>
        </Space>
    )
}