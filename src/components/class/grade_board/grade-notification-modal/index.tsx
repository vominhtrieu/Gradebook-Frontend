import { Modal } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useState } from "react";
import "./index.css";

export default function GradeNotificationModal({markFinal, isFinal}: any) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        markFinal();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Checkbox className="finalization-checkbox" value={isFinal} onClick={showModal} />
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
                <p>Student will be notified and can check any grade you've left.</p>
            </Modal>
        </>
    );
}
