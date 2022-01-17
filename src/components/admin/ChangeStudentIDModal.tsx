import { Input, message, Modal } from "antd";
import React from "react";
import { putData } from "../../handlers/api";

export default function ChangeStudentIDModal({record, visible, onSuccess, onCancel}: any) {
    const [studentId, setStudentID] = React.useState("");
    const submitData = () => {
        putData("/admin/users/student-id", {
            id: record.id,
            studentId,
        }).then(()=>{
            message.success("Success");
            onSuccess();
        })
    }

    React.useEffect(() => {
        if (record)
            setStudentID(record.studentId);
    }, [record]);

    return (
        <Modal title="Change Student ID" visible={visible} onOk={submitData} onCancel={onCancel}>
            <Input placeholder="Name" style={{marginBottom: 10}} value={record ? record.name : ""} disabled />
            <Input placeholder="Student ID" value={studentId} onChange={(e) => setStudentID(e.target.value)} />
        </Modal>
    )
}