import { message, Tooltip } from "antd";
import GradeNotificationModal from "./grade-notification-modal";
import UploadGrade from "./UploadGrade";
import { postData, putData } from "../../../handlers/api";


export default function GradeBoardGradeColumnHeader({gradeStructure, classId}: any) {

    const markFinal = () => {
        putData(`/classrooms/${classId}/mark-final`, {
            gradeStructureId: gradeStructure.id,
        }).then((msg) => {
            return message.error("Marked column as final");
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
                <UploadGrade classId={classId} gradeStructureId={gradeStructure.id} />
            </div>

            <div className="finalization-wrapper">
                <GradeNotificationModal isFinal={gradeStructure.isFinal} markFinal={markFinal} />
            </div>
        </div>
    );
}
