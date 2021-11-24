import { Card, Col, message, Row, Space, Spin } from "antd";
import Class from "./Class";
import React, { useContext, useEffect, useState } from "react";
import { getData } from "../../handlers/api";
import { MainContext } from "../../contexts/main";

export default function Homepage() {
    const [createdClassrooms, setCreatedClassrooms]: any = useState(null);
    const [joinedClassrooms, setJoinedClassrooms]: any = useState(null);
    const mainContext = useContext(MainContext);

    useEffect(() => {
        if (createdClassrooms === null) {
            mainContext.setReloadNeeded(true);
        }
    }, [createdClassrooms, mainContext]);

    useEffect(() => {
        if (!mainContext.reloadNeeded) {
            return;
        }
        getData("/classrooms/role/teacher")
            .then(classrooms => {
                setCreatedClassrooms(classrooms);
                getData("/classrooms/role/student")
                    .then(classrooms => {
                        setJoinedClassrooms(classrooms);
                        mainContext.setReloadNeeded(false);
                    })
                    .catch(() =>
                        message.error(
                            "Something went wrong! Maybe, you should login first!"
                        )
                    );
            })
            .catch(() =>
                message.error("Something went wrong! Maybe, you should login first!")
            );
    }, [mainContext]);

    if (createdClassrooms === null) {
        return (
            <Space
                style={{display: "flex", justifyContent: "center", marginTop: 20}}
            >
                <Spin />
            </Space>
        );
    }
    return (
        <>
            {createdClassrooms && createdClassrooms.length > 0
                ? (
                    <>
                        <h3 style={{marginTop: 20, textAlign: "center"}}>Your courses</h3>
                        <Row>
                            {
                                createdClassrooms.map((classroom: any, i: number) => (
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
                                            teacher={classroom.teachers[0]}
                                            cover={classroom.image}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>)
                : null}

            {joinedClassrooms && joinedClassrooms.length > 0
                ?
                <>
                    <h3 style={{marginTop: 20, textAlign: "center"}}>
                        Your joined courses
                    </h3>
                    <Row>
                        {
                            joinedClassrooms.map((classroom: any, i: number) => (
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
                                        teacher={classroom.teachers[0]}
                                        cover={classroom.image}
                                    />
                                </Col>
                            ))}
                    </Row>
                </>
                : null
            }
            {(!createdClassrooms || createdClassrooms.length === 0) && (!joinedClassrooms || joinedClassrooms.length === 0) ?
                <Card title="You don't have any courses">
                    You haven't created or joined any courses. Click <b>CREATE</b> button in navigation bar to create
                    one.<br />
                    After creating or joining a new course, it will appear
                    here.
                </Card> : null}
        </>
    );
}
