import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import MainSider from "./MainSider";
import { Content } from "antd/es/layout/layout";
import UserManagement from "./UserManagement";
import ClassroomManagement from "./ClassroomManagement";
import AdminManagement from "./AdminManagement";

export default function Admin() {
    return (
        <Layout style={{
            height: "100vh"
        }}>
            <MainSider />
            <Content style={{padding: 10}}>
                <Switch>
                    <Route exact path="/admin/">
                        <Redirect to="/admin/users" />
                    </Route>
                    <Route path="/admin/users">
                        <UserManagement />
                    </Route>
                    <Route path="/admin/classrooms">
                        <ClassroomManagement />
                    </Route>
                    <Route path="/admin/admins">
                        <AdminManagement />
                    </Route>
                </Switch>
            </Content>
        </Layout>
    );
}