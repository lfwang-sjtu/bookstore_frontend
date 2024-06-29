import {Button, DatePicker, Input, List, message} from "antd";
import OrderCard from "./OrderCard";
import React, {useState} from "react";
import * as constant from "../utilities/constant";
import {useNavigate} from "react-router-dom";

function OrderSearchList(props) {
    const [keyword, setKeyword] = useState('');
    const [orderData, setOrderData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 3;

    const navigate = useNavigate();

    function handleSubmit() {
        if (props.userInfo === null || props.userInfo.userID === undefined)
            message.info("please login first");
        if (startDate && endDate) {
            const request = {
                "userID": props.userInfo.userID,
                "keyword": keyword,
                "start": startDate.toISOString(),
                "end": endDate.toISOString(),
                "pageIndex": pageIndex,
                "pageSize": pageSize
            };
            fetch(`${constant.BACKEND}/searchOrdersWithPage`, {
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
                    setOrderData([]);
                    res.json().then((json) => {
                        if (json.detail != null) {
                            console.log(pageIndex);
                            setOrderData((Object.values(json.detail)));
                        } else {
                            message.info("已经没啦，返回第一页～");
                            setPageIndex(-1);
                        }
                    })
                } else console.log("Net error");
            }).catch((error) => {console.log(error);});
        }
    };

    function handleNextPage() {
        setPageIndex(prevPageIndex => prevPageIndex + 1);
        handleSubmit();
    }

    function handleSearch() {
        setPageIndex(0);
        handleSubmit();
    }

    return (
        <div>
            <Input
                placeholder="输入关键词搜索书籍"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
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
            <Button type="default" onClick={handleNextPage}>下一页</Button>
            <List
                dataSource={orderData}
                // dataSource={orderData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))}
                renderItem={item => {
                    return (
                        <OrderCard order={item} bookData={props.bookData}/>
                    );
                }}
            ></List>
            <h1>彩蛋～</h1>
        </div>
    );
}
export default OrderSearchList;