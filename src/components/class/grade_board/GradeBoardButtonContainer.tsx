import { Button, Dropdown, Tooltip, Upload } from "antd";
import {
  RollbackOutlined,
  DownloadOutlined,
  UploadOutlined,
  CaretDownOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import GradeBoardDownloadMenu from "./GradeBoardDownloadMenu";

interface GradeBoardButtonContainerProps {
    students: object[]
}

export default function GradeBoardButtonContainer({students} :GradeBoardButtonContainerProps) {
    const menu = (
        <GradeBoardDownloadMenu students={students} />
    )
  return (
    <div className="grade-board_button-container">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="text">
          <DownloadOutlined /> Download <CaretDownOutlined />
        </Button>
      </Dropdown>
      <Tooltip title="Upload student list" placement="bottomLeft">
        <Upload accept=".csv">
          <Button type="text">
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </Tooltip>
      <Tooltip title="Export this grade board" placement="bottomLeft">
        <Button type="text">
          <ExportOutlined /> Export
        </Button>
      </Tooltip>
    </div>
  );
}
