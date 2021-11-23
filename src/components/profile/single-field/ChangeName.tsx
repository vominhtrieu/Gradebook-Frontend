import { Form, message, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MainContext } from "../../../contexts/main";
import userNameRules from "../../../form-rules/userName";
import { getData, postData } from "../../../handlers/api";
import ProfileSingleFieldButton from "./ProfileSingleFieldButton";
import ProfileSingleFieldButtonWrapper from "./ProfileSingleFieldButtonWrapper";
import ProfileSingleFieldContainer from "./ProfileSingleFieldContainer";
import ProfileSingleFieldInput from "./ProfileSingleFieldInput";
import ProfileSingleFieldInputBox from "./ProfileSingleFieldInputBox";

export default function ChangeName() {
  const [user, setUser]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const mainContext = useContext(MainContext);
  const history = useHistory();

  const updateName = () => {
    form
      .validateFields()
      .then(values => {
        if (user.name === values["new name"].trim()) {
          return message.error("This is your current name!");
        }

        postData("/users/profile/name", {
          name: values["new name"].trim(),
        })
          .then((user: any) => {
            form.setFieldsValue({ "new name": "" });
            setUser(user);
            mainContext.setReloadNeeded(true);
            return message.success("Your name has changed!");
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
      getData("/users/profile/name")
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
    <ProfileSingleFieldContainer title="change name">
      <Form layout="vertical" form={form}>
        <ProfileSingleFieldInputBox name="current name">
          <ProfileSingleFieldInput placeholder={user?.name} disabled />
        </ProfileSingleFieldInputBox>
        <ProfileSingleFieldInputBox name="new name" rules={userNameRules}>
          <ProfileSingleFieldInput placeholder="New Name" />
        </ProfileSingleFieldInputBox>
        <ProfileSingleFieldButtonWrapper>
          <ProfileSingleFieldButton
            size="large"
            onClick={() => history.push("/profile")}
          >
            Cancel
          </ProfileSingleFieldButton>
          <ProfileSingleFieldButton
            size="large"
            type="primary"
            onClick={updateName}
            disabled={loading}
          >
            {loading ? <Spin style={{ paddingRight: 5 }} /> : null} Save
          </ProfileSingleFieldButton>
        </ProfileSingleFieldButtonWrapper>
      </Form>
    </ProfileSingleFieldContainer>
  );
}
