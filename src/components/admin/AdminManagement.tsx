import { MinusOutlined } from '@ant-design/icons';
import { Button, message, Table, } from 'antd';
import React, { useEffect } from 'react';
import { getData, postData } from "../../handlers/api";


export default function AdminManagement() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId',
        },
    ];

    useEffect(() => {
        getData("/admin/users?role=2")
            .then((data: any) => {
                setLoading(false);
                setUsers(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [])

    return (
        <Table dataSource={users} columns={columns} bordered
               title={() => <h3 style={{padding: 0, margin: 0}}>Admin Management</h3>} loading={loading} />
    );
};
