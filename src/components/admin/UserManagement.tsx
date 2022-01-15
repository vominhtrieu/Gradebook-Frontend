import { MinusOutlined } from '@ant-design/icons';
import { Button, message, Table, } from 'antd';
import React, { useEffect } from 'react';
import { getData, postData } from "../../handlers/api";


export default function UserManagement() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const blockUser = (record: any) => {
        postData("/admin/users/block", {
            id: record.id
        }).then(() => {
            message.success("Success");
            setUsers((users:any)=>{
                return users.map((user:any)=>user.id === record.id ?{...user, blocked: true}:user)
            })
        })
    }
    console.log(users);

    const unBlockUser = (record: any) => {
        postData("/admin/users/unblock", {
            id: record.id
        }).then(() => {
            message.success("Success");
            setUsers((users:any)=>{
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: "Action",
            dataIndex: "blocked",
            key: "blocked",
            render: (blocked: any, record: any) =>
                <>
                    {
                        blocked ?
                            <Button style={{marginRight: 5}} onClick={() => {
                                unBlockUser(record);
                            }}>Unlock</Button> :
                            <Button danger={true} style={{marginRight: 5}}
                                    onClick={() => {
                                        blockUser(record);
                                    }}>Lock</Button>
                    }
                    <Button>Change Student ID</Button>
                </>
        }
    ];

    useEffect(() => {
        getData("/admin/users")
            .then((data: any) => {
                setLoading(false);
                setUsers(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [])

    return (
        <Table dataSource={users} columns={columns} bordered
               title={() => <h3 style={{padding: 0, margin: 0}}>User Management</h3>} loading={loading} />
    );
};
