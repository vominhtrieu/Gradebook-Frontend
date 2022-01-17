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
import {getData} from "../../../handlers/api";
import {exportFullGradeBoard} from "../../../handlers/exportDataHandler";

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

    const handleExportGradeBoard = () => {
        getData(`/classrooms/${classId}/grade-structures`).then((gradeStructure: any) => {
            const gradeBoardData: object[] = [];
            students.forEach((student: any) => {
                gradeBoardData.push({
                    studentId: student.studentId,
                    studentName: student.name
                });
            })
            const headers = [["MSSV", "Họ tên"]];
            gradeStructure.reverse().forEach((gradeItem: any) => {
                headers[0].push(gradeItem.name);
                getData(`/classrooms/${classId}/grade-board?gradeStructureId=${gradeItem.id}`).then((studentGrades: any) => {
                    const grades = Array(students.length);
                    grades.fill("_");
                        students.forEach((student: any, i: number) => {
                            if (studentGrades) {
                                const grade = studentGrades.find((e: any) => e.studentId === student.studentId);
                                if (grade && grade.grade != null) {
                                    gradeBoardData[i] = {...gradeBoardData[i], [gradeItem.name]: grade.grade.toString()};
                                } else {
                                    gradeBoardData[i] = {...gradeBoardData[i], [gradeItem.name]: "___"}
                                }
                            }
                        })
                })
            })
            setTimeout(() => {
                exportFullGradeBoard(headers, gradeBoardData);
            }, 100)
        }).catch((err) => {
            return message.error("Something went wrong");
        })
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
                <Button type="text" onClick={handleExportGradeBoard}>
                    <ExportOutlined/> Export
                </Button>
            </Tooltip>
        </div>
    );
}
