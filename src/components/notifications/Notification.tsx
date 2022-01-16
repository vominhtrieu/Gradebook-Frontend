import { List } from 'antd';
import React, { useEffect } from "react";
import { getData } from "../../handlers/api";
import { Link } from "react-router-dom";

export default function Notification() {
    const [notifications, setNotifications] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getData("/notifications").then((notifications) => {
            setNotifications((notifications));
            setLoading(false);
        })
    }, []);

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
                            title={item.title}
                            description={item.content}
                        />
                    </List.Item>
                </Link>
            )}
        />)
}