import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import GradeReviewConversationFooter from "./GradeReviewConversationFooter";
import GradeReviewConversationHeader from "./GradeReviewConversationHeader";

const listData: any = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    title: `ant design part ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "abc",
  });
}

export default function GradeReviewConversation() {
  return (
    <Space className="grade-review-conversation">
      <GradeReviewConversationHeader />
      <main className="grade-review-conversation_body">
        <List
          className="comment-list"
          dataSource={listData}
          header={
            <div className="comment-list_header">
              <UserOutlined
                style={{
                  fontSize: "19px",
                }}
              />
              <span className="comment-quantity">
                {listData.length} private comments
              </span>
            </div>
          }
          renderItem={(item: any) => (
            <List.Item className="comment-item">
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <>
                    {item.title} <span className="comment-date">Date</span>
                  </>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </main>
      <GradeReviewConversationFooter />
    </Space>
  );
}
