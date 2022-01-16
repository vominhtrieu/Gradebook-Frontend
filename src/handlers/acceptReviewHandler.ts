import { message } from "antd";
import { postData } from "./api";

const acceptReviewHandler = async (classroomId: any, reviewId: any) => {
  try {
    const data = await postData(
      `/classrooms/${classroomId}/grade-reviews/accept-review`,
      { reviewId }
    );

    if (data) {
      message.success("Accept review successfully!");
      return true;
    } else {
      message.error("Accept review unsuccessfully!");
      return false;
    }
  } catch (e) {
    message.error("Something went wrong!");
    return false;
  }
};

export default acceptReviewHandler;
