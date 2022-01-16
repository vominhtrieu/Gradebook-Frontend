import { List, Avatar } from 'antd';
import Container from "@ant-design/pro-table/es/container";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

export default function Notification() {
    return (
        <List
            itemLayout="horizontal"
            bordered
            style={{marginTop: 10, background: "white"}}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />)
}