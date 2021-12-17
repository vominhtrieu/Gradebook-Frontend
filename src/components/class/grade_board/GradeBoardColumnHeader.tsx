import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tooltip } from "antd";
import GradeNotificationModal from "./grade-notification-modal";
import GradeBoardMoreMenu from "./GradeBoardMoreMenu";

type GradeStructureType = {
  title: string;
  detail: string;
};

interface GradeBoardColumnHeaderProps {
  gradeStructure: GradeStructureType;
}

export default function GradeBoardColumnHeader({
  gradeStructure,
}: GradeBoardColumnHeaderProps) {
  return (
    <th className="grade-board_column-header">
      <div className="column-header-wrapper">
        <div className="grade-structure">
          <Tooltip title={gradeStructure.title}>
            <p className="title">{gradeStructure.title}</p>
          </Tooltip>
          <p className="detail">out of {gradeStructure.detail}</p>
          <Dropdown
            className="hidden-element"
            overlay={GradeBoardMoreMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button shape="circle">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="divider"></div>
        <div className="finalization-wrapper">
          <p>out of 100</p>
          <GradeNotificationModal />
        </div>
      </div>
    </th>
  );
}
