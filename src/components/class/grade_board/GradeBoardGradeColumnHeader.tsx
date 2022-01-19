import { message, Tooltip } from "antd";
import GradeNotificationModal from "./grade-notification-modal";
import UploadGrade from "./UploadGrade";
import { putData } from "../../../handlers/api";
import { useState } from "react";


export default function GradeBoardGradeColumnHeader({gradeStructure, classId}: any) {
    const [isFinal, setIsFinal] = useState(gradeStructure.isFinal);
    const markFinal = () => {
        putData(`/classrooms/${classId}/mark-final`, {
            gradeStructureId: gradeStructure.id,
        }).then((msg) => {
            setIsFinal(true);
            return message.success("Marked column as final");
        }).catch((e) => {
            return message.error("Can't save grade");
        })
    }
    return (
        <div>
            <div style={{display: "flex", alignItems: "center"}}>
                <Tooltip title={gradeStructure.name} style={{display: "flex"}}>
                    <p className="title" style={{marginBottom: 0}}><b>{gradeStructure.name}</b> ({gradeStructure.grade})
                    </p>
                </Tooltip>
                <div style={{marginLeft: "auto"}}>
                    <GradeNotificationModal isFinal={isFinal} markFinal={markFinal} />
                    <UploadGrade classId={classId} gradeStructureId={gradeStructure.id} />
                </div>
            </div>
        </div>
    );
}
