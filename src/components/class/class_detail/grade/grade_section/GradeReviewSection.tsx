import { Empty, message, Space } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../handlers/api";
import GradeReviewCard from "../grade_card/GradeReviewCard";
import "./index.css";

export default function GradeReviewSection() {
  const [compositionReviews, setCompositionReviews] = useState([]);
  const { id } = useParams<any>();

  useEffect(() => {
    const fetchData = () => {
      getData(`/classrooms/${id}/grade-reviews`)
        .then(compositionReviews => {
          setCompositionReviews(compositionReviews);
        })
        .catch(() => message.error("Something went wrong!"));
    };

    fetchData();
  }, []);

  const handleFinalizeReview = (index: number) => {
    console.log(compositionReviews.splice(index, 1));
    setCompositionReviews(compositionReviews.splice(index, 1));
  };

  return (
    <Space className="grade-section" direction="vertical">
      {compositionReviews.length === 0 ? (
        <Empty />
      ) : (
        compositionReviews.map((review: any, index: number) => (
          <GradeReviewCard
            key={index}
            index={index}
            reviewState={review.reviewState}
            handleFinalizeReview={handleFinalizeReview}
            gradeStructureName={review.gradeStructureName}
            gradeStructureGrade={review.gradeStructureGrade}
            gradeDetailId={review.gradeDetailId}
            studentId={review.studentId}
            currentGrade={review.currentGrade}
            expectationGrade={review.expectationGrade}
            explanationMessage={review.explanationMessage}
            updatedDate={review.updateAt}
          />
        ))
      )}
    </Space>
  );
}
