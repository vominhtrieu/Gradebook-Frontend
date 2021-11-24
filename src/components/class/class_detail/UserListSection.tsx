import {Button, Space} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import UserItem from "../UserItem";
import React from "react";

export default function UserListSection({users, isTeacher}: any) {
    return (
        <>
            <Space direction="vertical" style={{position: "relative", width: "100%", marginTop: "16px"}}>
                {isTeacher && <Button type="primary" icon={<UserAddOutlined/>}
                                      style={{position: "absolute", top: 0, right: 0}}>Invite</Button>}
                {Array.isArray(users) && users.length ? users.map((user: any, i: number) => (
                    <UserItem key={i} user={user}/>
                )) : <p>Nobody join yet</p>}
            </Space>
        </>
    )
}