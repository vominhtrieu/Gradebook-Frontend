import {Button, Space} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import UserItem from "../UserItem";
import React from "react";

export default function TeachersSection() {
    return (
        <>
            <Space direction="vertical" style={{position: "relative", width: "100%"}}>
                <Button type="primary" icon={<UserAddOutlined />} style={{ position: "absolute", top: 0, right: 0}}>Invite</Button>
                <UserItem user={{avatar: "", name: "Promax Teacher"}}/>
                {[...Array.from({length: 30}, (v, i) => i)].map(i => (
                    <UserItem key={i} user={{avatar: "", name: `Promax Teacher ${i}`}}/>
                    ))}
            </Space>
        </>
    )
}