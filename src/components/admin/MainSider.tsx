import React, { useState } from "react";
import { Menu } from 'antd';
import {
    UserOutlined,
    ReadOutlined
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import {useHistory} from "react-router";

export default function MainSider() {
    const history = useHistory();
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />} onClick={()=>history.push("/admin/users")}>
                    Users
                </Menu.Item>
                <Menu.Item key="2" icon={<ReadOutlined />} onClick={()=>history.push("/admin/classrooms")}>
                    Classes
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />} onClick={()=>history.push("/admin/admins")}>
                    Admins
                </Menu.Item>
            </Menu>
        </Sider>
    );
}