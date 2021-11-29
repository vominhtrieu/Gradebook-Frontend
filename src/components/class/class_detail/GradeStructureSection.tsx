import { Button, Empty, message, Popconfirm, Space, Tooltip } from "antd";
import {
  PlusSquareOutlined,
  ClearOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import GradeStructureItem from "./GradeStructureItem";
import GradeStructureList from "./GradeStructureList";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const items: any = [
  {
    title: "Mid term",
    detail: "40",
  },
  {
    title: "Final term",
    detail: "50",
  },
  {
    title: "Test",
    detail: "60",
  },
];

export default function GradeStructureSection() {
  const [gradeStructure, setGradeStructure]: any = useState(items);

  const handleNewItem = () => {
    setGradeStructure([...gradeStructure, { title: "", detail: "" }]);
  };

  const handleDeleteItem = (index: number) => {
    const tempItems = [...gradeStructure];
    if (index > -1) {
      tempItems.splice(index, 1);
      setGradeStructure(tempItems);
    }
  };

  const handleSaveItems = () => {
    message.info("Save result to database");
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const newGradeStructure = Array.from(gradeStructure);
    const [reorderedItem] = newGradeStructure.splice(result.source.index, 1);
    newGradeStructure.splice(result.destination.index, 0, reorderedItem);
    setGradeStructure(newGradeStructure);
  };

  const styles = {
    containerStyle: {
      width: "100%",
    },
    toolBarStyle: {
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      padding: 10,
    },
    toolBarIconStyle: {
      fontSize: 30,
    },
  };

  return (
    <>
      <Space
        direction="vertical"
        size="large"
        align="center"
        style={styles.containerStyle}
      >
        {gradeStructure?.length ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <GradeStructureList>
              {gradeStructure.map((item: any, index: number) => (
                <GradeStructureItem
                  key={index}
                  title={item.title}
                  detail={item.detail}
                  id={index.toString()}
                  index={index}
                  onDelete={handleDeleteItem}
                />
              ))}
            </GradeStructureList>
          </DragDropContext>
        ) : (
          <Empty />
        )}

        <Space size={25} align="center" style={styles.toolBarStyle}>
          <Tooltip title="New">
            <Button
              type="text"
              icon={<PlusSquareOutlined style={styles.toolBarIconStyle} />}
              onClick={handleNewItem}
            />
          </Tooltip>
          <Tooltip title="Save Structure">
            <Button
              type="text"
              icon={<SaveOutlined style={styles.toolBarIconStyle} />}
              size="large"
              onClick={handleSaveItems}
            />
          </Tooltip>
          <Tooltip title="Clear structure">
            <Popconfirm title="This will delete all grades above. Make sure you want to do this.">
              <Button
                type="text"
                danger
                icon={<ClearOutlined style={styles.toolBarIconStyle} />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      </Space>
    </>
  );
}
