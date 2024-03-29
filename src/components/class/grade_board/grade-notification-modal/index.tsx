import { Modal, Tooltip } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useState } from "react";
import "./index.css";

export default function GradeNotificationModal({markFinal, isFinal}: any) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        if (isFinal) {
            return;
        }
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
            <Tooltip title={isFinal ? "This column is final" : "Mark this column as final"}>
                <Checkbox className="finalization-checkbox" checked={isFinal} style={{marginRight: 5}}
                          onClick={showModal} />
            </Tooltip>
            <Modal
                title="Mark this column is final"
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
