import { Col, message, Row, Space, Spin } from "antd";
import Class from "./Class";
import React, { useContext, useEffect, useState } from "react";
import { getData } from "../../handlers/api";
import { MainContext } from "../../contexts/main";

export default function Homepage() {
    const [classrooms, setClassrooms]: any = useState(null);
    const mainContext = useContext(MainContext);

    useEffect(() => {
        if (classrooms === null) {
            mainContext.setReloadNeeded(true);
        }
    }, [classrooms, mainContext]);

    useEffect(() => {
        if (!mainContext.reloadNeeded) {
            return;
        }
        getData("/classrooms").then((classrooms) => {
            setClassrooms(classrooms);
            mainContext.setReloadNeeded(false);
        }).catch(() => message.error("Something went wrong! Maybe, you should login first!"));
    }, [mainContext]);

    if (classrooms === null) {
        return <Space style={{display: "flex", justifyContent: "center", marginTop: 20}}><Spin /></Space>
    }
    return (<>
        <h3 style={{marginLeft: 10, textAlign: "center"}}>ALL COURSES </h3>
        <Row>
            {classrooms.map ? classrooms.map((classroom: any, i: number) => (
                <Col key={i} lg={{span: 6}} md={{span: 8}} sm={{span: 12}} xs={{span: 24}}>
                    <Class classID={classroom.id} name={classroom.name} teacher={classroom.teachers[0]}
                           cover={classroom.image} />
                </Col>
            )) : null}
        </Row>
    </>);
}