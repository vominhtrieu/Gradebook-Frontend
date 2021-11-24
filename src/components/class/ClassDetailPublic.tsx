import React from "react";
import {Avatar, Button, Space, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

export default function ClassDetailPublic() {
    return (
        <>
            <div style={{
                width: "100%",
                height: "50%",
                backgroundColor: "#fe4515",
                position: "absolute",
                left: 0,
                top: "64px",
            }}>
            </div>
            <div style={{display: "flex", backgroundColor: "white", position: "relative", top: "100px"}}>
                <div style={{flexBasis: "70%", padding: "1em 3em"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Title level={2}>Phát triển ứng dụng Web Nâng cao</Title>
                        <Button type="primary">Enroll</Button>
                    </div>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt ullamcorper risus, nec
                        efficitur ipsum volutpat non. Phasellus ultricies turpis iaculis magna faucibus facilisis.
                        Vivamus lobortis a eros vel bibendum. Etiam feugiat imperdiet varius. Ut aliquet purus maximus
                        augue rutrum sodales non non purus. Donec ut metus ac enim pulvinar condimentum. Duis fermentum
                        massa justo, sed pulvinar ligula lobortis in. Nam facilisis orci dolor, ut ultrices nulla
                        suscipit ut. Maecenas at metus mi. Sed rutrum non urna vel tincidunt. Morbi rhoncus lobortis
                        lectus a elementum. Vestibulum pulvinar diam neque, at sodales mi consequat interdum. Praesent
                        quis vestibulum nisi, eu elementum velit. Vivamus pulvinar orci sit amet nulla egestas, non
                        ultrices elit porttitor.</Text>
                </div>
                <div style={{flexBasis: "30%", padding: "10px", borderLeft: "1px solid rgb(0, 0, 0, 0.25)"}}>
                    <Space direction="vertical">
                        <Title level={3}>Teachers</Title>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Avatar size={50} icon={<UserOutlined/>}/>
                            <Text strong={true} style={{paddingLeft: "10px"}}>Teacher's Name</Text>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Avatar size={50} icon={<UserOutlined/>}/>
                            <Text strong={true} style={{paddingLeft: "10px"}}>Teacher's Name</Text>
                        </div>
                    </Space>
                </div>
            </div>
        </>
    );
}