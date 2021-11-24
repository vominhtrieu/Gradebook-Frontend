import React, {useEffect, useState} from "react";
import {Button, Space, Typography, message, Modal} from "antd";
import UserItem from "./UserItem";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {postData} from "../../handlers/api";
import {API_HOST} from "../../configs/api";

const {Title, Text} = Typography;

type URLParams = {
    id: string,
    tab: string
}

export default function ClassDetailPublic({classroom}: any) {
    const location = useLocation();
    const {id} = useParams<URLParams>();
    const history = useHistory();
    const [inviteVisible, setInviteVisible]: any = useState(false);
    const [haveInvitation, setHaveInvitation]: any = useState(false);

    useEffect(() => {
        const queryString = new URLSearchParams(location.search);
        if (queryString.has("teacherInvitationCode") || queryString.has("studentInvitationCode")) {
            setHaveInvitation(true);
        }
    }, [location.search]);

    const handleEnrollClick = () => {
        message.error("You can't enroll yourself yet!");
    }

    const handleInviteCancel = () => {
        setInviteVisible(false);
    }

    const handleInviteAccept = () => {
        const queryString = new URLSearchParams(location.search);
        postData(`/classrooms/${id}/enroll`, {
            teacherInvitationCode: queryString.get("teacherInvitationCode"),
            studentInvitationCode: queryString.get("studentInvitationCode")
        }).then((data) => {
            history.push(`/classrooms/${id}`);
        }).catch(() => message.error("Something went wrong!"));
    }

    const handleInviteReject = () => {
        history.push(`/classrooms/${id}`);
    }

    const handleSeeInviteClick = () => {
        setInviteVisible(true);
    }

    const inviteFooter = [
        <Button key="cancel" type="primary" danger onClick={handleInviteCancel}>Cancel</Button>,
        <Button key="reject" onClick={handleInviteReject}>Nah</Button>,
        <Button key="accept" type="primary" onClick={handleInviteAccept}>Accept</Button>
    ];

    let image = <div style={{
        objectFit: "fill", width: "100%", height: "50%", background: "#2F86A6", borderRadius: "2px 2px 0 0",
        border: "1px solid #F0F0F0", boxSizing: "border-box", position: "absolute", left: 0, top: "64px"
    }}/>
    if (classroom.image && classroom.image.length > 0) {
        image = <img height={"auto"}
                     style={{
                         width: "100%",
                         objectFit: "cover",
                         borderRadius: "2px 2px 0 0",
                         border: "1px solid #F0F0F0",
                         boxSizing: "border-box",
                         position: "absolute",
                         left: 0,
                         top: "64px"
                     }}
                     alt={`Cannot load cover`}
                     src={`${API_HOST}${classroom.image}`}/>
    }

    return (
        <>
            <Modal visible={inviteVisible} onCancel={handleInviteCancel} footer={inviteFooter}>
                <p>You have an invitation to this class</p>
            </Modal>
            {image}
            <div style={{
                display: "flex",
                backgroundColor: "white",
                position: "relative",
                marginTop: "100px",
                minHeight: "500px"
            }}>
                <div style={{flexBasis: "70%", padding: "1em 3em"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Title level={2}>{classroom.name}</Title>
                        <Button type="primary" onClick={handleEnrollClick}>Enroll</Button>
                    </div>
                    <Text>{classroom.description}</Text>
                </div>
                <div style={{flexBasis: "30%", padding: "10px", borderLeft: "1px solid rgb(0, 0, 0, 0.25)"}}>
                    <Space direction="vertical">
                        {haveInvitation &&
                        <Button onClick={handleSeeInviteClick} style={{width: "100%"}}>See invitation</Button>}
                        <Title level={3}>Teachers</Title>
                        {Array.isArray(classroom.teachers) && classroom.teachers.length && classroom.teachers.map((teacher: any, i: number) => (
                            <UserItem user={teacher} key={i}/>
                        ))}
                    </Space>
                </div>
            </div>
        </>
    );
}