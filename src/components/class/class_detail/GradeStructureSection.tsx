import { Empty, message, Space } from "antd";
import GradeStructureItem from "./GradeStructureItem";
import GradeStructureList from "./GradeStructureList";
import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { MainContext } from "../../../contexts/main";
import { getData } from "../../../handlers/api";
import { useParams } from "react-router";
import GradeStructureInputItem from "./GradeStructureInputItem";
import { updateGradeStructureOrderHandler } from "../../../handlers/gradeStructure";

export default function GradeStructureSection() {
  const [gradeStructure, setGradeStructure]: any = useState(null);
  const { id } = useParams<any>();
  const mainContext = useContext(MainContext);

  useEffect(() => {
    const fetchData = () => {
      getData(`/classrooms/${id}/grade-structures`)
        .then((gradeStructure: any) => {
          setGradeStructure(gradeStructure);
          mainContext.setReloadNeeded(false);
        })
        .catch(() => message.error("Something went wrong!"));
    };

    if (!mainContext.reloadNeeded) {
      return;
    }

    fetchData();
  }, [mainContext, id]);

  useEffect(() => {
    if (!gradeStructure) {
      mainContext.setReloadNeeded(true);
    }
  }, [gradeStructure, mainContext]);

  const handleAddItem = (newItem: any) => {
    setGradeStructure([...gradeStructure, newItem]);
  };

  const handleEditItem = (
    index: number,
    newTitle: string,
    newDetail: string
  ) => {
    const tempItems = [...gradeStructure];
    tempItems[index] = {
      id: tempItems[index].id,
      name: newTitle,
      grade: newDetail,
    };
    setGradeStructure(tempItems);
  };

  const handleDeleteItem = (index: number) => {
    const tempItems = [...gradeStructure];
    tempItems.splice(index, 1);
    setGradeStructure(tempItems);
  };

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;
    if (
      await updateGradeStructureOrderHandler(
        id,
        gradeStructure[result.source.index].id,
        result.source.index,
        gradeStructure[result.destination.index].id,
        result.destination.index
      )
    ) {
      const newGradeStructure = Array.from(gradeStructure);
      const [reorderedItem] = newGradeStructure.splice(result.source.index, 1);
      newGradeStructure.splice(result.destination.index, 0, reorderedItem);
      setGradeStructure(newGradeStructure);
    }
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
                title={item.name}
                detail={item.grade}
                id={item?.id?.toString()}
                index={index}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </GradeStructureList>
        </DragDropContext>
      ) : (
        <Empty />
      )}

      <GradeStructureInputItem
        index={gradeStructure?.length}
        onAdd={handleAddItem}
      />
    </Space>
  );
}
