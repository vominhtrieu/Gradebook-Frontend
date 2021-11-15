import React from "react";
import {Tabs, Typography} from "antd";
import IntroductionSection from "./class_detail/IntroductionSection";
import TeachersSection from "./class_detail/TeachersSection";
import StudentsSection from "./class_detail/StudentsSection";
import {RouteComponentProps} from "react-router-dom";

const {Title} = Typography;

const {TabPane} = Tabs;

type Params = {
    tab: string
}

export default function ClassDetailJoined({match, history}: RouteComponentProps<Params>) {
    const TabPaneStyle = {padding: "0px 24px 16px 24px"};

    const handleTabChange = (key: string) => {
        history.push(`/class/detail/${key}`);
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
            <div style={{position: "relative", marginTop: "100px", backgroundColor: "white"}}>
                <Tabs tabPosition="left" activeKey={(match.params.tab ? match.params.tab : "introduction")} style={{height: "100%"}}
                      onChange={handleTabChange}>
                    <TabPane tab="Introduction" key="introduction" style={TabPaneStyle}>
                        <IntroductionSection/>
                    </TabPane>
                    <TabPane tab="Discussion" key="discuss" style={TabPaneStyle}>
                        <Title level={2}>Place to discuss</Title>
                    </TabPane>
                    <TabPane tab="Assignments" key="assignments" style={TabPaneStyle}>
                        <Title level={2}>Give students assignments</Title>
                    </TabPane>
                    <TabPane tab="Teachers" key="teachers" style={TabPaneStyle}>
                        <TeachersSection/>
                    </TabPane>
                    <TabPane tab="Students" key="students" style={TabPaneStyle}>
                        <StudentsSection/>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}