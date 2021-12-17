import { MoreOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Tooltip } from "antd";
import GradeNotificationModal from "./grade-notification-modal";
import GradeBoardMoreMenu from "./GradeBoardMoreMenu";

interface GradeColumnHeaderProps {
  title: string;
  detail: string;
}

export default function GradeBoardGradeColumnHeader({
  title,
  detail,
}: GradeColumnHeaderProps) {
  const maximumGrade = 100;

  return (
    <div className="grade-board_grade-column-header">
      <div className="grade-structure">
        <Tooltip title={title}>
          <p className="title">{title}</p>
        </Tooltip>
        <p className="detail">out of {detail}</p>
        <Dropdown
          overlay={GradeBoardMoreMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button shape="circle">
            <MoreOutlined />
          </Button>
        </Dropdown>
      </div>
      <Divider
        style={{
          margin: "0",
          marginBottom: "0",
        }}
      />
      <div className="finalization-wrapper">
        <p>out of {maximumGrade}</p>
        <GradeNotificationModal />
      </div>
    </div>
  );
}
