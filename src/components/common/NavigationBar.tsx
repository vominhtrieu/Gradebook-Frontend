import { Menu, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import NewClass from "../class/NewClass";
import { useContext, useEffect, useState } from "react";
import { getData } from "../../handlers/api";
import { MainContext } from "../../contexts/main";

export default function NavigationBar() {
    const location = useLocation();
    const [newClassVisible, setNewClassVisible] = useState(false);
    const [unreadNotification, setUnreadNotification] = useState(0);
    const mainContext = useContext(MainContext);

    useEffect(() => {
        mainContext.socket.on("unreadNotification", () => {
            getData("/notifications/unread").then((count) => {
                setUnreadNotification(count);
            });
        })
        return () => {
            mainContext.socket.removeListener("unreadNotification");
        }
    }, [mainContext.socket])
    useEffect(() => {
        getData("/notifications/unread").then((count) => {
            setUnreadNotification(count);
        });
    }, []);
    useEffect(() => {
        if (location.pathname === "/notifications") {
            setUnreadNotification(0);
        }
    }, [location.pathname])
    return (
        <>
            <NewClass visible={newClassVisible} setVisible={setNewClassVisible} />
            <Space
                style={{
                    maxWidth: 1200,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "right",
                }}
            >
                <Menu
                    style={{padding: "0 10px", width: "auto"}}
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname]}
                >
                    <Menu.Item
                        key={"/new-classroom"}
                        onClick={() => setNewClassVisible(true)}
                    >
                        Create
                    </Menu.Item>
                    <Menu.Item key={"/"}>
                        <Link to={"/"}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key={"/profile"}>
                        <Link to={"/profile"}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item key={"/notifications"}>
                        <Link to={"/notifications"}>{unreadNotification === 0 ? "Notifications" :
                            <b>Notification {unreadNotification}</b>}</Link>
                    </Menu.Item>
                    <Menu.Item key={"/signin"}>
                        <Link to={"/signin"}>Sign out</Link>
                    </Menu.Item>
                </Menu>
            </Space>
        </>
    );
}