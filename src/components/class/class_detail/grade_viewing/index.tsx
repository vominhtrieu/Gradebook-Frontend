import { Space } from "antd";
import GradeViewingCard from "./GradeViewingCard";
import "./index.css";

export default function GradeViewingSection() {
  return (
    <Space direction="vertical" className="grade-viewing_section">
      <GradeViewingCard />
    </Space>
  );
}
