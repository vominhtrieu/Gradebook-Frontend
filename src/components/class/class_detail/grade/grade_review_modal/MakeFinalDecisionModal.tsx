import { Form, Input, message, Modal } from "antd";
import { useParams } from "react-router-dom";
import studentGradeRules from "../../../../../form-rules/studentGrade";
import makeFinalDecisionHandler from "../../../../../handlers/makeFinalDecisionHandler";
import GradeReviewModalProps from "./GradeReviewModalProps";
import "./index.css";

interface MakeFinalDecisionModalProps extends GradeReviewModalProps {
  handleMakeFinalDecisionSuccessfully: () => void;
  studentCurrentGrade: number;
  studentExpectationGrade: number;
  gradeDetailId: any;
}

export default function MakeFinalDecisionModal({
  handleMakeFinalDecisionSuccessfully,
  studentCurrentGrade,
  studentExpectationGrade,
  gradeDetailId,
  isModalVisible,
  handleCancel,
}: MakeFinalDecisionModalProps) {
  const { id } = useParams<any>();
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        const makingFinalDecisionSuccessful = await makeFinalDecisionHandler(
          id,
          gradeDetailId,
          values
        );

        if (makingFinalDecisionSuccessful) {
          handleMakeFinalDecisionSuccessfully();
        }
      })
      .catch(errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0]);
      });
  };

  return (
    <Modal
      title="Make final decision for a grade review"
      className="review-grade-modal make-final-decision-modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="review-grade-modal-wrap"
      okText="Decide"
      closable={false}
      centered
    >
      <p>Student will be notified and can check your final decision.</p>
      <ul className="information-list">
        <li className="information-item">
          <p className="information-item_title">Current grade</p>
          <div className="information-item_description">
            {studentCurrentGrade}
          </div>
        </li>
        <li className="information-item">
          <p className="information-item_title">Expectation grade</p>
          <div className="information-item_description">
            {studentExpectationGrade}
          </div>
        </li>
        <Form form={form}>
          <p className="information-item_title">Final grade</p>
          <Form.Item name="finalGrade" rules={studentGradeRules}>
            <Input placeholder="Final grade" />
          </Form.Item>
        </Form>
      </ul>
    </Modal>
  );
}
