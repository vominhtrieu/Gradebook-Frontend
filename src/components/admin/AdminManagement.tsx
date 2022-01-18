import { Button, Input, message, Table, } from 'antd';
import React, { useEffect } from 'react';
import { getData } from "../../handlers/api";
import NewAdminModal from "./NewAdminModal";


export default function AdminManagement() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchString, setSearchString] = React.useState<any>("");
    const [lastSearchString, setLastSearchString] = React.useState<any>(null);
    const [isCreatingNewAdmin, setIsCreatingNewAdmin] = React.useState(false);

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
        }
    ];

    useEffect(() => {
        if (loading || searchString === lastSearchString) {
            return;
        }
        getData("/admin/users?role=2&q=" + searchString)
            .then((data: any) => {
                setLastSearchString(searchString);
                setLoading(false);
                setUsers(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }, [loading, lastSearchString, searchString])

    const refresh = () => {
        setLoading(true);
        getData("/admin/users?role=2&q=" + searchString)
            .then((data: any) => {
                setLastSearchString(searchString);
                setLoading(false);
                setUsers(data);
            })
            .catch(() => message.error("Something went wrong!"));
    }
    const closeNewModel = () => {
        setIsCreatingNewAdmin(false);
    }

    return (
        <>
            <NewAdminModal visible={isCreatingNewAdmin} onSuccess={() => {
                refresh();
                closeNewModel();
            }} onCancel={closeNewModel} />
            <Table dataSource={users} columns={columns} bordered
                   title={() => (
                       <div style={{display: "flex"}}>
                           <h3 style={{padding: 0, margin: 0}}>Admin Management</h3>
                           <div style={{marginLeft: "auto", display: "flex", height: 30, maxWidth: 300}}>
                               <Button type="primary" style={{height: 30}}
                                       onClick={() => setIsCreatingNewAdmin(true)}>New</Button>
                               <Input value={searchString}
                                      style={{height: 30, marginLeft: 10}}
                                      onChange={(e) => setSearchString(e.target.value)}
                                      placeholder="Search..." />
                           </div>
                       </div>
                   )}
                   loading={loading} />
        </>
    );
};
