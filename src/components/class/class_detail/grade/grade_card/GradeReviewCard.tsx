import { ExceptionOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { useState } from "react";
import ReviewDetailsModal from "../grade_review_modal/ReviewDetailsModal";

const cardColors = ["#808080", "#ffdb58", "#1890ff", "#87d068"];

interface GradeReviewCardProps {
  index: number;
  handleFinalizeReview: (index: number) => void;
  reviewState: number;
  gradeDetailId: any;
  studentId: string;
  gradeStructureName: string;
  gradeStructureGrade: number;
  updatedDate: any;
  currentGrade: number;
  expectationGrade: number;
  explanationMessage: string;
}

export default function GradeReviewCard({
  index,
  handleFinalizeReview,
  reviewState,
  gradeDetailId,
  studentId,
  gradeStructureName,
  gradeStructureGrade,
  updatedDate,
  currentGrade,
  expectationGrade,
  explanationMessage,
}: GradeReviewCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal() {
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  const handleOnClickCard = () => {
    showModal();
  };

  return (
    <>
      <Card className="grade-card" onClick={handleOnClickCard} hoverable>
        <Meta
          avatar={
            <Avatar
              style={{ backgroundColor: cardColors[reviewState] }}
              size={32}
              icon={<ExceptionOutlined />}
            />
          }
          title={studentId}
          description={
            <>
              <div className="description-wrapper">
                <p className="description-title grade-structure_name">
                  {gradeStructureName}
                </p>
              </div>
              <div className="description-wrapper">
                <p>Structure: {gradeStructureGrade}</p>
                <p className="description-date">
                  {moment(updatedDate).fromNow()}
                </p>
              </div>
            </>
          }
        />
      </Card>
      <ReviewDetailsModal
        index={index}
        handleFinalizeReview={handleFinalizeReview}
        gradeDetailId={gradeDetailId}
        studentId={studentId}
        gradeStructureName={gradeStructureName}
        gradeStructureGrade={gradeStructureGrade}
        currentGrade={currentGrade}
        expectationGrade={expectationGrade}
        explanationMessage={explanationMessage}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </>
  );
}
