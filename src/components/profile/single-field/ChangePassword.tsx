import { Button, Form, Input, message, Spin } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { MainContext } from "../../../contexts/main";
import userPasswordRules from "../../../form-rules/userPassword";
import { getData, postData } from "../../../handlers/api";
import ProfileSingleFieldButtonWrapper from "./ProfileSingleFieldButtonWrapper";
import ProfileSingleFieldContainer from "./ProfileSingleFieldContainer";

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
                {passwordPresent ?
                    <FormItem
                        name="old password"
                        rules={userPasswordRules}
                    >
                        <Input.Password placeholder="Old Password" />
                    </FormItem> : null}
                <FormItem
                    name="new password"
                    rules={userPasswordRules}
                >
                    <Input.Password placeholder="New Password" type="password" />
                </FormItem>
                <FormItem
                    name="confirm new password"
                    rules={[
                        {required: true, message: "Please confirm your new password!"},
                        {validator: checkConfirmPassword},
                    ]}
                >
                    <Input.Password
                        placeholder="Confirm New Password"
                    />
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
                        onClick={updatePassword}
                        disabled={loading}
                    >
                        {loading ? <Spin style={{paddingRight: 5}} /> : null} Save
                    </Button>
                </ProfileSingleFieldButtonWrapper>
            </Form>
        </ProfileSingleFieldContainer>
    );
}
