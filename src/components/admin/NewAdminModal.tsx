import { Form, Input, message, Modal } from "antd";
import React from "react";
import { postData } from "../../handlers/api";
import { useForm } from "antd/es/form/Form";
import userNameRules from "../../form-rules/userName";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import userEmailRules from "../../form-rules/userEmail";
import userPasswordRules from "../../form-rules/userPassword";

export default function NewAdminModal({visible, onSuccess, onCancel}: any) {
    const [form]: any = useForm();
    const submitData = () => {
        form.validateFields()
            .then(async (values: any) => {
                await postData("/admin/users/admin", values).then(() => {
                    message.success("Success");
                    onSuccess();
                })
            })
    }


    const checkRetypePassword = async (
        rule: any,
        value: any
    ): Promise<string> => {
        if (value !== "" && value !== form.getFieldValue("password")) {
            throw Error("Passwords doesn't match");
        }
        return "";
    };

    return (
        <Modal title="New Admin" visible={visible} onOk={submitData} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item name="name" rules={userNameRules}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item name="email" rules={userEmailRules}>
                    <Input
                        type="email"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item name="password" rules={userPasswordRules}>
                    <Input
                        type="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="retype-password"
                    rules={[
                        {required: true, message: "Please retype your password!"},
                        {validator: checkRetypePassword},
                    ]}
                >
                    <Input
                        type="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Retype your password"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}