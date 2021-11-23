import { Form, Input, Button, Card, Spin, Divider } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import userEmailRules from "../../form-rules/userEmail";
import userPasswordRules from "../../form-rules/userPassword";
import GoogleLogin from "react-google-login";
import {
  googleSignInSuccessHandler,
  googleSignInFailureHandler,
  signIn,
} from "../../handlers/signIn";
import { GOOGLE_CLIENT_ID } from "../../configs/auth";

function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginIsSuccessful, setLoginIsSuccessful] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (loginIsSuccessful) {
      const studentId = localStorage.getItem("studentId");
      localStorage.removeItem("studentId");

      if (studentId === "null") {
        history.push("/profile/studentId");
      } else {
        history.push("/");
      }
    }
  }, [loginIsSuccessful, history]);

  const callSignIn = () => {
    signIn(setLoading, setLoginIsSuccessful, form);
  };

  const callGoogleSignInSuccess = (res: any) => {
    googleSignInSuccessHandler(setLoading, setLoginIsSuccessful, res);
  };

  return (
    <Card title="Sign In" className="auth-form">
      <Form form={form} layout="vertical">
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
        <Form.Item>
          <Button onClick={callSignIn} disabled={loading} type="primary" block>
            {loading ? <Spin style={{ paddingRight: 5 }} /> : null}Sign In
          </Button>
        </Form.Item>
        <Divider>Or</Divider>
        <Form.Item>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
              <Button
                type="default"
                icon={<GoogleOutlined />}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                block
              >
                Sign In with Google
              </Button>
            )}
            onSuccess={callGoogleSignInSuccess}
            onFailure={googleSignInFailureHandler}
            cookiePolicy={"single_host_origin"}
          />
        </Form.Item>
        <Divider>Or</Divider>
        <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
          <Link to="/signup">Create a new account</Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SignIn;
