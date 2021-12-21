import React from "react";
import { Button, Card, Divider, Input, InputNumber, Tooltip, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { createGradeStructureHandler } from "../../../../handlers/gradeStructure";

interface GradeStructureInputItemProps {
    index: string;
    onAdd: (newItem: any) => void;
}

export default function GradeStructureInputItem({
                                                    index,
                                                    onAdd,
                                                }: GradeStructureInputItemProps) {
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemGrade, setItemGrade] = React.useState("");
    const urlParams = useParams<any>();

    const styles = {
        cardStyle: {
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
            marginBottom: 20,
        },
        dividerStyle: {
            height: "120px",
        },
        spaceInputStyle: {
            width: "100%",
            display: "flex",
            alignItems: "center",
        },
        inputStyle: {
            width: "100%",
            height: "45px",
            display: "flex",
            alignItems: "center"
        },
        iconStyle: {
            fontSize: 25,
        },
    };

    const handleCreate = () => {
        createGradeStructureHandler(
            index,
            itemTitle,
            itemGrade,
            urlParams.id,
            onAdd
        );
        setItemTitle("");
        setItemGrade("");
    };

    return (
        <Card style={styles.cardStyle}>
            <div style={{width: "100%", display: "flex"}}>
                <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
                    <div style={{...styles.spaceInputStyle, marginBottom: 20}}>
                        <Typography.Text style={{width: 50}}>Title: </Typography.Text>
                        <Input
                            style={styles.inputStyle}
                            value={itemTitle}
                            placeholder="New item's title"
                            onChange={e => setItemTitle(e.target.value)}
                        />
                    </div>
                    <div style={styles.spaceInputStyle}>
                        <Typography.Text style={{width: 50}}>Grade: </Typography.Text>
                        <InputNumber
                            style={styles.inputStyle}
                            inputMode="decimal"
                            value={itemGrade}
                            placeholder="New item's grade"
                            onChange={(value: any) => setItemGrade("" + value)}
                        />
                    </div>
                </div>
                <Divider type="vertical" style={styles.dividerStyle} />
                <div style={{width: 50, display: "flex", alignItems: "center"}}>
                    <Tooltip title="Create" placement="right">
                        <Button
                            type="text"
                            icon={<PlusCircleOutlined style={styles.iconStyle} />}
                            size="large"
                            onClick={handleCreate}
                        />
                    </Tooltip>
                </div>
            </div>
        </Card>
    );
}
