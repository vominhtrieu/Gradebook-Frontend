import { Form, Input, Button, Card, message, Spin } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { postData } from "../../handlers/api";
import { useState } from "react";

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory();

    const callSignUp = async () => {
        try {
            setLoading(true);
            const data = await postData("/signup", form.getFieldsValue());
            if (data.id > 0) {
                message.success(`Your account has been created, time to sign in!`);
                history.push("/signin");
            } else {
                message.error(data)
            }
        } catch (e) {
            message.error("Some thing went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const checkRetypePassword = async (rule: any, value: any): Promise<string> => {
        if (value !== "" && value !== form.getFieldValue("password")) {
            throw Error("Passwords doesn't match");
        }
        return "";
    };

    return (
        <Card title="Sign Up" className="auth-form">
            <Form form={form} layout="vertical">
                <Form.Item name="name" rules={[{required: true, message: "Please input your name!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>
                <Form.Item name="email" rules={[{required: true, message: "Please input your email!"}]}>
                    <Input type="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[
                    {required: true, message: "Please input your password!"},
                    {min: 8, message: "Password must be at least 8 characters length"}
                ]}>
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
                <Form.Item>
                    <Button onClick={callSignUp} disabled={loading} type="primary">
                        {loading ? <Spin style={{paddingRight: 5}} /> : null}Sign Up
                    </Button>
                    <span style={{padding: "0 5px"}}>or</span>
                    <Link to="/signin">Use your existing account</Link>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default SignUp;
