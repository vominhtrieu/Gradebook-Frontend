import { TeamOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

export default function GradeBoardAverageRowHeader() {
  return (
    <div className="grade-board_student-cell">
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
    </div>
  );
}
