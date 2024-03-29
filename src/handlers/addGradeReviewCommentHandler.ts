import { message } from "antd";
import { postData } from "./api";

const addGradeReviewCommentHandler = async (
  classroomId: any,
  gradeDetailId: any,
  comment: any
) => {
  try {
    const data = await postData(
      `/classrooms/${classroomId}/review/conversation/${gradeDetailId}/add-comment`,
      { comment }
    );

    if (data) {
      return true;
    } else {
      message.error("Comment unsuccessfully!");
      return false;
    }
  } catch (e) {
    message.error("Something went wrong!");
    return false;
  }
};

export default addGradeReviewCommentHandler;
