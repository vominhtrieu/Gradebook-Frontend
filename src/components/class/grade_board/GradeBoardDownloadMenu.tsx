import {Menu} from "antd";
import { exportStudentList} from "../../../handlers/exportDataHandler";

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
    return (
        <Menu>
            <Menu.Item onClick={onDownloadStudentList}>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href=""
                >
                    Default template for student list
                </a>
            </Menu.Item>
            <Menu.Item>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href=""
                >
                    Default template for grades for an assignment
                </a>
            </Menu.Item>
        </Menu>
    );
}
