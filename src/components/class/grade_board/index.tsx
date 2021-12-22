import { message, Table } from "antd";
import GradeBoardGradeCell from "./GradeBoardGradeCell";
import GradeBoardStudentCell from "./GradeBoardStudentCell";
import GradeBoardGradeColumnHeader from "./GradeBoardGradeColumnHeader";
import "./index.css";
import GradeBoardAverageRowHeader from "./GradeBoardAverageRowHeader";
import GradeBoardOverallColumnHeader from "./GradeBoardOverallColumnHeader";
import GradeBoardOverallGradeCell from "./GradeBoardOverallGradeCell";
import GradeBoardButtonContainer from "./GradeBoardButtonContainer";
import { useEffect, useState } from "react";
import { getData } from "../../../handlers/api";

interface GradeBoardProps {
    classId: number;
    students: object[]
}

interface DataSourceProps {
    key: number,
    name: {
        studentId: string,
        studentName: string
    },
    overall: number,
    grades: number[]
}

const columns: any = [
    {
        title: "",
        width: 180,
        dataIndex: "name",
        fixed: "left",
        key: "name",
        render: (text: any, record: any, index: any) => {
            if (index === 0) {
                return <GradeBoardAverageRowHeader />;
            } else {
                return (
                    <GradeBoardStudentCell
                        studentId={text.studentId}
                        studentName={text.studentName}
                    />
                );
            }
        },
    },
    {
        title: () => {
            return <GradeBoardOverallColumnHeader />;
        },
        width: 80,
        key: "overall",
        dataIndex: "overall",
        render: (text: any) => {
            return <GradeBoardOverallGradeCell overallGrade={`${text}%`} />;
        },
    },
];

const data: DataSourceProps[] = [
    {
        key: 0,
        name: {
            studentId: "",
            studentName: "Name"
        },
        overall: 50,
        grades: []
    }
]

interface GradeBoardProps {
    classId: number;
    students: object[]
}

export default function GradeBoard({classId, students}: GradeBoardProps) {
    const [gradeColumns, setGradeColumns] = useState(columns);
    const [dataSource, setDataSource] = useState(data);

    useEffect(() => {
        const tempColumns = [...columns];
        const tempDataSource = [...dataSource];
        students.forEach((student: any, index: number) => {
            tempDataSource.push({
                key: index + 1,
                name: {
                    studentId: student.studentId,
                    studentName: student.name
                },
                overall: 50,
                grades: []
            })
        })
        console.log(tempDataSource)
        const fetchData = () => {
            getData(`/classrooms/${classId}/grade-structures`)
                .then((gradeStructure: any) => {
                    gradeStructure.forEach((gradeItem: any, gradeStructureIndex: number) => {
                        getData(`/classrooms/${classId}/grade-board?gradeStructureId=${gradeItem.id}`).then((data) => {
                            data.forEach((item: any) => {
                                tempDataSource[gradeStructureIndex].grades.push(item.grade);
                            })
                        });
                        tempColumns.push({
                            title: () => {
                                return (
                                    <GradeBoardGradeColumnHeader gradeStructure={gradeItem} classId={classId} />
                                )
                            },
                            width: 120,
                            dataIndex: "grades",
                            key: "grade",
                            render: (text: any, record: any, index: any) => {
                                if (index === 0) {
                                    return <GradeBoardGradeCell readOnly />;
                                } else {
                                    return (
                                        <GradeBoardGradeCell
                                            studentId={record.name.studentId}
                                            gradeStructureId={gradeItem.id}
                                            classId={classId}
                                            value={text[index - 1]}
                                        />
                                    );
                                }
                            },
                        });
                    });
                    setTimeout(() => {
                        setGradeColumns(tempColumns);
                        setDataSource(tempDataSource);
                    }, 500);
                }).catch(() => message.error("Something went wrong!"));
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <GradeBoardButtonContainer classId={classId} students={students} />
            <Table columns={[...gradeColumns]} pagination={false}
                   dataSource={[...dataSource]} bordered />
        </>
    );
}
