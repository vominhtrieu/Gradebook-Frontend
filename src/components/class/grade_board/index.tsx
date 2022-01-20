import { message, Table } from "antd";
import GradeBoardGradeCell from "./GradeBoardGradeCell";
import GradeBoardStudentCell from "./GradeBoardStudentCell";
import GradeBoardGradeColumnHeader from "./GradeBoardGradeColumnHeader";
import "./index.css";
import GradeBoardOverallColumnHeader from "./GradeBoardOverallColumnHeader";
import GradeBoardOverallGradeCell from "./GradeBoardOverallGradeCell";
import GradeBoardButtonContainer from "./GradeBoardButtonContainer";
import { useContext, useEffect, useState } from "react";
import { getData } from "../../../handlers/api";
import { MainContext } from "../../../contexts/main";

interface DataSourceProps {
    key: number;
    name: {
        studentId: string;
        studentName: string;
    };
    overall: number;
    grades: number[];
}

let totalMaxGrade = 0;

const columns: any = [
    {
        title: "",
        width: 180,
        dataIndex: "name",
        fixed: "left",
        key: "name",
        render: (text: any, record: any, index: any) => {
            return (
                <GradeBoardStudentCell
                    studentId={text.studentId}
                    studentName={text.studentName}
                />
            );
        },
    },
    {
        title: () => {
            return <GradeBoardOverallColumnHeader />;
        },
        width: 80,
        key: "overall",
        dataIndex: "overall",
        render: (text: any, record: any) => {
            let total = 0;
            record.grades.forEach((grade: number) => {
                total += grade;
            });
            return (
                <GradeBoardOverallGradeCell
                    overallGrade={`${((total * 100) / totalMaxGrade).toPrecision(4)}%`}
                />
            );
        },
    },
];

const data: DataSourceProps[] = [];

export default function GradeBoard({classId}: any) {
    const [gradeColumns, setGradeColumns] = useState(columns);
    const [dataSource, setDataSource] = useState(data);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const mainContext = useContext(MainContext);

    useEffect(() => {
        mainContext.setReloadNeeded(true);
    }, [mainContext])

    useEffect(() => {
        if (mainContext.reloadNeeded) {
            setLoading(mainContext.reloadNeeded);
        }
    }, [mainContext.reloadNeeded]);

    useEffect(() => {
        if (loading || !mainContext.reloadNeeded) {
            return;
        }
        mainContext.setReloadNeeded(false);
        setLoading(true);
        const tempColumns: any = [...columns];
        const tempDataSource: any = [...data];

        const fetchData = () => {
            getData(`/classrooms/${classId}/grade-structures`)
                .then((gradeStructure: any) => {
                    const promises: any = [];
                    gradeStructure
                        .reverse()
                        .forEach((gradeItem: any, gradeStructureIndex: number) => {
                            totalMaxGrade += gradeItem.grade;
                            promises.push(getData(
                                `/classrooms/${classId}/grade-board?gradeStructureId=${gradeItem.id}`
                            ).then(data => {
                                for (let i = 0; i < tempDataSource.length; i++) {
                                    if (data) {
                                        const gradeItem = data.find(
                                            (e: any) =>
                                                e.studentId === tempDataSource[i].name.studentId
                                        );
                                        tempDataSource[i].grades.push(
                                            gradeItem ? gradeItem.grade : 0
                                        );
                                    }
                                }
                            }));

                            tempColumns.push({
                                title: () => {
                                    return (
                                        <GradeBoardGradeColumnHeader
                                            gradeStructure={gradeItem}
                                            classId={classId}
                                        />
                                    );
                                },
                                width: 180,
                                dataIndex: "grades",
                                key: "grade",
                                render: (text: any, record: any, index: any) => {
                                    return (
                                        <GradeBoardGradeCell
                                            studentId={record.name.studentId}
                                            gradeStructureId={gradeItem.id}
                                            classId={classId}
                                            value={
                                                tempDataSource[index].grades[gradeStructureIndex]
                                            }
                                        />
                                    );
                                },
                            });
                        });
                    Promise.all(promises).then(() => {
                        setGradeColumns(() => [...tempColumns]);
                        setDataSource(() => [...tempDataSource]);
                        setLoading(false)
                    });
                })
                .catch(() => message.error("Something went wrong!"));
        };

        getData(`/classrooms/${classId}/grade-board-student`)
            .then(students => {
                setStudents(students);
                students.forEach((student: any, index: number) => {
                    tempDataSource.push({
                        key: index + 1,
                        name: {
                            studentId: student.studentId,
                            studentName: student.name,
                        },
                        overall: 50,
                        grades: [],
                    });
                });
                fetchData();
            })
            .catch(() => message.error("Something went wrong!"));
    }, [loading, mainContext, classId]);

    return (
        <>
            <GradeBoardButtonContainer classId={classId} students={students} />
            <Table
                columns={[...gradeColumns]}
                pagination={false}
                scroll={{x: "max-content"}}
                loading={loading}
                dataSource={[...dataSource]}
                bordered
            />
        </>
    );
}
