import { SolutionOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import "./index.css";

export default function GradeViewingCard() {
  return (
    <Card className="grade-viewing_card">
      <Meta
        avatar={
          <Avatar
            style={{ backgroundColor: "#1890ff" }}
            size={32}
            icon={<SolutionOutlined />}
          />
        }
        title="Assignment: "
        description={<p>Grade: Grade value • Updated date</p>}
      />
    </Card>
  );
}
