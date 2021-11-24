import React, { useState } from "react";
import { Layout, Menu, Space } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Homepage from "./class/Homepage";
import Profile from "./profile/Profile";
import NewClass from "./class/NewClass";
import { MainContext } from "../contexts/main";
import ClassDetailJoined from "./class/ClassDetailJoined";


export default function Main() {
    const location = useLocation();
    const [newClassVisible, setNewClassVisible] = useState(false);
    const [reloadNeeded, setReloadNeeded] = useState(true);

    const token = localStorage.getItem("token");

    return (
        <MainContext.Provider value={{reloadNeeded: reloadNeeded, setReloadNeeded: setReloadNeeded}}>
            {token === null || token.length === 0 ?
                <Redirect to="/signin" /> : null
            }
            <NewClass visible={newClassVisible} setVisible={setNewClassVisible} />
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', background: "white"}}>
                    <Space style={{maxWidth: 1200, margin: "auto", display: "flex", justifyContent: "right"}}>
                        <Menu style={{padding: "0 10px", width: "auto"}} mode="horizontal"
                              defaultSelectedKeys={[location.pathname]}>
                            <Menu.Item key={"/new-classroom"} onClick={() => setNewClassVisible(true)}>
                                Create
                            </Menu.Item>
                            <Menu.Item key={"/"}>
                                <Link to={"/"}>Home</Link>
                            </Menu.Item>
                            <Menu.Item key={"/profile"}>
                                <Link to={"/profile"}>Profile</Link>
                            </Menu.Item>
                            <Menu.Item key={"/signin"}>
                                <Link to={"/signin"}>Sign out</Link>
                            </Menu.Item>
                        </Menu>
                    </Space>
                </Header>
                <Content style={{paddingTop: 70, maxWidth: 1200, width: "100%", margin: "auto"}}>
                    <Switch>
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/classrooms/:id/:tab?" component={ClassDetailJoined}>
                        </Route>
                        <Route path="*">
                            <p>404 Page Not Found</p>
                        </Route>
                    </Switch>
                </Content>
                <Footer style={{textAlign: 'center'}}>Vo Minh Trieu ©2021. Image from Freepik.</Footer>
            </Layout>
        </MainContext.Provider>);
}