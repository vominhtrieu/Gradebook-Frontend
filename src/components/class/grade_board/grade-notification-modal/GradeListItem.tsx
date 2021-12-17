import { List } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { ReactNode } from "react";

interface GradeListItemProps {
  studentAvatarSrc?: ReactNode;
  studentName: string;
  previouslyGrade?: number;
  currentGrade: number;
}

export default function GradeListItem({
  studentAvatarSrc,
  studentName,
  previouslyGrade,
  currentGrade,
}: GradeListItemProps) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={studentAvatarSrc} />}
        title={studentName}
      />
      <div className="grade-information">
        <div className="grade-information-wrapper">
          <span className="grade">{currentGrade}</span>
          <span className="maximum-grade">/100</span>
        </div>
        {previouslyGrade && (
          <div className="grade-information-wrapper previously-grade-wrapper">
            <span>Previously: </span>
            <span className="grade">{previouslyGrade}</span>
            <span className="maximum-grade">/100</span>
          </div>
        )}
      </div>
    </List.Item>
  );
}
