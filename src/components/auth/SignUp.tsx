import { Form, Input, Button, Card, message, Spin } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { postData } from "../../handlers/api";
import { useState } from "react";
import userNameRules from "../../form-rules/userName";
import userPasswordRules from "../../form-rules/userPassword";
import userEmailRules from "../../form-rules/userEmail";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const callSignUp = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async values => {
        try {
          const data = await postData("/signup", values);
          if (data.id > 0) {
            message.success(`Your account has been created, time to sign in!`);
            history.push("/signin");
          } else {
            message.error(data);
          }
        } catch (e) {
          message.error("Some thing went wrong!");
        } finally {
          setLoading(false);
        }
      })
      .catch(errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0]);
        setLoading(false);
      });
  };

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
    <Card title="Sign Up" className="auth-form">
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
            { required: true, message: "Please retype your password!" },
            { validator: checkRetypePassword },
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
            {loading ? <Spin style={{ paddingRight: 5 }} /> : null}Sign Up
          </Button>
          <span style={{ padding: "0 5px" }}>or</span>
          <Link to="/signin">Use your existing account</Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SignUp;
