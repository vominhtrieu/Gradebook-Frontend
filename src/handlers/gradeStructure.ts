import { message } from "antd";
import { deleteData, postData, putData } from "./api";

export const createGradeStructureHandler = async (
  index: any,
  title: any,
  detail: any,
  classroomId: any,
  onAdd: (newItem: any) => void
) => {
  if (title === "") {
    return message.error("Please input title!");
  }

  if (title.length > 40) {
    return message.error("Name cannot be no longer than 40 characters!");
  }

  if (detail === "") {
    return message.error("Please input grade!");
  }

  try {
    const values = {
      name: title,
      order: index,
      grade: detail,
    };

    const data = await postData(
      `/classrooms/${classroomId}/grade-structures`,
      values
    );

    onAdd(data);
  } catch (e) {
    message.error("Something went wrong!");
  }
};

export const deleteGradeStructureHandler = async (
  id: any,
  classroomId: any,
  index: number,
  onDelete: (index: number) => void
) => {
  try {
    const values = {
      id,
    };
    const result = await deleteData(
      `/classrooms/${classroomId}/grade-structures`,
      values
    );

    if (result === "Success") {
      onDelete(index);
    }
  } catch (e) {
    message.error("Something went wrong!");
  }
};

export const updateGradeStructureHandler = async (
  id: string,
  index: number,
  title: string,
  grade: number,
  classroomId: any,
  onEdit: (idx: number, newTitle: string, newGrade: number) => void
) => {
  if (title === "") {
    return message.error("Please input title!");
  }

  if (grade === 0) {
    return message.error("Please input grade!");
  }

  try {
    const values = {
      id,
      name: title,
      grade: grade,
    };
    const result = await putData(
      `/classrooms/${classroomId}/grade-structures`,
      values
    );

    if (result === "Success") {
      onEdit(index, title, grade);
    }
  } catch (e) {
    message.error("Something went wrong!");
  }
};

export const updateGradeStructureOrderHandler = async (
  classroomId: any,
  sourceId: any,
  sourceIndex: any,
  destinationId: any,
  destinationIndex: any
) => {
  try {
    const values = {
      sourceId,
      sourceIndex,
      destinationId,
      destinationIndex,
    };
    const result = await putData(
      `/classrooms/${classroomId}/grade-structures/order`,
      values
    );

    if (result?.message === "Put data success") {
      return true;
    } else {
      message.error("Reorder grade structure items failed!");
      return false;
    }
  } catch (e) {
    message.error("Something went wrong!");
    return false;
  }
};
