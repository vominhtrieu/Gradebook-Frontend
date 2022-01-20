import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import addGradeReviewCommentHandler from "../../../../../handlers/addGradeReviewCommentHandler";

interface GradeReviewConversationFooterProps {
  isFinal: boolean;
}

export default function GradeReviewConversationFooter({
  isFinal,
}: GradeReviewConversationFooterProps) {
  const { id, gradeDetailId } = useParams<any>();
  const [comment, setComment] = useState("");

  const handleOnClick = async () => {
    if (comment === "") {
      return message.info("Please input your comment!");
    }
    await addGradeReviewCommentHandler(id, gradeDetailId, comment);
    setComment("");
  };

  return (
    <footer className="grade-review-conversation_footer">
      <Avatar icon={<UserOutlined />} />
      <Input.Group>
        <Input.TextArea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add private comment"
          disabled={isFinal}
          maxLength={255}
          autoSize
        />
        <Button
          shape="circle"
          icon={<SendOutlined />}
          onClick={handleOnClick}
          disabled={isFinal}
        />
      </Input.Group>
    </footer>
  );
}
