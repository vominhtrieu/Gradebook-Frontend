import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "./GradeStructureList.css";

export default function GradeStructureList({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <Droppable droppableId="grade-structure-list">
      {provided => (
        <ul
          {...provided.droppableProps}
          className="grade-structure-list"
          ref={provided.innerRef}
        >
          {children}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
