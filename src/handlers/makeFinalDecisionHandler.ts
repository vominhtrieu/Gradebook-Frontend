import { message } from "antd";
import { postData } from "./api";

const makeFinalDecisionHandler = async (
  classroomId: any,
  reviewId: any,
  values: any
) => {
  try {
    const data = await postData(
      `/classrooms/${classroomId}/grade-reviews/make-final-decision`,
      { ...values, reviewId }
    );

    if (data) {
      message.success("Make final decision successfully!");
      return true;
    } else {
      message.error("Make final decision unsuccessfully!");
      return false;
    }
  } catch (e) {
    message.error("Something went wrong!");
    return false;
  }
};

export default makeFinalDecisionHandler;
