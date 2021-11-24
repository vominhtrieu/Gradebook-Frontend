import {Button, Form, Input, message, Spin} from "antd";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MainContext } from "../../../contexts/main";
import userStudentIdRules from "../../../form-rules/userStudentId";
import FormItem from "antd/lib/form/FormItem";
import { getData, postData } from "../../../handlers/api";
import ProfileSingleFieldButtonWrapper from "./ProfileSingleFieldButtonWrapper";
import ProfileSingleFieldContainer from "./ProfileSingleFieldContainer";

export default function ChangeStudentId() {
  const [user, setUser]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const mainContext = useContext(MainContext);
  const history = useHistory();

  const updateStudentId = () => {
    form
      .validateFields()
      .then(values => {
        if (user.studentId === values["new student id"].trim()) {
          return message.error("This is your current student id!");
        }

        postData("/users/profile/studentId", {
          studentId: values["new student id"].trim(),
        })
          .then((user: any) => {
            form.setFieldsValue({ "new student id": "" });
            setUser(user);
            mainContext.setReloadNeeded(true);
            return message.success("Your student id has changed!");
          })
          .catch(() => message.error("Something went wrong!"));
      })
      .catch(errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = () => {
      getData("/users/profile/studentId")
        .then((user: any) => {
          setUser(user);
          mainContext.setReloadNeeded(false);
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

  return (
    <ProfileSingleFieldContainer title="change student id">
      <Form layout="vertical" form={form}>
        <FormItem name="current student id">
          <Input
            placeholder={
              user?.studentId
                ? user?.studentId
                : "Set your student id to view your grade"
            }
            disabled
          />
        </FormItem>
        <FormItem
          name="new student id"
          rules={userStudentIdRules}
        >
          <Input placeholder="New Student Id" />
        </FormItem>
        <ProfileSingleFieldButtonWrapper>
          <Button
            size="large"
            onClick={() => history.push("/profile")}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={updateStudentId}
            disabled={loading}
          >
            {loading ? <Spin style={{ paddingRight: 5 }} /> : null} Save
          </Button>
        </ProfileSingleFieldButtonWrapper>
      </Form>
    </ProfileSingleFieldContainer>
  );
}
