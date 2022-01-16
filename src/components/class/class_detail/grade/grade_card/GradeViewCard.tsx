import { SolutionOutlined } from "@ant-design/icons";
import { Card, Progress } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { useState } from "react";
import RequestReviewModal from "../grade_review_modal/RequestReviewModal";
import "./index.css";

const cardColors = ["#808080", "#ffdb58", "#1890ff", "#87d068"];

interface GradeViewCardProps {
  gradeDetailId: number;
  gradeStructureName: string;
  gradeStructureGrade: number;
  grade: number;
  reviewState: number;
  updatedDate: any;
  teachers: any;
}

export default function GradeViewCard({
  gradeDetailId,
  gradeStructureName,
  gradeStructureGrade,
  grade,
  reviewState,
  updatedDate,
  teachers,
}: GradeViewCardProps) {
  const maximumGrade = 100;
  const [reviewStatus, setReviewStatus] = useState(reviewState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal() {
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  const handleOnClickCard = () => {
    if (reviewState === 0) {
      showModal();
    } else {
    }
  };

  const handleTransferToRequestedState = () => {
    if (reviewState === 1) {
      return;
    }
    setReviewStatus(1);
  };

  return (
    <>
      <Card className="grade-card" onClick={handleOnClickCard} hoverable>
        <Meta
          avatar={
            <Avatar
              style={{
                backgroundColor: cardColors[reviewState],
              }}
              size={32}
              icon={<SolutionOutlined />}
            />
          }
          title={gradeStructureName}
          description={
            <>
              <div className="description-wrapper">
                <p className="description-title">Grade</p>
                <Progress
                  strokeColor={cardColors[reviewState]}
                  percent={grade}
                  format={percent => percent}
                />
              </div>
              <div className="description-wrapper">
                <p>Structure: {gradeStructureGrade}</p>
                <p className="description-date">
                  {moment(updatedDate).startOf("hour").fromNow()}
                </p>
              </div>
            </>
          }
        />
      </Card>
      <RequestReviewModal
        gradeDetailId={gradeDetailId}
        gradeStructureName={gradeStructureName}
        gradeStructureGrade={gradeStructureGrade}
        currentGrade={grade}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        maximumGrade={maximumGrade}
        teachers={teachers}
        handleTransferToRequestedState={handleTransferToRequestedState}
      />
    </>
  );
}
