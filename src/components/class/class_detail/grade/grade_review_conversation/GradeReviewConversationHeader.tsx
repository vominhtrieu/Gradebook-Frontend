import { useState } from "react";
import MakeFinalDecisionModal from "../grade_review_modal/MakeFinalDecisionModal";

interface GradeReviewConversationHeaderProps {
  setIsFinal: (b: boolean) => void;
  userRole: any;
  gradeDetailId: any;
  studentId: any;
  currentGrade: any;
  expectationGrade: any;
}

export default function GradeReviewConversationHeader({
  setIsFinal,
  userRole,
  gradeDetailId,
  studentId,
  currentGrade,
  expectationGrade,
}: GradeReviewConversationHeaderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleMakeFinalDecisionSuccessfully = () => {
    setIsFinal(true);
  };

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <header className="grade-review-conversation_header">
      <div className="left-column">
        <p className="student-name">{studentId}</p>
        <p className="expectation-grade">
          Expectation grade: {expectationGrade}
        </p>
      </div>
      <div className="right-column">
        <p className="current-grade">
          {currentGrade}
          <span>/100</span>
        </p>
        {userRole === 2 && (
          <p className="make-final-decision" onClick={showModal}>
            Make final decision
          </p>
        )}
      </div>
      {userRole === 2 && (
        <MakeFinalDecisionModal
          gradeDetailId={gradeDetailId}
          handleMakeFinalDecisionSuccessfully={
            handleMakeFinalDecisionSuccessfully
          }
          studentCurrentGrade={currentGrade}
          studentExpectationGrade={expectationGrade}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          maximumGrade={100}
        />
      )}
    </header>
  );
}
