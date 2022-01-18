import { Menu } from "antd";
import { exportAssignmentGrade, exportStudentList } from "../../../handlers/exportDataHandler";

interface GradeBoardDownloadMenuProps {
    students: object[]
}

export default function GradeBoardDownloadMenu({students}: GradeBoardDownloadMenuProps) {

    const onDownloadStudentList = () => {
        const data: object[] = [];
        students.forEach((student: any) => {
            data.push({
                studentId: student.studentId,
                fullName: student.name
            })
        })
        exportStudentList(data);
    }

    const onDownloadAssignmentGradeTemplate = () => {
        exportAssignmentGrade([]);
    }

    return (
        <Menu>
            <Menu.Item onClick={onDownloadStudentList}>
                Default template for student list
            </Menu.Item>
            <Menu.Item onClick={onDownloadAssignmentGradeTemplate}>
                Default template for grades for an assignment
            </Menu.Item>
        </Menu>
    );
}
