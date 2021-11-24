import React, { useEffect, useState } from "react";
import { Button, Typography, message, Modal, List, Card } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { postData } from "../../handlers/api";
import ProfileAvatar from "../profile/ProfileAvatar";

const {Title, Text, Paragraph} = Typography;

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
        <Button key="cancel" onClick={handleInviteCancel}>Cancel</Button>,
        <Button key="reject" type="primary" danger onClick={handleInviteReject}>Reject</Button>,
        <Button key="accept" type="primary" onClick={handleInviteAccept}>Accept</Button>
    ];

    return (
        <Card cover={classroom.image ?
            <img style={{width: "100%", height: "300px", objectFit: "cover"}} alt="Background"
                 src={process.env.REACT_APP_API_HOST + classroom.image} /> :
            <div style={{width: "100%", height: "300px", objectFit: "cover", background: "#2F86A6"}} />}>
            <Modal visible={inviteVisible} onCancel={handleInviteCancel} footer={inviteFooter}>
                <p>You have an invitation to this class</p>
            </Modal>
            <div style={{
                display: "flex",
                backgroundColor: "white",
                position: "relative",
                minHeight: "500px"
            }}>
                <div style={{flexBasis: "70%", padding: "1em 3em"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Title level={2}>{classroom.name}</Title>
                    </div>
                    <Paragraph><Text strong={true}>Description: </Text>{classroom.description}</Paragraph>
                </div>
                <div style={{flexBasis: "30%", padding: "10px", borderLeft: "1px solid rgb(0, 0, 0, 0.05)"}}>
                    <div>
                        {haveInvitation &&
                        <Button type="primary" style={{width: "100%", marginBottom: 5}} onClick={handleSeeInviteClick}>See
                            invitation</Button>}
                        <Title level={3}>Teachers</Title>
                        <List itemLayout="horizontal"
                              dataSource={classroom.teachers}
                              renderItem={(item: any) =>
                                  (<List.Item>
                                      <List.Item.Meta style={{display: "flex", alignItems: "center"}}
                                                      avatar={<ProfileAvatar user={item} size={60} />}
                                                      title={item.name} />
                                  </List.Item>)
                              }
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}