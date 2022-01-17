import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Homepage from "./class/Homepage";
import Profile from "./profile/Profile";
import { MainContext } from "../contexts/main";
import ChangeStudentId from "./profile/single-field/ChangeStudentId";
import ChangeName from "./profile/single-field/ChangeName";
import ChangePassword from "./profile/single-field/ChangePassword";
import ClassDetailJoined from "./class/ClassDetailJoined";
import { RoutingContext } from "../contexts/routing";
import { getData } from "../handlers/api";
import io, { Socket } from "socket.io-client";
import Notification from "./notifications/Notification";
import NavigationBar from "./common/NavigationBar";
import GradeReviewConversation from "./class/class_detail/grade/grade_review_conversation";

export default function Main() {
  const location = useLocation();
  const [reloadNeeded, setReloadNeeded] = useState(true);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    studentId: "",
    role: 1,
  });
  const [socket, setSocket] = useState<Socket>(
    io(process.env.REACT_APP_API_HOST + "", {
      auth: {
        token: localStorage.getItem("token"),
      },
    })
  );

  const routingContext = useContext(RoutingContext);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null || token.length === 0) {
      routingContext.setRequestedURL(location.pathname + location.search);
    }
    getData("/users/profile").then((user: any) => {
      setUser(user);
    });
  }, [location.pathname, location.search, routingContext, token]);

  return (
    <MainContext.Provider
      value={{
        user: user,
        setUser: setUser,
        reloadNeeded: reloadNeeded,
        setReloadNeeded: setReloadNeeded,
        socket: socket,
        setSocket: setSocket,
      }}
    >
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
              {user.role === 2 ? <Redirect to={"/admin"} /> : <Homepage />}
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/notifications">
              <Notification />
            </Route>
            <Route path="/classrooms/:id/:tab?" component={ClassDetailJoined} />
            <Route
              exact
              path="/classrooms/:id/grade_review/conversation/:gradeDetailId"
            >
              <GradeReviewConversation />
            </Route>
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
              <p>404 Page Not Found</p>
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Gradebook ©2021. Image from Freepik.
        </Footer>
      </Layout>
    </MainContext.Provider>
  );
}
