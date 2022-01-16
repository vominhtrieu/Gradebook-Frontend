import { useState } from "react";
import MakeFinalDecisionModal from "../grade_review_modal/MakeFinalDecisionModal";

export default function GradeReviewConversationHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleMakeFinalDecisionSuccessfully = () => {};

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <header className="grade-review-conversation_header">
      <div className="left-column">
        <p className="student-name">TranabcdefghBacd HoabcdngDabcdt12</p>
        <p className="expectation-grade">Expectation grade: 100</p>
      </div>
      <div className="right-column">
        <p className="current-grade">
          100<span>/100</span>
        </p>
        <p className="make-final-decision" onClick={showModal}>
          Make final decision
        </p>
      </div>
      <MakeFinalDecisionModal
        reviewedId={0}
        handleMakeFinalDecisionSuccessfully={
          handleMakeFinalDecisionSuccessfully
        }
        studentCurrentGrade={0}
        studentExpectationGrade={0}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        maximumGrade={100}
      />
    </header>
  );
}
