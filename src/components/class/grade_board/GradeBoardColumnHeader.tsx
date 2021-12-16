import { SolutionOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

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
          <Button shape="circle" icon={<SolutionOutlined />} />
        </div>
        <div className="divider"></div>
        <div className="finalization-wrapper">
          <p>out of 100</p>
          <Checkbox />
        </div>
      </div>
    </th>
  );
}
