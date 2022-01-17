import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Avatar from "antd/lib/avatar/avatar";

export default function GradeReviewConversationFooter() {
  return (
    <footer className="grade-review-conversation_footer">
      <Avatar icon={<UserOutlined />} />
      <Input.Group>
        <Input.TextArea placeholder="Add private comment" autoSize />
        <Button shape="circle" icon={<SendOutlined />} />
      </Input.Group>
    </footer>
  );
}
