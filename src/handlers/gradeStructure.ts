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
    return message.error("Please input grade structure's title!");
  }

  if (detail === "") {
    return message.error("Please input grade structure's detail!");
  }

  const detailPattern = /^[0-9]+$/;

  if (!detailPattern.test(detail)) {
    return message.error("Grade structure's detail must be a number!");
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
  detail: string,
  classroomId: any,
  onEdit: (idx: number, newTitle: string, newDetail: string) => void
) => {
  if (title === "") {
    return message.error("Please input grade structure's title!");
  }

  if (detail === "") {
    return message.error("Please input grade structure's detail!");
  }

  const detailPattern = /^[0-9]+$/;

  if (!detailPattern.test(detail)) {
    return message.error("Grade structure's detail must be a number!");
  }

  try {
    const values = {
      id,
      name: title,
      grade: detail,
    };
    const result = await putData(
      `/classrooms/${classroomId}/grade-structures`,
      values
    );

    if (result === "Success") {
      onEdit(index, title, detail);
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

    if (result === "Success") {
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
