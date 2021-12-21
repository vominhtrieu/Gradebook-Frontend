import {Menu, Upload} from "antd";

export default function GradeBoardMoreMenu() {

    const onChange = (info: any) => {
        if (info.file.status === 'done') {
            console.log(info.fileList);
        }
        if (info.file.status === 'error') {
            console.log(info.file.name);
        }
    }

    return (
        <Menu
            style={{
                width: "100px",
                textAlign: "center",
            }}
        >
            <Menu.Item>
                <Upload accept=".csv,.xlsx" showUploadList={false}
                        headers={{Authorization: `Bearer ${localStorage.getItem("token")}`}}
                        action={window.location.origin}
                        onChange={onChange}>Upload</Upload>
            </Menu.Item>
        </Menu>
    );
}
