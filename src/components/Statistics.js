import React, {useEffect, useState} from "react";
import {Button, DatePicker, message, Table} from "antd";
import * as constant from "../utilities/constant";
import {useNavigate} from "react-router-dom";
import ReactECharts from 'echarts-for-react';

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

    const option = {
        title: {
            text: '书籍类别与销量',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '销量',
                type: 'pie',
                radius: '50%',
                data: sortedData.map(item => ({ value: item.number, name: item.type })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

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

    const option1 = {
        title: {
            text: '用户消费额',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: sortedUserData.map(item => item.username),
            axisLabel: {
                rotate: 45,
                interval: 0
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '消费额',
                type: 'bar',
                data: sortedUserData.map(item => item.total),
                itemStyle: {
                    color: '#5470C6'
                }
            }
        ]
    };

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
            <ReactECharts option={option} />

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
                pagination={false}
            />
            <ReactECharts option={option1} />
        </div>
    )
}

export default Statistics;