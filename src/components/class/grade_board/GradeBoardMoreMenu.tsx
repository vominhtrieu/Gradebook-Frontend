import {Menu, message, Upload} from "antd";
import {useContext} from "react";
import {MainContext} from "../../../contexts/main";

interface GradeBoardMoreMenuProps {
    classId: number
}

export default function GradeBoardMoreMenu({classId}: GradeBoardMoreMenuProps) {
    const mainContext = useContext(MainContext);

    const handleUploadChanged = (info: any) => {
        if (info.file.status === "uploading") {
            return message.loading("Importing grades...");
        }
        if (info.file.status === "done") {
            mainContext.setReloadNeeded(true);
            return message.success("Grade column has been updated");
        }
        if (info.file.status === "error") {
            return message.error("Cannot import grades, please try again!");
        }
    }

    return (
        <Menu
            style={{
                width: "100px",
                textAlign: "center",
            }}
        >
            <Menu.Item>
                <Upload accept=".csv,.xlsx" showUploadList={false}
                        headers={{Authorization: `Bearer ${localStorage.getItem("token")}`}}
                        action={`/classrooms/${classId}/grades/import`}
                        onChange={handleUploadChanged}>Upload</Upload>
            </Menu.Item>
        </Menu>
    );
}
