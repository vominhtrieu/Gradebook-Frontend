import { List, Modal } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useState } from "react";
import GradeListItem from "./GradeListItem";
import "./index.css";
import PrivateCommentBox from "./PrivateCommentBox";

export default function GradeNotificationModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const data = [
    {
      title: "TranabcdefghBac HoabcdngDabcdt",
    },
  ];

  return (
    <>
      <Checkbox className="finalization-checkbox" onClick={showModal} />
      <Modal
        title="Update n grade"
        className="grade-notification-modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="grade-notification-modal-wrap"
        okText="Return"
        centered
      >
        {/* 
          Students have had grade before.
          <p>The student will be notified that the grade has changed.</p> 
        */}
        {/* Students haven't had grade before. */}
        <p>Student will be notified and can check any grade you've left.</p>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <>
              <GradeListItem
                studentName="TranabcdefghBac12345"
                currentGrade={90}
                previouslyGrade={80}
              />
              <GradeListItem
                studentName="TranabcdefghBac12345"
                currentGrade={90}
              />
            </>
          )}
        />
        <PrivateCommentBox />
      </Modal>
    </>
  );
}
