import { Form, Input, Button, Card, Spin, Divider } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import userEmailRules from "../../form-rules/userEmail";
import userPasswordRules from "../../form-rules/userPassword";
import GoogleLogin from "react-google-login";
import {
  googleSignInSuccessHandler,
  googleSignInFailureHandler,
  signIn,
} from "../../handlers/signInHandler";
import { RoutingContext } from "../../contexts/routing";
import { MainContext } from "../../contexts/main";

function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginIsSuccessful, setLoginIsSuccessful] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const routingContext = useContext(RoutingContext);
  const mainContext = useContext(MainContext);

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (loginIsSuccessful) {
      history.push(routingContext.requestedURL);
    }
  }, [loginIsSuccessful, history, routingContext.requestedURL]);

  const callSignIn = () => {
    signIn(mainContext, setLoading, setLoginIsSuccessful, form);
  };

  const callGoogleSignInSuccess = (res: any) => {
    googleSignInSuccessHandler(mainContext, setLoading, setLoginIsSuccessful, res);
  };

  return (
    <Card title="Sign In" className="auth-form">
      <Form form={form} layout="vertical">
        <Form.Item name="email" rules={userEmailRules}>
          <Input
            type="email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            name="email"
          />
        </Form.Item>
        <Form.Item name="password" rules={userPasswordRules}>
          <Input
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            name="password"
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
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
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
        <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
          <Link to="/forgot-password">Forgot password</Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SignIn;
