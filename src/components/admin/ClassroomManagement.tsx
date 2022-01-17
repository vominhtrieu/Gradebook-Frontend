import { Input, message, Table, Tag, } from 'antd';
import React, { useEffect } from 'react';
import { getData } from "../../handlers/api";


export default function ClassroomManagement() {
    const [classrooms, setClassrooms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchString, setSearchString] = React.useState<any>("");
    const [lastSearchString, setLastSearchString] = React.useState<any>(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Teachers',
            dataIndex: 'teachers',
            key: 'teachers',
            render: (teachers:any)=>(
                <>
                    {teachers.map((teacher:any) => {
                        return (
                            <Tag key={teacher}>
                                {teacher}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    useEffect(() => {
        if (loading || searchString === lastSearchString) {
            return;
        }
        setLoading(true);
        getData("/admin/classrooms?q=" + searchString)
            .then((data: any) => {
                setLastSearchString(searchString);
                setLoading(false);
                setClassrooms(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [loading, lastSearchString, searchString])

    return (
        <Table dataSource={classrooms} columns={columns} bordered
               title={() => (
                   <div style={{display: "flex"}}>
                       <h3 style={{padding: 0, margin: 0}}>Classroom Management</h3>
                       <Input style={{marginLeft: "auto", height: 30, maxWidth: 300}} value={searchString}
                              onChange={(e) => setSearchString(e.target.value)}
                              placeholder="Search..." />
                   </div>
               )} loading={loading} />
    );
};
