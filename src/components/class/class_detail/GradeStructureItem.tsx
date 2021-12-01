import React, { useEffect } from "react";
import { Button, Card, Divider, Input, Space, Tooltip, Typography } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import {
  deleteGradeStructureHandler,
  updateGradeStructureHandler,
} from "../../../handlers/gradeStructure";
import { useParams } from "react-router";

interface GradeStructureItemProps {
  id: string;
  index: number;
  title: string;
  detail: string;
  onEdit: (idx: number, newTitle: string, newDetail: string) => void;
  onDelete: (idx: number) => void;
}

export default function GradeStructureItem({
  id,
  index,
  title,
  detail,
  onEdit,
  onDelete,
}: GradeStructureItemProps) {
  const [itemTitle, setItemTitle] = React.useState(title);
  const [itemDetail, setItemDetail] = React.useState(detail);
  const [disable, setDisable] = React.useState(true);
  const urlParams = useParams<any>();

  useEffect(() => {
    setItemTitle(title);
  }, [title]);

  useEffect(() => {
    setItemDetail(detail);
  }, [detail]);

  const handleEdit = () => {
    if (!disable) return;
    setDisable(false);
  };

  const handleSave = () => {
    if (disable) return;
    updateGradeStructureHandler(
      id,
      index,
      itemTitle,
      itemDetail,
      urlParams.id,
      onEdit
    );
    setDisable(true);
  };

  const handleDelete = () => {
    deleteGradeStructureHandler(id, urlParams.id, index, onDelete);
  };

  const styles = {
    cardStyle: {
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    dividerStyle: {
      height: "120px",
    },
    spaceInputStyle: {
      width: "100%",
      justifyContent: "space-between",
    },
    inputStyle: {
      minWidth: "360px",
    },
    iconStyle: {
      fontSize: 25,
    },
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={styles.cardStyle}>
            <Space
              split={<Divider type="vertical" style={styles.dividerStyle} />}
            >
              <Space direction="vertical" size="large">
                <Space align="center" style={styles.spaceInputStyle}>
                  <Typography.Text>Grade title: </Typography.Text>
                  <Input
                    style={styles.inputStyle}
                    value={itemTitle}
                    disabled={disable}
                    onChange={e => setItemTitle(e.target.value)}
                  />
                </Space>
                <Space align="center" style={styles.spaceInputStyle}>
                  <Typography.Text>Grade detail: </Typography.Text>
                  <Input
                    style={styles.inputStyle}
                    value={itemDetail}
                    disabled={disable}
                    onChange={e => setItemDetail(e.target.value)}
                  />
                </Space>
              </Space>
              <Space direction="vertical" size={10}>
                {disable ? (
                  <Tooltip title="Edit" placement="right">
                    <Button
                      type="text"
                      icon={<EditOutlined style={styles.iconStyle} />}
                      size="large"
                      onClick={handleEdit}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Save" placement="right">
                    <Button
                      type="text"
                      icon={<SaveOutlined style={styles.iconStyle} />}
                      size="large"
                      onClick={handleSave}
                    />
                  </Tooltip>
                )}

                <Tooltip title="Delete" placement="right">
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={styles.iconStyle} />}
                    size="large"
                    onClick={handleDelete}
                  />
                </Tooltip>
              </Space>
            </Space>
          </Card>
        </li>
      )}
    </Draggable>
  );
}
