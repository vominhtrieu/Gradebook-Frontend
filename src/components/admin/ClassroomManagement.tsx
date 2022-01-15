import { MinusOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, } from 'antd';
import React, { useEffect } from 'react';
import { getData, postData } from "../../handlers/api";


export default function ClassroomManagement() {
    const [classrooms, setClassrooms] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const blockUser = (record: any) => {
        postData("/admin/users/block", {
            id: record.id
        }).then(() => {
            message.success("Success");
            setClassrooms((users:any)=>{
                return users.map((user:any)=>user.id === record.id ?{...user, blocked: true}:user)
            })
        })
    }
    console.log(classrooms);

    const unBlockUser = (record: any) => {
        postData("/admin/users/unblock", {
            id: record.id
        }).then(() => {
            message.success("Success");
            setClassrooms((users:any)=>{
                return users.map((user:any)=>user.id === record.id ?{...user, blocked: false}:user)
            })
        })
    }

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
        getData("/admin/classrooms")
            .then((data: any) => {
                setLoading(false);
                setClassrooms(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [])

    return (
        <Table dataSource={classrooms} columns={columns} bordered
               title={() => <h3 style={{padding: 0, margin: 0}}>Classroom Management</h3>} loading={loading} />
    );
};
