import React, {useContext, useEffect, useState} from "react";
import {message, Tabs} from "antd";
import IntroductionSection from "./class_detail/IntroductionSection";
import UserListSection from "./class_detail/UserListSection";
import {RouteComponentProps} from "react-router-dom";
import {MainContext} from "../../contexts/main";
import {getData} from "../../handlers/api";
import ClassDetailPublic from "./ClassDetailPublic";
import {API_HOST} from "../../configs/api";

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
        history.push(`/classrooms/${match.params.id}/${key}`);
    }

    let image = <div style={{
        objectFit: "fill", width: "100%", height: "50%", background: "#2F86A6", borderRadius: "2px 2px 0 0",
        border: "1px solid #F0F0F0", boxSizing: "border-box", position: "absolute", left: 0, top: "64px"
    }}/>
    if (classroom.image && classroom.image.length > 0) {
        image = <img height={"auto"}
                     style={{
                         width: "100%",
                         objectFit: "cover",
                         borderRadius: "2px 2px 0 0",
                         border: "1px solid #F0F0F0",
                         boxSizing: "border-box",
                         position: "absolute",
                         left: 0,
                         top: "64px"
                     }}
                     alt={`Cannot load cover`}
                     src={`${API_HOST}${classroom.image}`}/>
    }

    return (
        <>
            {!classroom.enrolled ? <ClassDetailPublic classroom={classroom}/> :
                <>
                    {image}
                    <div style={{
                        position: "relative",
                        marginTop: "100px",
                        backgroundColor: "white",
                        minHeight: "500px"
                    }}>
                        <Tabs tabPosition="left" activeKey={(match.params.tab ? match.params.tab : "introduction")}
                              style={{height: "100%"}}
                              onChange={handleTabChange}>
                            <TabPane tab="Introduction" key="introduction" style={TabPaneStyle}>
                                <IntroductionSection name={classroom.name} description={classroom.description}
                                                     totalStudent={classroom.students ? classroom.students.length : 0}/>
                            </TabPane>
                            <TabPane tab="Teachers" key="teachers" style={TabPaneStyle}>
                                <UserListSection users={classroom.teachers} isTeacher={classroom.isTeacher}
                                                 classroomId={classroom.id}
                                                 teacherInvitationCode={classroom.teacherInvitationCode}/>
                            </TabPane>
                            <TabPane tab="Students" key="students" style={TabPaneStyle}>
                                <UserListSection users={classroom.students} isTeacher={classroom.isTeacher}
                                                 studentInvitationCode={classroom.studentInvitationCode}/>
                            </TabPane>
                        </Tabs>
                    </div>
                </>}
        </>
    )
}