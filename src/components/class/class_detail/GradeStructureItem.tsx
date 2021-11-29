import React from "react";
import { Button, Card, Divider, Input, Space, Tooltip, Typography } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

interface GradeStructureItemProps {
  id: string;
  index: number;
  title: string;
  detail: string;
  onDelete: (idx: number) => void;
}

export default function GradeStructureItem({
  id,
  index,
  title,
  detail,
  onDelete,
}: GradeStructureItemProps) {
  const [disable, setDisable] = React.useState(false);

  React.useEffect(() => {
    if (title !== "" || detail !== "") {
      setDisable(true);
    }
  }, [title, detail]);

  const handleEdit = () => {
    setDisable(false);
  };

  const handleSave = () => {
    setDisable(true);
  };

  const handleDelete = () => {
    onDelete(index);
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
                    value={title}
                    disabled={disable}
                  />
                </Space>
                <Space align="center" style={styles.spaceInputStyle}>
                  <Typography.Text>Grade detail: </Typography.Text>
                  <Input
                    style={styles.inputStyle}
                    value={detail}
                    disabled={disable}
                  />
                </Space>
              </Space>
              <Space direction="vertical" size={10}>
                <Tooltip title="Edit" placement="right">
                  <Button
                    type="text"
                    icon={<EditOutlined style={styles.iconStyle} />}
                    size="large"
                    onClick={handleEdit}
                  />
                </Tooltip>
                <Tooltip title="Save" placement="right">
                  <Button
                    type="text"
                    icon={<SaveOutlined style={styles.iconStyle} />}
                    size="large"
                    onClick={handleSave}
                  />
                </Tooltip>
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
