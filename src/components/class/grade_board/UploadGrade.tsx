import { Button, message, Tooltip, Upload } from "antd";
import { useContext } from "react";
import { MainContext } from "../../../contexts/main";
import { UploadOutlined } from "@ant-design/icons";

interface GradeBoardMoreMenuProps {
    classId: number
}

export default function UploadGrade({classId}: GradeBoardMoreMenuProps) {
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
        <Button>
            <Tooltip title="Upload grades for this column">
                <Upload accept=".xlsx" showUploadList={false}
                        headers={{Authorization: `Bearer ${localStorage.getItem("token")}`}}
                        action={`/classrooms/${classId}/grades/import`}
                        onChange={handleUploadChanged}>
                    <UploadOutlined />
                </Upload>
            </Tooltip>
        </Button>
    );
}
