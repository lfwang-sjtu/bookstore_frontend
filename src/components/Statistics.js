import React, {useEffect, useState} from "react";
import {Button, DatePicker, message, Table} from "antd";
import * as constant from "../utilities/constant";
import {useNavigate} from "react-router-dom";

function Statistics() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const sortedData = [...data].sort((a, b) => b.number - a.number);

    const [startDateUser, setStartDateUser] = useState(null);
    const [endDateUser, setEndDateUser] = useState(null);
    const [userdata, setUserdata]=  useState([]);
    const sortedUserData = [...userdata].sort((a, b) => b.total - a.total);

    const navigate = useNavigate();

    const columns = [
        {
            title: '类别',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '购买数量',
            dataIndex: 'number',
            key: 'number',
        },
    ];

    const columnsUser = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '总消费额',
            dataIndex: 'total',
            key: 'total',
        },
    ];

    function handleSearch() {
        if (startDate && endDate) {
            const request = {
                "start": startDate.toISOString(),
                "end": endDate.toISOString()
            };
            fetch(`${constant.BACKEND}/typeStatistic`, {
                method:'POST',
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
                        console.log(json.detail);
                        if (json.detail != null) {
                            setData((Object.values(json.detail)));
                        }
                    })
                } else console.log("Net error");
            }).catch((error) => {console.log(error);});
        }
    }

    function handleSearchUser() {
        if (startDateUser && endDateUser) {
            const request = {
                "start": startDateUser.toISOString(),
                "end": endDateUser.toISOString()
            };
            fetch(`${constant.BACKEND}/userStatistic`, {
                method:'POST',
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
                        console.log(json.detail);
                        if (json.detail != null) {
                            setUserdata((Object.values(json.detail)));
                        }
                    })
                } else console.log("Net error");
            }).catch((error) => {console.log(error);});
        }
    }

    return (
        <div>
            <h1>书籍销量统计</h1>
            <DatePicker
                placeholder="选择开始日期"
                style={{ marginBottom: '16px', marginRight: '8px' }}
                value={startDate}
                onChange={date => setStartDate(date)}
            />
            <DatePicker
                placeholder="选择结束日期"
                style={{ marginBottom: '16px', marginRight: '8px' }}
                value={endDate}
                onChange={date => setEndDate(date)}
            />
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <Table
                columns={columns}
                dataSource={sortedData}
                pagination={false} // 可以根据需要设置是否显示分页器
            />
            <h1>用户消费统计</h1>
            <DatePicker
                placeholder="选择开始日期"
                style={{ marginBottom: '16px', marginRight: '8px' }}
                value={startDateUser}
                onChange={date => setStartDateUser(date)}
            />
            <DatePicker
                placeholder="选择结束日期"
                style={{ marginBottom: '16px', marginRight: '8px' }}
                value={endDateUser}
                onChange={date => setEndDateUser(date)}
            />
            <Button type="primary" onClick={handleSearchUser}>搜索</Button>
            <Table
                columns={columnsUser}
                dataSource={sortedUserData}
                pagination={false} // 可以根据需要设置是否显示分页器
            />
        </div>
    )
}

export default Statistics;