import { List } from 'antd';
import React, { useContext, useEffect } from "react";
import { getData } from "../../handlers/api";
import { Link } from "react-router-dom";
import { MainContext } from "../../contexts/main";

export default function Notification() {
    const [notifications, setNotifications] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);
    const mainContext = useContext(MainContext);

    useEffect(() => {
        const fetchData = () => {
            getData("/notifications").then((notifications) => {
                setNotifications((notifications));
                setLoading(false);
            })
        }
        fetchData();
        mainContext.socket.on("newNotification", () => {
            fetchData();
        })

        return ()=>{
            mainContext.socket.removeListener("newNotification");
        }
    }, [mainContext.socket])

    return (
        <List
            itemLayout="horizontal"
            bordered
            loading={loading}
            style={{marginTop: 10, background: "white"}}
            dataSource={notifications}
            renderItem={(item: any) => (
                <Link to={item.href}>
                    <List.Item>
                        <List.Item.Meta
                            title={<b style={{
                                color: item.read ? "#333333" : "black",
                                fontWeight: item.read ? 500 : 600
                            }}>{item.title}</b>}
                            description={
                                <span
                                    style={{color: item.read ? "#333333" : "black", fontWeight: item.read ? 400 : 500}}>
                                {item.content}
                                </span>
                            }
                        />
                    </List.Item>
                </Link>
            )}
        />)
}