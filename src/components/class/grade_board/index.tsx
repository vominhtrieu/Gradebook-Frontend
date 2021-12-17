import { Table } from "antd";
import GradeBoardGradeCell from "./GradeBoardGradeCell";
import GradeBoardStudentCell from "./GradeBoardStudentCell";
import GradeBoardGradeColumnHeader from "./GradeBoardGradeColumnHeader";
import "./index.css";
import GradeBoardAverageRowHeader from "./GradeBoardAverageRowHeader";
import GradeBoardOverallColumnHeader from "./GradeBoardOverallColumnHeader";
import GradeBoardOverallGradeCell from "./GradeBoardOverallGradeCell";
import GradeBoardButtonContainer from "./GradeBoardButtonContainer";

const columns: any = [
  {
    title: "",
    width: 270,
    dataIndex: "name",
    fixed: "left",
    key: "name",
    render: (text: any, record: any, index: any) => {
      if (index === 0) {
        return <GradeBoardAverageRowHeader />;
      } else {
        return (
          <GradeBoardStudentCell
            studentId="1234"
            studentName="TranabcdefghBac HoabcdngDabcdt"
          />
        );
      }
    },
  },
  {
    title: () => {
      return <GradeBoardOverallColumnHeader />;
    },
    width: 129,
    key: "overall",
    render: () => {
      return <GradeBoardOverallGradeCell overallGrade={"50%"} />;
    },
  },
  {
    title: () => {
      return (
        <GradeBoardGradeColumnHeader
          title="Lorem ipsum dolor abcdefgh"
          detail="4"
        />
      );
    },
    width: 129,
    dataIndex: "age",
    key: "age",
    render: (text: any, record: any, index: any) => {
      if (index === 0) {
        return <GradeBoardGradeCell readOnly />;
      } else {
        return <GradeBoardGradeCell />;
      }
    },
  },

  { title: "", key: "8" },
];

const data: any = [];
for (let i = 0; i < 12; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export default function GradeBoard2() {
  return (
    <>
      <GradeBoardButtonContainer />
      <Table columns={columns} dataSource={data} tableLayout="fixed" bordered />
    </>
  );
}
