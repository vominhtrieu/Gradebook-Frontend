import { useContext, useEffect } from "react";
import { Layout } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Homepage from "./class/Homepage";
import Profile from "./profile/Profile";
import ChangeStudentId from "./profile/single-field/ChangeStudentId";
import ChangeName from "./profile/single-field/ChangeName";
import ChangePassword from "./profile/single-field/ChangePassword";
import ClassDetailJoined from "./class/ClassDetailJoined";
import { RoutingContext } from "../contexts/routing";
import { getData } from "../handlers/api";
import Notification from "./notifications/Notification";
import NavigationBar from "./common/NavigationBar";
import GradeReviewConversation from "./class/class_detail/grade/grade_review_conversation";
import { MainContext } from "../contexts/main";

export default function Main() {
  const location = useLocation();
  const routingContext = useContext(RoutingContext);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null || token.length === 0) {
      routingContext.setRequestedURL(location.pathname + location.search);
    }
  }, [location.pathname, location.search, routingContext, token]);

  return (
    <>
      {token === null || token.length === 0 ? <Redirect to="/signin" /> : null}
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 100,
            width: "100%",
            background: "white",
          }}
        >
          <NavigationBar />
        </Header>
        <Content
          style={{
            paddingTop: 70,
            maxWidth: 1200,
            width: "100%",
            margin: "auto",
          }}
        >
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/notifications">
              <Notification />
            </Route>
            <Route
              exact
              path="/classrooms/:id/review/conversation/:gradeDetailId"
            >
              <GradeReviewConversation />
            </Route>
            <Route path="/classrooms/:id/:tab?" component={ClassDetailJoined} />
            <Route exact path="/profile/studentId">
              <ChangeStudentId />
            </Route>
            <Route exact path="/profile/name">
              <ChangeName />
            </Route>
            <Route exact path="/profile/password">
              <ChangePassword />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Gradebook ©2021. Image from Freepik.
        </Footer>
      </Layout>
    </>
  );
}
