import { message, Tooltip } from "antd";
import GradeNotificationModal from "./grade-notification-modal";
import UploadGrade from "./UploadGrade";
import {  putData } from "../../../handlers/api";


export default function GradeBoardGradeColumnHeader({gradeStructure, classId}: any) {

    const markFinal = () => {
        putData(`/classrooms/${classId}/mark-final`, {
            gradeStructureId: gradeStructure.id,
        }).then((msg) => {
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
                    <GradeNotificationModal isFinal={gradeStructure.isFinal} markFinal={markFinal} />
                    <UploadGrade classId={classId} gradeStructureId={gradeStructure.id}/>
                </div>
            </div>
        </div>
    );
}
