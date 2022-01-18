import { Link, useParams } from "react-router-dom";
import { Card, message } from "antd";
import { postData } from "../../handlers/api";
import { useEffect } from "react";

function Activate() {
    const params = useParams();
    const {activationCode}: any = params;

    useEffect(() => {
        if (activationCode) {
            postData(`/activation`, {activationCode: activationCode}).then((msg) => {
                message.success("Account activated");
            }).catch((err) => {
                message.error("Can't activated");
            });
        }
    })

    return (
        <Card title="Account activated" className="auth-form">
            <b>Welcome to Gradebook System</b><br />
            <Link to="/signin">Go to Sign in</Link>
        </Card>
    )
}

export default Activate;