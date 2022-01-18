import { Button, Input, message, Modal, Table, } from 'antd';
import React, { useEffect } from 'react';
import { getData, postData } from "../../handlers/api";
import ChangeStudentIDModal from "./ChangeStudentIDModal";
import Profile from "../profile/Profile";


export default function UserManagement() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isChangingStudentID, setIsChangingStudentID] = React.useState(false);
    const [searchString, setSearchString] = React.useState<any>("");
    const [lastSearchString, setLastSearchString] = React.useState<any>(null);
    const [selectedRecord, setSelectedRecord] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState<any>(null);

    const blockUser = (record: any) => {
        postData("/admin/users/block", {
            id: record.id
        }).then(() => {
            message.success("Success");
            refresh();
        })
    }

    const unBlockUser = (record: any) => {
        postData("/admin/users/unblock", {
            id: record.id
        }).then(() => {
            message.success("Success");
            refresh();
        })
    }

    const changeStudentID = (record: any) => {
        setIsChangingStudentID(true);
        setSelectedRecord(record);
    }

    const closeChangeStudentIDModal = () => {
        setIsChangingStudentID(false);
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
            render: (text: any, user: any) => (
                <b style={{cursor: "pointer", fontWeight: 500}} onClick={() => setSelectedUser(user)}>{text}</b>)
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
                    <Button onClick={() => changeStudentID(record)}>Change Student ID</Button>
                </>
        }
    ];

    const refresh = () => {
        setLoading(true);
        getData("/admin/users?role=1&q=" + searchString)
            .then((data: any) => {
                setLastSearchString(searchString);
                setLoading(false);
                setUsers(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }

    useEffect(() => {
        if (loading || searchString === lastSearchString) {
            return;
        }
        setLoading(true);
        getData("/admin/users?role=1&q=" + searchString)
            .then((data: any) => {
                setLastSearchString(searchString);
                setLoading(false);
                setUsers(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [loading, lastSearchString, searchString])

    return (
        <>
            <Modal visible={selectedUser !== null} footer={null} onCancel={() => setSelectedUser(null)}>
                <Profile id={selectedUser ? selectedUser.id : null} />
            </Modal>
            <ChangeStudentIDModal record={selectedRecord}
                                  visible={isChangingStudentID}
                                  onSuccess={() => {
                                      refresh();
                                      closeChangeStudentIDModal();
                                  }}
                                  onCancel={closeChangeStudentIDModal} />
            <Table dataSource={users} columns={columns} bordered
                   title={() => (
                       <div style={{display: "flex"}}>
                           <h3 style={{padding: 0, margin: 0}}>User Management</h3>
                           <Input style={{marginLeft: "auto", height: 30, maxWidth: 300}} value={searchString}
                                  onChange={(e) => setSearchString(e.target.value)}
                                  placeholder="Search..." />
                       </div>
                   )} loading={loading} />
        </>
    );
};
