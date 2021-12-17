interface GradeBoardOverallGradeCellProps {
  overallGrade: string;
}

export default function GradeBoardOverallGradeCell({
  overallGrade,
}: GradeBoardOverallGradeCellProps) {
  return (
    <div className="grade-board_grade-cell overall">
      <div className="metadata-wrapper containing">
        <p className="overall-grade">{overallGrade}</p>
      </div>
    </div>
  );
}
