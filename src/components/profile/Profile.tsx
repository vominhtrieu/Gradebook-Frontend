import { useContext, useEffect, useState } from "react";
import { Card, Spin, Space, message, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";
import { getData } from "../../handlers/api";
import Class from "../class/Class";
import { MainContext } from "../../contexts/main";
import ProfileAvatar from "./ProfileAvatar";
import ProfileButton from "./ProfileButton";
import "./Profile.css";

export default function Profile({id}: any) {
    const [user, setUser]: any = useState(null);
    const [classrooms, setClassrooms]: any = useState(null);
    const mainContext = useContext(MainContext);

    useEffect(() => {
        const fetchData = () => {
            let url = "/users/profile";
            if (id > 0) {
                url = "/users/profile?id=" + id;
            }
            getData(url)
                .then((user: any) => {
                    setUser(user);
                    getData("/classrooms/role/teacher")
                        .then((classrooms: any) => {
                            setClassrooms(classrooms);
                            mainContext.setReloadNeeded(false);
                        })
                        .catch(() => message.error("Something went wrong!"));
                })
                .catch(() => message.error("Something went wrong!"));
        };

        if (!mainContext.reloadNeeded) {
            return;
        }

        fetchData();
    }, [mainContext]);

    useEffect(() => {
        if (!user) {
            mainContext.setReloadNeeded(true);
        }
    }, [user, mainContext]);

    const joinedDate = new Date(user?.joinedDate);
    return user ? (
        <>
            <Card
                style={{width: "100%", borderRadius: "8px", marginBottom: "20px"}}
                title={"Your information"}
                bodyStyle={{
                    maxWidth: "840px",
                    margin: "0 auto",
                    padding: "24px 0 ",
                }}
            >
                <Meta
                    avatar={<ProfileAvatar user={user} size={120} editable />}
                    className="profile-card-meta"
                    description={
                        <p>
                            <ProfileButton
                                title="Name"
                                href={id > 0 ? "" : "/profile/name"}
                                value={user.name}
                            />
                            <ProfileButton title="Email" href="" value={user.email} />
                            <ProfileButton
                                title="Student ID"
                                href={id > 0 ? "" : "/profile/studentId"}
                                value={
                                    user.studentId
                                        ? user.studentId
                                        : "Set your Student ID to view your grade"
                                }
                            />
                            {
                                id > 0 ? null :
                                    <ProfileButton
                                        title="Password"
                                        href="/profile/password"
                                        value={"********"}
                                    />
                            }
                            <ProfileButton
                                title="Joined date"
                                href=""
                                value={joinedDate.toLocaleDateString("vi-VN")}
                            />
                            <ProfileButton
                                title="Classroom"
                                href=""
                                value={classrooms?.length ? classrooms.length : 0}
                            />
                        </p>
                    }
                />
            </Card>
            <Card
                style={{width: "100%", borderRadius: "8px"}}
                title={"Courses"}
            >
                <Row>
                    {classrooms && classrooms.map && classrooms.length > 0 ? (
                        classrooms.map((classroom: any, i: number) => (
                            <Col
                                key={i}
                                lg={{span: 6}}
                                md={{span: 8}}
                                sm={{span: 12}}
                                xs={{span: 24}}
                            >
                                <Class
                                    classID={classroom.id}
                                    name={classroom.name}
                                    teacher={user}
                                    cover={classroom.image}
                                />
                            </Col>
                        ))
                    ) : (
                        <p>You haven't created any courses</p>
                    )}
                </Row>
            </Card>
        </>
    ) : (
        <Space
            style={{
                width: "100%",
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Spin />
        </Space>
    );
}
