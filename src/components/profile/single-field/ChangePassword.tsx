import { Form, message, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MainContext } from "../../../contexts/main";
import userPasswordRules from "../../../form-rules/userPassword";
import { getData, postData } from "../../../handlers/api";
import ProfileSingleFieldButton from "./ProfileSingleFieldButton";
import ProfileSingleFieldButtonWrapper from "./ProfileSingleFieldButtonWrapper";
import ProfileSingleFieldContainer from "./ProfileSingleFieldContainer";
import ProfileSingleFieldInput from "./ProfileSingleFieldInput";
import ProfileSingleFieldInputBox from "./ProfileSingleFieldInputBox";

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [passwordPresent, setPasswordPresent] = useState(false);
    const [form] = Form.useForm();
    const mainContext = useContext(MainContext);
    const history = useHistory();

    useEffect(() => {
        getData("/users/profile")
            .then((user: any) => {
                setPasswordPresent(user.passwordPresent);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [])
    const updatePassword = () => {
        form
            .validateFields()
            .then(values => {
                if (values["old password"] === values["new password"]) {
                    return message.error(
                        "New password must be different from old password!"
                    );
                }

                postData("/users/profile/password", {
                    oldPassword: values["old password"],
                    newPassword: values["new password"],
                })
                    .then(value => {
                        if (value === "Success") {
                            form.setFieldsValue({
                                "old password": "",
                                "new password": "",
                                "confirm new password": "",
                            });
                            mainContext.setReloadNeeded(true);
                            return message.success("Your password has changed!");
                        } else {
                            return message.error("Incorrect current password!");
                        }
                    })
                    .catch(() => message.error("Something went wrong!"));
            })
            .catch(errorInfo => {
                message.error(errorInfo.errorFields[0].errors[0]);
                setLoading(false);
            });
    };

    const checkConfirmPassword = async (
        rule: any,
        value: any
    ): Promise<string> => {
        if (value !== "" && value !== form.getFieldValue("new password")) {
            throw Error("Passwords didn't match");
        }
        return "";
    };

    return (
        <ProfileSingleFieldContainer title="change password">
            <Form layout="vertical" form={form}>
                {passwordPresent ? <ProfileSingleFieldInputBox
                    name="old password"
                    rules={userPasswordRules}
                >
                    <ProfileSingleFieldInput placeholder="Old Password" type="password" />
                </ProfileSingleFieldInputBox> : null}
                <ProfileSingleFieldInputBox
                    name="new password"
                    rules={userPasswordRules}
                >
                    <ProfileSingleFieldInput placeholder="New Password" type="password" />
                </ProfileSingleFieldInputBox>
                <ProfileSingleFieldInputBox
                    name="confirm new password"
                    rules={[
                        {required: true, message: "Please confirm your new password!"},
                        {validator: checkConfirmPassword},
                    ]}
                >
                    <ProfileSingleFieldInput
                        placeholder="Confirm New Password"
                        type="password"
                    />
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
                        onClick={updatePassword}
                        disabled={loading}
                    >
                        {loading ? <Spin style={{paddingRight: 5}} /> : null} Save
                    </ProfileSingleFieldButton>
                </ProfileSingleFieldButtonWrapper>
            </Form>
        </ProfileSingleFieldContainer>
    );
}
