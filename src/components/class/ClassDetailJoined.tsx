import React, {useContext, useEffect, useState} from "react";
import {message, Tabs} from "antd";
import IntroductionSection from "./class_detail/IntroductionSection";
import UserListSection from "./class_detail/UserListSection";
import {RouteComponentProps} from "react-router-dom";
import {MainContext} from "../../contexts/main";
import {getData} from "../../handlers/api";

const {TabPane} = Tabs;

type Params = {
    tab: string
    id: string
}

export default function ClassDetailJoined({match, history}: RouteComponentProps<Params>) {
    const [classroom, setClassroom]: any = useState({});
    const mainContext = useContext(MainContext);

    useEffect(() => {
        if (classroom === null) {
            mainContext.setReloadNeeded(true);
        }
    }, [classroom, mainContext]);

    useEffect(() => {
        getData(`/classrooms/${match.params.id}`).then((classroom) => {
            setClassroom(classroom);
            mainContext.setReloadNeeded(false);
        }).catch(() => message.error("Something went wrong!"));
    }, [mainContext, match.params.id]);

    const TabPaneStyle = {padding: "0px 24px 16px 24px"};

    const handleTabChange = (key: string) => {
        history.push(`/class/${match.params.id}/${key}`);
    }

    return (
        <>
            <div style={{
                width: "100%",
                height: "50%",
                backgroundColor: "#70cbb4",
                position: "absolute",
                left: 0,
                top: "64px",
            }}/>
            <div style={{position: "relative", marginTop: "100px", backgroundColor: "white", minHeight: "500px"}}>
                <Tabs tabPosition="left" activeKey={(match.params.tab ? match.params.tab : "introduction")}
                      style={{height: "100%"}}
                      onChange={handleTabChange}>
                    <TabPane tab="Introduction" key="introduction" style={TabPaneStyle}>
                        <IntroductionSection name={classroom.name} description={classroom.description}
                                             totalStudent={classroom.students ? classroom.students.length : 0}/>
                    </TabPane>
                    <TabPane tab="Teachers" key="teachers" style={TabPaneStyle}>
                        <UserListSection users={classroom.teachers} isTeacher={classroom.isTeacher}/>
                    </TabPane>
                    <TabPane tab="Students" key="students" style={TabPaneStyle}>
                        <UserListSection users={classroom.students} isTeacher={classroom.isTeacher}/>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}