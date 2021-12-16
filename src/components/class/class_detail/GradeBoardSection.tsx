import { Space } from "antd";
import GradeBoard from "../grade_board";

export default function GradeBoardSection() {
  return (
    <Space
      style={{
        width: "100%",
        display: "inline-block",
        overflowX: "scroll",
      }}
    >
      <GradeBoard />
    </Space>
  );
}
