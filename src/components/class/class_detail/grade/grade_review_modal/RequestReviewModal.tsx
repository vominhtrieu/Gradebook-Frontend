import { Form, Input, message, Modal, Select } from "antd";
import GradeReviewModalProps from "./GradeReviewModalProps";
import studentGradeRules from "../../../../../form-rules/studentGrade";
import "./index.css";
import requestReviewHandler from "../../../../../handlers/requestReviewHandler";
import { useParams } from "react-router-dom";
import responsibleTeacherRules from "../../../../../form-rules/responsibleTeacher";

interface RequestReviewModalProps extends GradeReviewModalProps {
  gradeDetailId: number;
  gradeStructureName: string;
  gradeStructureGrade: number;
  currentGrade: number;
  teachers: any;
  handleTransferToRequestedState: () => void;
}

export default function RequestReviewModal({
  isModalVisible,
  handleCancel,
  maximumGrade,
  gradeDetailId,
  gradeStructureName,
  gradeStructureGrade,
  currentGrade,
  teachers,
  handleTransferToRequestedState,
}: RequestReviewModalProps) {
  const { id } = useParams<any>();
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        const requestReviewSuccessful = await requestReviewHandler(
          id,
          gradeDetailId,
          values
        );

        if (requestReviewSuccessful) {
          form.resetFields();
          handleCancel();
          handleTransferToRequestedState();
        }
      })
      .catch(errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0]);
      });
  };

  return (
    <Modal
      title="Request a grade review"
      className="review-grade-modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="review-grade-modal-wrap"
      okText="Request"
      closable={false}
      centered
    >
      <p>Teacher will be notified and can check your request.</p>
      <ul className="information-list">
        <li className="information-item">
          <p className="information-item_title">Composition name</p>
          <div className="information-item_description">
            {gradeStructureName}
          </div>
        </li>
        <li className="information-item">
          <p className="information-item_title">Composition structure</p>
          <div className="information-item_description">
            {gradeStructureGrade}
          </div>
        </li>
        <li className="information-item">
          <p className="information-item_title">Your current grade</p>
          <div className="information-item_description">
            {currentGrade}/{maximumGrade}
          </div>
        </li>
      </ul>
      <Form form={form}>
        <p className="information-item_title">Responsible teacher</p>
        <Form.Item name="teacherIndex" rules={responsibleTeacherRules}>
          <Select style={{ width: "100%" }} defaultValue="-- Select --">
            {teachers.map((teacher: any, index: number) => (
              <Select.Option key={index} value={index}>
                {teacher.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <p className="information-item_title">Your expectation grade</p>
        <Form.Item name="expectationGrade" rules={studentGradeRules}>
          <Input placeholder="Expectation grade" />
        </Form.Item>
        <p className="information-item_title">Your explanation message</p>
        <Form.Item name="explanationMessage">
          <Input.TextArea placeholder="Explanation message" autoSize />
        </Form.Item>
      </Form>
    </Modal>
  );
}
