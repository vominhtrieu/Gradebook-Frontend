import React from "react";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import { API_HOST } from "../../configs/api";
import {Link} from "react-router-dom";

export default function Class({classID, name, teacher, cover}: any) {
    let image = <div style={{
        objectFit: "fill", height: 180, background: "#2F86A6", borderRadius: "2px 2px 0 0",
        border: "1px solid #F0F0F0", boxSizing: "border-box"
    }} />
    if (cover && cover.length > 0) {
        image = <img height={180}
                     style={{
                         objectFit: "fill",
                         borderRadius: "2px 2px 0 0",
                         border: "1px solid #F0F0F0",
                         boxSizing: "border-box"
                     }}
                     alt={`Cannot load cover`}
                     src={`${API_HOST}${cover}`} />
    }
    return <Card style={{margin: 10}}
                 bordered={true}
                 cover={image}>
        <Meta avatar={teacher.avatar ? <Avatar size="large" src={`${API_HOST}${teacher.avatar}`} /> :
            <Avatar size="large" icon={<UserOutlined />} />}
              title={<Link to={`/classrooms/${classID}`} style={{color: "#000000"}}>{name}</Link>}
              description={teacher.name} />
    </Card>
}