import { Empty, message, Space } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../handlers/api";
import GradeViewCard from "../grade_card/GradeViewCard";

export default function GradeViewSection({ teachers }: any) {
  const [gradeDetails, setGradeDetails] = useState([]);
  const { id } = useParams<any>();

  useEffect(() => {
    const fetchData = () => {
      getData(`/classrooms/${id}/student/grades`)
        .then(studentGradeDetails => {
          setGradeDetails(studentGradeDetails);
        })
        .catch(() => message.error("Something went wrong!"));
    };

    fetchData();
  }, [id]);

  return (
    <Space className="grade-section" direction="vertical">
      {gradeDetails.length === 0 ? (
        <Empty />
      ) : (
        gradeDetails.map((gradeDetail: any, index: number) => (
          <GradeViewCard
            key={index}
            gradeDetailId={gradeDetail.gradeDetailId}
            gradeStructureName={gradeDetail.gradeStructureName}
            gradeStructureGrade={gradeDetail.gradeStructureGrade}
            grade={gradeDetail.grade}
            reviewState={gradeDetail.reviewState}
            updatedDate={gradeDetail.updatedDate}
            teachers={teachers}
          />
        ))
      )}
    </Space>
  );
}
