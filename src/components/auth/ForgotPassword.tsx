import {Button, Card, Form, Input, message, Spin} from "antd";
import userEmailRules from "../../form-rules/userEmail";
import {MailOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {postData} from "../../handlers/api";
import {Link} from "react-router-dom";

const baseCounter: number = 60;

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(baseCounter);
    const [intervalId, setIntervalId] = useState(0);
    const [form] = Form.useForm();

    const timer = () => {
            setCounter(prevCounter => {
                if (prevCounter <= 0) setLoading(false);
                return prevCounter - 1
            });
    }

    useEffect(() => {
        if (loading) {
            const myIntervalId = window.setInterval(timer, 1000);
            setIntervalId(myIntervalId);
        }
        if (counter < 0) {
            clearInterval(intervalId);
        }
    }, [loading]);

    const onSendPassword = () => {
        setLoading(true);
        setCounter(baseCounter);
        postData("/reset-password", {
            email: form.getFieldsValue().email
        }).then((msg) => {
            message.success("New password has been sent to your email")
        }).catch((e) => {
            setLoading(false);
            clearInterval(intervalId);
            message.error("Something went wrong. Please try again");
        })
    }

    return (
        <Card title="Reset password" className="auth-form">
            <Form form={form} layout="vertical">
                <Form.Item name="email" rules={userEmailRules}>
                    <Input
                        type="email"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                        name="email"
                    />
                </Form.Item>
                <p style={{display: loading ? "block" : "none"}}>If you don't receive any email, resend after: {counter}s</p>
                <Form.Item>
                    <Button onClick={onSendPassword} disabled={loading} type="primary" block>
                        {loading ? <Spin style={{ paddingRight: 5 }} /> : null}Send new password
                    </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
                    <p>Remember to your password after sign in</p>
                </Form.Item>
                <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
                    <Link to="/signin">Go sign in</Link>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ForgotPassword;