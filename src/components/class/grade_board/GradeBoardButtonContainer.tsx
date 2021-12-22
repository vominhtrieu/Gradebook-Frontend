import {Button, Dropdown, message, Tooltip, Upload} from "antd";
import {
    RollbackOutlined,
    DownloadOutlined,
    UploadOutlined,
    CaretDownOutlined,
    ExportOutlined,
} from "@ant-design/icons";
import GradeBoardDownloadMenu from "./GradeBoardDownloadMenu";
import {useContext} from "react";
import {MainContext} from "../../../contexts/main";

interface GradeBoardButtonContainerProps {
    classId: number
    students: object[]
}

export default function GradeBoardButtonContainer({classId, students}: GradeBoardButtonContainerProps) {
    const mainContext = useContext(MainContext);

    const menu = (
        <GradeBoardDownloadMenu students={students}/>
    )

    const handleUploadChanged = (info: any) => {
        if (info.file.status === "uploading") {
            return message.loading("Importing student list...");
        }
        if (info.file.status === "done") {
            mainContext.setReloadNeeded(true);
            return message.success("Student list has been updated");
        }
        if (info.file.status === "error") {
            return message.error("Cannot import student list, please try again!");
        }
    }

    return (
        <div className="grade-board_button-container">
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button type="text">
                    <DownloadOutlined/> Download <CaretDownOutlined/>
                </Button>
            </Dropdown>
            <Tooltip title="Upload student list" placement="bottomLeft">
                <Upload accept=".xlsx"
                        showUploadList={false}
                        headers={{Authorization: `Bearer ${localStorage.getItem("token")}`}}
                        action={`${process.env.REACT_APP_API_HOST}/classrooms/${classId}/students/import`}
                        onChange={handleUploadChanged}>
                    <Button type="text">
                        <UploadOutlined/> Upload
                    </Button>
                </Upload>
            </Tooltip>
            <Tooltip title="Export this grade board" placement="bottomLeft">
                <Button type="text">
                    <ExportOutlined/> Export
                </Button>
            </Tooltip>
        </div>
    );
}
