import { UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { ReactNode } from "react";

interface GradeBoardRowHeaderProps {
    avatarSrc?: ReactNode;
    studentName: string;
    studentId: string;
}

export default function GradeBoardStudentCell({
                                                  avatarSrc,
                                                  studentName,
                                                  studentId,
                                              }: GradeBoardRowHeaderProps) {
    return (
        <div className="grade-board_student-cell">
            <Avatar className="avatar" size={32} icon={<UserOutlined />} />
            <span className="name">{studentName} ({studentId})</span>
        </div>
    );
}
