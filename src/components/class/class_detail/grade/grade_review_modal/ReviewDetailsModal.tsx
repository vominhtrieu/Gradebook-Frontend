import { Button, Modal } from "antd";
import { useState } from "react";
import GradeReviewModalProps from "./GradeReviewModalProps";
import "./index.css";
import MakeFinalDecisionModal from "./MakeFinalDecisionModal";

interface ReviewDetailsModalProps extends GradeReviewModalProps {
  index: number;
  handleFinalizedReview: (index: number) => void;
  reviewId: number;
  studentId: string;
  gradeStructureName: string;
  gradeStructureGrade: number;
  currentGrade: number;
  expectationGrade: number;
  explanationMessage: string;
}

export default function ReviewDetailsModal({
  index,
  handleFinalizedReview,
  isModalVisible,
  handleCancel,
  reviewId,
  studentId,
  gradeStructureName,
  gradeStructureGrade,
  currentGrade,
  expectationGrade,
  explanationMessage,
}: ReviewDetailsModalProps) {
  const [makeFinalDecisionModalVisible, setMakeFinalDecisionModalVisible] =
    useState(false);

  const handleOpenMakeFinalDecisionModal = () => {
    setMakeFinalDecisionModalVisible(true);
  };

  const handleCancelMakeFinalDecisionModal = () => {
    setMakeFinalDecisionModalVisible(false);
  };

  const handleMakeFinalDecisionSuccessfully = () => {
    handleCancelMakeFinalDecisionModal();
    handleCancel();
    handleFinalizedReview(index);
  };

  const handleOk = () => {};

  return (
    <>
      <Modal
        title="Grade review details"
        className="review-grade-modal review-details-modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        wrapClassName="review-grade-modal-wrap"
        footer={
          <>
            <Button
              onClick={handleOpenMakeFinalDecisionModal}
              className="ant-btn-secondary"
            >
              Make final decision
            </Button>
            <Button type="primary">Review</Button>
          </>
        }
        centered
      >
        <ul className="information-list">
          <li className="information-item">
            <p className="information-item_title">Composition name</p>
            <div className="information-item_description">
              {gradeStructureName}
            </div>
          </li>
          <li className="information-item">
            <p className="information-item_title">Composition structure</p>
            <div className="information-item_description">
              {gradeStructureGrade}
            </div>
          </li>
          <li className="information-item">
            <p className="information-item_title">Student id</p>
            <div className="information-item_description">{studentId}</div>
          </li>
          <li className="information-item">
            <p className="information-item_title">Current grade</p>
            <div className="information-item_description">{currentGrade}</div>
          </li>
          <li className="information-item">
            <p className="information-item_title">Expectation grade</p>
            <div className="information-item_description">
              {expectationGrade}
            </div>
          </li>
          <li className="information-item">
            <p className="information-item_title">Explanation message</p>
            <div className="information-item_description">
              {explanationMessage}
            </div>
          </li>
        </ul>
      </Modal>
      <MakeFinalDecisionModal
        reviewedId={reviewId}
        studentCurrentGrade={currentGrade}
        studentExpectationGrade={expectationGrade}
        isModalVisible={makeFinalDecisionModalVisible}
        handleCancel={handleCancelMakeFinalDecisionModal}
        handleMakeFinalDecisionSuccessfully={
          handleMakeFinalDecisionSuccessfully
        }
      />
    </>
  );
}
