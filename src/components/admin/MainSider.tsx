import React from "react";
import { Menu } from 'antd';
import {
    UserOutlined,
    ReadOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

export default function MainSider() {
    const location = useLocation();
    const history = useHistory();
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <Menu theme="dark" mode="inline"
                  defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin/users" icon={<UserOutlined />} onClick={() => history.push("/admin/users")}>
                    Users
                </Menu.Item>
                <Menu.Item key="/admin/classrooms" icon={<ReadOutlined />}
                           onClick={() => history.push("/admin/classrooms")}>
                    Classes
                </Menu.Item>
                <Menu.Item key="/admin/admins" icon={<UserOutlined />} onClick={() => history.push("/admin/admins")}>
                    Admins
                </Menu.Item>
                <Menu.Item key="/signin" icon={<CloseCircleOutlined />}
                           onClick={() => history.push("/signin")}>
                    Sign out
                </Menu.Item>
            </Menu>
        </Sider>
    );
}