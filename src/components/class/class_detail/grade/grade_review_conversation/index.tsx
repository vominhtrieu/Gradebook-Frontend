import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, message, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../handlers/api";
import GradeReviewConversationFooter from "./GradeReviewConversationFooter";
import GradeReviewConversationHeader from "./GradeReviewConversationHeader";
import "./index.css";

export default function GradeReviewConversation() {
  const [isFinal, setIsFinal] = useState(false);
  const [userRole, setUserRole] = useState();
  const [reviewInformation, setReviewInformation] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [commenters, setCommenters] = useState<any>([]);
  const { id, gradeDetailId } = useParams<any>();

  useEffect(() => {
    const fetchData = () => {
      getData(`/classrooms/${id}/review/conversation/${gradeDetailId}`)
        .then(review => {
          setIsFinal(review.information.isFinal);
          setUserRole(review.userRole);
          setReviewInformation(review.information);
          setComments(review.comments);
          setCommenters(review.commenters);
        })
        .catch(() => message.error("Something went wrong!"));
    };

    fetchData();
  }, [id, gradeDetailId]);

  return (
    <Space className="grade-review-conversation">
      <GradeReviewConversationHeader
        setIsFinal={setIsFinal}
        userRole={userRole}
        gradeDetailId={reviewInformation?.gradeDetailId}
        studentId={reviewInformation?.studentId}
        currentGrade={reviewInformation?.currentGrade}
        expectationGrade={reviewInformation?.expectationGrade}
      />
      <main className="grade-review-conversation_body">
        <List
          className="comment-list"
          dataSource={comments}
          header={
            <>
              <div className="comment-list_header">
                Composition name:{" "}
                <span>{reviewInformation?.compositionName}</span>
              </div>
              <div className="comment-list_header">
                Composition structure:{" "}
                <span>{reviewInformation?.compositionStructure}</span>
              </div>
              <div className="comment-list_header">
                Explanation message:{" "}
                <span>{reviewInformation?.explanationMessage}</span>
              </div>
            </>
          }
          renderItem={(item: any) => (
            <List.Item className="comment-item">
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <>
                    {commenters[item.commenterIndex]}{" "}
                    <span className="comment-date">
                      {moment(item.date).format("MMM DD")}
                    </span>
                  </>
                }
                description={item.content}
              />
            </List.Item>
          )}
        />
      </main>
      <GradeReviewConversationFooter isFinal={isFinal} />
    </Space>
  );
}
