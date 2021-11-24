import {Button, Space} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import UserItem from "../UserItem";
import React from "react";
import InviteModal from "../invitation/InviteModal";

export default function UserListSection({users, isTeacher, classroomId, teacherInvitationCode, studentInvitationCode}: any) {
    const [inviteVisible, setInviteVisible]: any = React.useState(false);

    const handleInviteClick = () => {
        setInviteVisible(true);
    }

    const handleInviteClose = () => {
        setInviteVisible(false);
    }

    return (
        <>
            {isTeacher && <InviteModal visible={inviteVisible} onClose={handleInviteClose}
                                       classroomId={classroomId}
                                       teacherInvitationCode={teacherInvitationCode}
                                       studentInvitationCode={studentInvitationCode}/>}
            <Space direction="vertical" style={{position: "relative", width: "100%", marginTop: "16px"}}>
                {isTeacher && <Button type="primary" icon={<UserAddOutlined/>}
                                      style={{position: "absolute", top: 0, right: 0}}
                                      onClick={handleInviteClick}>Invite</Button>}
                {Array.isArray(users) && users.length ? users.map((user: any, i: number) => (
                    <UserItem key={i} user={user}/>
                )) : <p>Nobody join yet</p>}
            </Space>
        </>
    )
}