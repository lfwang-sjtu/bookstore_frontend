import React, {useEffect, useState} from "react";
import {json, useNavigate} from "react-router-dom";
import * as constant from "../utilities/constant";
import {Button, List, message, Table} from "antd";

function AdminUserTable(props) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const data = userData.map((item) => ({ key: item.userID, ...item }));
    const normalUser = userData
        .filter(item => item.type !== 2)
        .map(item => ({ key: item.userID, ...item }));
    const adminUser = userData
        .filter(item => item.type === 2)
        .map(item => ({ key: item.userID, ...item }));

    useEffect(
        () => {
            fetch(`${constant.BACKEND}/getUsers`, {
                credentials: 'include',
            })
                .then((res) => {
                    if (res.status === 403) {
                        message.info("Please login first");
                        navigate("/login");
                    }
                    if (res.ok) {
                        res.json().then(
                            (json) => {
                                console.log(json);
                                setUserData(Object.values(json.detail));
                            }
                        )
                    } else {
                        console.log("Net error");
                    }
                }).catch((error)=>{console.log("Parse error" + error)});
        },[]
    )
    function blockUser(userID) {
        const request = {
            "userID": userID
        };
        fetch(`${constant.BACKEND}/blockUser`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(request)
        }).then((res) => {
            if (res.status === 403) {
                message.info("Please login first");
                navigate("/login");
            }
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.msg);
                    setUserData(Object.values(json.detail));
                })
            } else message.info("Oops! network error");
        }).catch((error) => {console.log(error);})
    }
    function unblockUser(userID) {
        const request = {
            "userID": userID
        };
        fetch(`${constant.BACKEND}/unblockUser`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(request)
        }).then((res) => {
            if (res.status === 403) {
                message.info("Please login first");
                navigate("/login");
            }
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.msg);
                    setUserData(Object.values(json.detail));
                })
            } else message.info("Oops! network error");
        }).catch((error) => {console.log(error);})
    }

    const columnsNormal = [
        {
            title: '用户ID',
            dataIndex: 'userID',
            key: 'userID',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button
                        onClick={() => {
                            blockUser(record.userID)
                        }}
                    >封禁</Button>
                    <Button
                        onClick={() => {
                            unblockUser(record.userID)
                        }}
                    >取消封禁</Button>
                </div>
            )
        },
    ];

    const columnsAdmin = [
        {
            title: '用户ID',
            dataIndex: 'userID',
            key: 'userID',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户类型',
            dataIndex: 'type',
            key: 'type',
        }
    ];
    return (
        <div>
            <h1>普通用户</h1>
            <Table columns={columnsNormal} dataSource={normalUser} pagination={false}/>
            <h1>管理员用户</h1>
            <Table columns={columnsAdmin} dataSource={adminUser} pagination={false}/>
        </div>
    )
}
export default AdminUserTable;