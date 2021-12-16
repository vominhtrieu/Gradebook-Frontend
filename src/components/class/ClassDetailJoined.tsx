import React, { useContext, useEffect, useState } from "react";
import { Card, message, Tabs } from "antd";
import IntroductionSection from "./class_detail/IntroductionSection";
import UserListSection from "./class_detail/UserListSection";
import { RouteComponentProps } from "react-router-dom";
import { MainContext } from "../../contexts/main";
import { getData } from "../../handlers/api";
import ClassDetailPublic from "./ClassDetailPublic";
import GradeStructureSection from "./class_detail/GradeStructureSection";
import GradeBoard from "./grade_board";

const { TabPane } = Tabs;

type Params = {
  tab: string;
  id: string;
};

export default function ClassDetailJoined({
  match,
  history,
}: RouteComponentProps<Params>) {
  const [classroom, setClassroom]: any = useState({});
  const mainContext = useContext(MainContext);

  useEffect(() => {
    if (classroom === null) {
      mainContext.setReloadNeeded(true);
    }
  }, [classroom, mainContext]);

  useEffect(() => {
    getData(`/classrooms/${match.params.id}`)
      .then(classroom => {
        setClassroom(classroom);
        mainContext.setReloadNeeded(false);
      })
      .catch(() => message.error("Something went wrong!"));
  }, [mainContext, match.params.id]);

  const TabPaneStyle = { padding: "0px 24px 16px 24px" };

  const handleTabChange = (key: string) => {
    history.push(`/classrooms/${match.params.id}/${key}`);
  };

  return (
    <>
      {!classroom.enrolled ? (
        <ClassDetailPublic classroom={classroom} />
      ) : (
        <Card
          cover={
            classroom.image ? (
              <img
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                alt="Background"
                src={process.env.REACT_APP_API_HOST + classroom.image}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  background: "#2F86A6",
                }}
              />
            )
          }
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              minHeight: "200px",
            }}
          >
            <Tabs
              tabPosition="left"
              activeKey={match.params.tab ? match.params.tab : "introduction"}
              style={{ height: "100%" }}
              onChange={handleTabChange}
            >
              <TabPane
                tab="Introduction"
                key="introduction"
                style={TabPaneStyle}
              >
                <IntroductionSection
                  name={classroom.name}
                  description={classroom.description}
                  totalStudent={
                    classroom.students ? classroom.students.length : 0
                  }
                />
              </TabPane>
              <TabPane tab="Teachers" key="teachers" style={TabPaneStyle}>
                <UserListSection
                  users={classroom.teachers}
                  isTeacher={classroom.isTeacher}
                  classroomId={classroom.id}
                  teacherInvitationCode={classroom.teacherInvitationCode}
                />
              </TabPane>
              <TabPane tab="Students" key="students" style={TabPaneStyle}>
                <UserListSection
                  users={classroom.students}
                  isTeacher={classroom.isTeacher}
                  classroomId={classroom.id}
                  studentInvitationCode={classroom.studentInvitationCode}
                />
              </TabPane>
              {classroom.isTeacher && (
                <>
                  <TabPane
                    tab="Grade Structure"
                    key="grade_structures"
                    style={TabPaneStyle}
                  >
                    <GradeStructureSection />
                  </TabPane>
                  <TabPane tab="Grades" key="grades" style={TabPaneStyle}>
                    <GradeBoard />
                  </TabPane>
                </>
              )}
            </Tabs>
          </div>
        </Card>
      )}
    </>
  );
}
