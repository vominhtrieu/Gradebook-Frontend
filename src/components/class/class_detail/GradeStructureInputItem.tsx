import React from "react";
import { Button, Card, Divider, Input, Space, Tooltip, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { createGradeStructureHandler } from "../../../handlers/gradeStructure";

interface GradeStructureInputItemProps {
  index: string;
  onAdd: (newItem: any) => void;
}

export default function GradeStructureInputItem({
  index,
  onAdd,
}: GradeStructureInputItemProps) {
  const [itemTitle, setItemTitle] = React.useState("");
  const [itemDetail, setItemDetail] = React.useState("");
  const urlParams = useParams<any>();

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

  const handleCreate = () => {
    createGradeStructureHandler(
      index,
      itemTitle,
      itemDetail,
      urlParams.id,
      onAdd
    );
    setItemTitle("");
    setItemDetail("");
  };

  return (
    <Card style={styles.cardStyle}>
      <Space split={<Divider type="vertical" style={styles.dividerStyle} />}>
        <Space direction="vertical" size="large">
          <Space align="center" style={styles.spaceInputStyle}>
            <Typography.Text>Grade title: </Typography.Text>
            <Input
              style={styles.inputStyle}
              value={itemTitle}
              onChange={e => setItemTitle(e.target.value)}
            />
          </Space>
          <Space align="center" style={styles.spaceInputStyle}>
            <Typography.Text>Grade detail: </Typography.Text>
            <Input
              style={styles.inputStyle}
              value={itemDetail}
              onChange={e => setItemDetail(e.target.value)}
            />
          </Space>
        </Space>
        <Space direction="vertical" size={10}>
          <Tooltip title="Edit" placement="right">
            <Button
              type="text"
              icon={<PlusCircleOutlined style={styles.iconStyle} />}
              size="large"
              onClick={handleCreate}
            />
          </Tooltip>
        </Space>
      </Space>
    </Card>
  );
}
