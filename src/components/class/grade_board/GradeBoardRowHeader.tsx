import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { ReactNode } from "react";

type StudentInformationType = {
  avatarSrc?: ReactNode;
  name: string;
  studentId: string;
};

interface GradeBoardRowHeaderProps {
  studentInformation?: StudentInformationType;
}

export default function GradeBoardRowHeader({
  studentInformation,
}: GradeBoardRowHeaderProps) {
  return (
    <th className="grade-board_row-header">
      <div className="row-header-wrapper">
        {studentInformation ? (
          <>
            <Avatar className="avatar" size={32} icon={<UserOutlined />} />
            <a className="name">TranabcdefghBac HoabcdngDabcdt</a>
            {/* <a className="name">{studentInformation.name}</a> */}
          </>
        ) : (
          <>
            <Avatar
              className="avatar"
              size={32}
              icon={<TeamOutlined />}
              style={{
                color: "#007b83",
                backgroundColor: "transparent",
              }}
            />
            <p className="name">Class average</p>
          </>
        )}
      </div>
    </th>
  );
}
