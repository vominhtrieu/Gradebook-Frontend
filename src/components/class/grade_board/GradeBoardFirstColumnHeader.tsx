import { Button, Dropdown, Tooltip, Upload } from "antd";
import {
  RollbackOutlined,
  DownloadOutlined,
  UploadOutlined,
  CaretDownOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import GradeBoardDownloadMenu from "./GradeBoardDownloadMenu";

export default function GradeBoardFirstColumnHeader() {
  return (
    <th className="grade-board_column-header">
      <div>
        <Tooltip title="Export this grade board" placement="bottomLeft">
          <Button shape="circle" icon={<ExportOutlined />} />
        </Tooltip>
        <Tooltip title="Upload student list" placement="bottomLeft">
          <Upload accept=".csv">
            <Button shape="circle" icon={<UploadOutlined />} />
          </Upload>
        </Tooltip>
      </div>
      <div className="button_container">
        <Dropdown overlay={GradeBoardDownloadMenu} trigger={["click"]}>
          <Button type="text">
            <DownloadOutlined /> Download <CaretDownOutlined />
          </Button>
        </Dropdown>
      </div>
    </th>
  );
}
