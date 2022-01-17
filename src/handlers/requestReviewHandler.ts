import { message } from "antd";
import { postData } from "./api";

const requestReviewHandler = async (
  classroomId: any,
  gradeDetailId: any,
  values: any
) => {
  try {
    const data = await postData(
      `/classrooms/${classroomId}/student/grades/request-review`,
      { ...values, gradeDetailId }
    );

    if (data) {
      message.success("Request review successfully!");
      return true;
    } else {
      message.error("Request review unsuccessfully!");
      return false;
    }
  } catch (e) {
    message.error("Something went wrong!");
    return false;
  }
};

export default requestReviewHandler;
