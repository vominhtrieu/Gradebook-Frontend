import { FormInstance, message } from "antd";
import React from "react";
import { postData } from "./api";

const signInHandler = async (values: any): Promise<any> => {
    try {
        const data = await postData("/signin", values);
        if (data.token && data.token.length > 0) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("studentId", data.studentId);
            message.success(`Hi ${data.name}, welcome!`);
            return data;
        } else {
            if (data !== "Blocked") {
                message.error(data);
            }
            return null;
        }
    } catch (e) {
        message.error("Incorrect email or password!");
        return null;
    }
};

export const signIn = (
    mainContext: any,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    setLoginIsSuccessful: (value: React.SetStateAction<boolean>) => void,
    form: FormInstance
) => {
    setLoading(true);
    form
        .validateFields()
        .then(async values => {
            const data = await signInHandler(values);

            setLoading(false);
            if (data != null) {
                mainContext.setUser(data);
            }
            setLoginIsSuccessful(data !== null);
        })
        .catch(errorInfo => {
            message.error(errorInfo.errorFields[0].errors[0]);
            form.setFieldsValue({
                email: "",
                password: "",
            });
            setLoading(false);
        });
};

export const googleSignInSuccessHandler = async (
    mainContext: any,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    setLoginIsSuccessful: (value: React.SetStateAction<boolean>) => void,
    res: any
) => {
    setLoading(true);

    try {
        const values = {
            externalType: "GOOGLE",
            externalId: res?.profileObj.googleId,
            avatar: res?.profileObj.imageUrl,
            email: res?.profileObj.email,
            name: res?.profileObj.name,
        };
        const data = await postData("/signin/google", values);
        console.log(data);
        if (data.token.length > 0) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("studentId", data.studentId);

            message.success(`Hi ${data.name}, welcome!`);
            mainContext.setUser(data);
            setLoginIsSuccessful(true);
        } else {
            message.error("Email or password is incorrect!");
            setLoading(false);
        }
    } catch (e) {
        message.error("Something went wrong!");
        setLoading(false);
    }
};

export const googleSignInFailureHandler = () => {
    message.error("Google Sign In was unsuccessful. Try Again Later");
};
