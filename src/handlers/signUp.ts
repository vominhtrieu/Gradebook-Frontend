import { message } from "antd";
import { postData } from "./api";

const signUpHandler = async (values: any) => {
  try {
    const data = await postData("/signup", values);
    if (data.id > 0) {
      message.success(`Your account has been created, time to sign in!`);
      return true;
    } else {
      message.error(data);
      return false;
    }
  } catch (e) {
    message.error("Some thing went wrong!");
    return false;
  }
};

export default signUpHandler;
