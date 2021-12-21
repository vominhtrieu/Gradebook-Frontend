import { Button, List } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import InviteModal from "../../invitation/InviteModal";
import ProfileAvatar from "../../../profile/ProfileAvatar";

export default function UserListSection({
                                            users,
                                            isTeacher,
                                            classroomId,
                                            teacherInvitationCode,
                                            studentInvitationCode
                                        }: any) {
    const [inviteVisible, setInviteVisible]: any = React.useState(false);

    const handleInviteClick = () => {
        setInviteVisible(true);
    }

    const handleInviteClose = () => {
        setInviteVisible(false);
    }

    return (
        <>
            {
                isTeacher ?
                    <>
                        <InviteModal visible={inviteVisible} onClose={handleInviteClose}
                                     classroomId={classroomId}
                                     teacherInvitationCode={teacherInvitationCode}
                                     studentInvitationCode={studentInvitationCode} />
                        <Button type="primary" icon={<UserAddOutlined />}
                                onClick={handleInviteClick}>Invite new user</Button>
                    </> : null
            }
            <List itemLayout="horizontal"
                  dataSource={users}
                  renderItem={(item: any) =>
                      (<List.Item>
                          <List.Item.Meta style={{display: "flex", alignItems: "center"}}
                                          avatar={<ProfileAvatar user={item} size={60} />}
                                          title={item.name} />
                      </List.Item>)
                  }
            />
        </>
    )
}