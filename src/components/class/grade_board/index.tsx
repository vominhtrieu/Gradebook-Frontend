/* eslint-disable react-hooks/exhaustive-deps */
import {message, Table} from "antd";
import GradeBoardGradeCell from "./GradeBoardGradeCell";
import GradeBoardStudentCell from "./GradeBoardStudentCell";
import GradeBoardGradeColumnHeader from "./GradeBoardGradeColumnHeader";
import "./index.css";
import GradeBoardAverageRowHeader from "./GradeBoardAverageRowHeader";
import GradeBoardOverallColumnHeader from "./GradeBoardOverallColumnHeader";
import GradeBoardOverallGradeCell from "./GradeBoardOverallGradeCell";
import GradeBoardButtonContainer from "./GradeBoardButtonContainer";
import {useContext, useEffect, useState} from "react";
import {getData} from "../../../handlers/api";
import {MainContext} from "../../../contexts/main";

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
];

interface GradeBoardProps {
  classId: number;
  students: object[]
}

export default function GradeBoard({classId, students} : GradeBoardProps) {
  const [gradeColumns, setGradeColumns] = useState([]);

  const mainContext = useContext(MainContext);

  useEffect(() => {
    const fetchData = () => {
      getData(`/classrooms/${classId}/grade-structures`)
          .then((gradeStructure: any) => {
            gradeStructure.forEach((item: any) => {
              columns.push({
                title: () => {
                  return (
                      <GradeBoardGradeColumnHeader
                          title={item.name}
                          detail={item.grade}
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
            })
            });
            columns.push({ title: "", key: "8" });
            mainContext.setReloadNeeded(false);
          })
          .catch(() => message.error("Something went wrong!"));
    };

    fetchData();
    setGradeColumns(columns);
  }, [])

  return (
    <>
      <GradeBoardButtonContainer students={students} />
      <Table columns={[...gradeColumns]} dataSource={data} tableLayout="fixed" bordered />
    </>
  );
}
