import {Menu} from "antd";
import {exportAssignmentGrade, exportStudentList} from "../../../handlers/exportDataHandler";

interface GradeBoardDownloadMenuProps {
    students: object[]
}

export default function GradeBoardDownloadMenu({ students }: GradeBoardDownloadMenuProps) {

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
                <a
                    rel="noopener noreferrer"
                    href=""
                    onClick={(e) => e.preventDefault()}
                >
                    Default template for student list
                </a>
            </Menu.Item>
            <Menu.Item onClick={onDownloadAssignmentGradeTemplate}>
                <a
                    rel="noopener noreferrer"
                    href=""
                    onClick={(e) => e.preventDefault()}
                >
                    Default template for grades for an assignment
                </a>
            </Menu.Item>
        </Menu>
    );
}
