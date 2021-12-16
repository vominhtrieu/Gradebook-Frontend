import { Menu, Upload } from "antd";

export default function GradeBoardMoreMenu() {
  return (
    <Menu
      style={{
        width: "100px",
        textAlign: "center",
      }}
    >
      <Menu.Item>
        <Upload accept=".csv">Upload</Upload>
      </Menu.Item>
    </Menu>
  );
}
