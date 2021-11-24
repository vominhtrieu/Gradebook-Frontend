import React, {useState} from "react";
import {AutoComplete, Button, Input, message, Modal, Tooltip} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import ClipboardJS from "clipboard";
import {postData} from "../../../handlers/api";

new ClipboardJS(".btn");

const {Option} = AutoComplete;

export default function InviteModal({
                                        classroomId,
                                        teacherInvitationCode,
                                        studentInvitationCode,
                                        visible,
                                        onClose
                                    }: any) {
    const [input, setInput]: any = useState(null);
    const [userOptions, setUserOptions]: any = React.useState([]);
    const [selectedEmail, setSelectedEmail]: any = React.useState(null);

    const handleSearch = (value: string) => {
        if (value !== "") {
            postData("/users/find-by-email", {email: value}).then((users) => {
                setUserOptions(users);
            }).catch(() => message.error("Something went wrong!"));
        } else {
            setUserOptions([]);
        }
    }

    const onSelect = (data: any) => {
        setSelectedEmail(data);
    };

    const handleInputChange = (value: any) => {
        if (!value) {
            setSelectedEmail("");
        }
        setInput(value);
    }

    const handleSendInvite = () => {
        if (selectedEmail !== "" && selectedEmail !== null) {
            postData("/classrooms/send-invitation-link", {
                classroomId: classroomId,
                email: selectedEmail,
                role: teacherInvitationCode ? "teacher" : "student"
            }).then((msg) => {
                message.success(msg);
            }).catch(() => message.error("Something went wrong!"));
        } else {
            message.error("Must enter email");
        }
    }

    const inviteLink = `http://localhost:3000/classrooms/1?${teacherInvitationCode ? "teacherInvitationCode" : "studentInvitationCode"}=${teacherInvitationCode ? teacherInvitationCode : studentInvitationCode}`;

    return (
        <Modal visible={visible} onCancel={onClose} onOk={handleSendInvite} okText="Send" title="Invite User">
            <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}}>
                <Input style={{width: "80%"}} defaultValue={inviteLink}/>
                <Tooltip title="Copy Link">
                    <Button className="btn" data-clipboard-text={inviteLink} icon={<CopyOutlined/>}/>
                </Tooltip>
                <p style={{marginTop: "20px"}}>Enter email to receive invitation:</p>
                <AutoComplete value={input} style={{flexBasis: "80%"}} onSelect={onSelect}
                              onChange={handleInputChange} onSearch={handleSearch}>
                    {userOptions.map((user: any, i: number) => (
                        <Option key={user.id} value={user.email}>
                            {user.email}
                        </Option>
                    ))}
                </AutoComplete>
            </div>
        </Modal>
    )
}