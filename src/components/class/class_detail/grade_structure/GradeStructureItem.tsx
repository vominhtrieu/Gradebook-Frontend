import React, { useEffect } from "react";
import { Button, Card, Divider, Input, InputNumber, Tooltip, Typography } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import {
    deleteGradeStructureHandler,
    updateGradeStructureHandler,
} from "../../../../handlers/gradeStructure";
import { useParams } from "react-router";

interface GradeStructureItemProps {
    id: string;
    index: number;
    title: string;
    grade: number;
    onEdit: (idx: number, newTitle: string, newGrade: number) => void;
    onDelete: (idx: number) => void;
}

export default function GradeStructureItem({
                                               id,
                                               index,
                                               title,
                                               grade,
                                               onEdit,
                                               onDelete,
                                           }: GradeStructureItemProps) {
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemGrade, setItemGrade] = React.useState(0);
    const [disable, setDisable] = React.useState(true);
    const urlParams = useParams<any>();

    useEffect(() => {
        setItemTitle(title);
    }, [title]);

    useEffect(() => {
        setItemGrade(grade);
    }, [grade]);

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
            itemGrade,
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
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
            width: "100%",
        },
        dividerStyle: {
            height: "120px",
        },
        spaceInputStyle: {
            width: "100%",
            alignItems: "center",
            display: "flex"
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
                        <div
                            style={{width: "100%", display: "flex"}}
                        >
                            <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
                                <div style={{...styles.spaceInputStyle, marginBottom: 20}}>
                                    <Typography.Text style={{width: 50}}>Title: </Typography.Text>
                                    <Input
                                        style={{width: "100%"}}
                                        value={itemTitle}
                                        disabled={disable}
                                        onChange={e => setItemTitle(e.target.value)}
                                    />
                                </div>
                                <div style={styles.spaceInputStyle}>
                                    <Typography.Text style={{width: 50}}>Grade: </Typography.Text>
                                    <InputNumber
                                        style={{width: "100%", height: 45, display: "flex", alignItems: "center"}}
                                        value={itemGrade}
                                        disabled={disable}
                                        onChange={(value: any) => setItemGrade(value)}
                                    />
                                </div>
                            </div>
                            <Divider type="vertical" style={styles.dividerStyle} />
                            <div
                                style={{width: 50, display: "flex", flexDirection: "column", justifyContent: "center"}}>
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
                            </div>
                        </div>
                    </Card>
                </li>
            )}
        </Draggable>
    );
}
