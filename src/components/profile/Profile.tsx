import { useContext, useEffect, useState } from "react";
import { Card, Spin, Space, message, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";
import { getData } from "../../handlers/api";
import Class from "../class/Class";
import { MainContext } from "../../contexts/main";
import ProfileAvatar from "./ProfileAvatar";
import ProfileButton from "./ProfileButton";

export default function Profile() {
  const [user, setUser]: any = useState(null);
  const mainContext = useContext(MainContext);

  const fetchData = () => {
    getData("/users/profile")
      .then((user: any) => {
        setUser(user);
        mainContext.setReloadNeeded(false);
      })
      .catch(() => message.error("Something went wrong!"));
  };

  useEffect(() => {
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
        style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        title={"Your information"}
        bodyStyle={{
          maxWidth: "840px",
          margin: "0 auto",
          padding: "24px 0 ",
        }}
      >
        <Meta
          avatar={<ProfileAvatar user={user} />}
          title={user.name}
          description={
            <p>
              <b>Email:</b> {user.email}
              <br />
              <b>Joined date:</b> {joinedDate.toLocaleDateString("vi-VN")}
              <br />
              <b>Classrooms:</b> {user.classroomCount}
            </p>
          }
          style={{
            marginBottom: "5px",
          }}
        />
        <ProfileButton title="name" href="/profile/name" block>
          Click here to change your name
        </ProfileButton>
        <ProfileButton title="password" href="/profile/password" block>
          Click here to change your password
        </ProfileButton>
      </Card>
      <Card
        style={{ width: "100%", borderRadius: "8px" }}
        title={"Your courses"}
      >
        <Row>
          {user.classrooms.length > 0 ? (
            user.classrooms.map((classroom: any, i: number) => (
              <Col
                key={i}
                lg={{ span: 6 }}
                md={{ span: 8 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
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
