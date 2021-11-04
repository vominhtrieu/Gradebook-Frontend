import React, { useContext, useEffect, useState } from "react";
import { Avatar, Card, Spin, Space, message, Row, Col, Button, Upload } from "antd";
import Meta from "antd/es/card/Meta";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { getData } from "../../handlers/api";
import Class from "../class/Class";
import { API_HOST } from "../../configs/api";
import { MainContext } from "../../contexts/main";

export default function Profile() {
    const [user, setUser]: any = useState(null);
    const [uploadingAvatar, setUploadingAvatar] = React.useState(false);
    const mainContext = useContext(MainContext);

    const fetchData = () => {
        getData("/users/profile").then((user: any) => {
            setUser(user);
        }).catch(() => message.error("Something went wrong!"));
    }
    useEffect(() => {
        if (!mainContext.reloadNeeded) {
            return;
        }
        fetchData();
    }, [mainContext])

    useEffect(() => {
        if (user === null) {
            mainContext.setReloadNeeded(true);
        }
    }, [user, mainContext])

    if (user === null) {
        return <Space style={{width: "100%", marginTop: 20, display: "flex", justifyContent: "center"}}><Spin /></Space>
    }

    const handleAvatarChange = (info: any) => {
        if (info.file.status === "uploading") {
            setUploadingAvatar(true);
            return;
        }
        if (info.file.status === "done") {
            setUploadingAvatar(false);
            fetchData();
            return message.success("Your avatar has been changed!");
        }
        if (info.file.status === "error") {
            setUploadingAvatar(false);
            return message.error("Cannot change avatar, please try again!");
        }
    };

    const joinedDate = new Date(user.joinedDate);

    const avatar =
        <Space style={{position: "relative"}}>
            {user && user.avatar ? <Avatar size={80} src={`${API_HOST}${user.avatar}`} /> :
                <Avatar size={80} icon={<UserOutlined />} />}
            <ImgCrop shape="round" zoom modalTitle="Edit your avatar" quality={0.4}>
                <Upload
                    name="avatar"
                    listType="picture"
                    showUploadList={false}
                    action={`${API_HOST}/users/avatar`}
                    onChange={handleAvatarChange}
                    headers={{"Authorization": `Bearer ${localStorage.getItem("token")}`}}
                    accept=".png,.jpg,.jpeg"
                >
                    <Button
                        style={{position: "absolute", right: 2, bottom: 2}}
                        disabled={uploadingAvatar}
                        size="large"
                        type="primary"
                        shape="circle"
                        title="Change your avatar"
                    >
                        {uploadingAvatar ? <Spin /> : <CameraOutlined />}
                    </Button>
                </Upload>
            </ImgCrop>
        </Space>

    return (<Card style={{width: "100%"}} title={"Your information"}>
        <Meta
            avatar={avatar}
            title={user.name}
            description={
                <p>
                    <b>Email:</b> {user.email}<br />
                    <b>Joined date:</b> {joinedDate.toLocaleDateString("vi-VN")}<br />
                    <b>Classrooms:</b> {user.classroomCount}
                </p>
            }
        />
        <h3>Your courses:</h3>
        <Row>
            {
                user.classrooms.length > 0 ? user.classrooms.map((classroom: any, i: number) => (
                    <Col key={i} lg={{span: 6}} md={{span: 8}} sm={{span: 12}} xs={{span: 24}}>
                        <Class classID={classroom.id} name={classroom.name} teacher={user}
                               cover={classroom.image} />
                    </Col>
                )) : <p>You haven't created any courses</p>
            }
        </Row>
    </Card>);
}