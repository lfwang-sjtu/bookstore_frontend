import React, {useEffect, useState} from "react";
import * as constants from "../utilities/constant";
import Title from "antd/es/typography/Title";
import {Button, DatePicker, Input, List, message} from "antd";
import OrderCard from "./OrderCard";
import * as constant from "../utilities/constant";
import {useNavigate} from "react-router-dom";

function AdminOrderTable(props) {
    const [keyword, setKeyword] = useState('');
    const [orderData, setOrderData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 3;

    const navigate = useNavigate();

    const [bookData, setBookData] = useState([]); // List<Book>

    useEffect(
        () => {
            fetch(`${constant.BACKEND}/getBooks`, {
                credentials: 'include',
            }).then((res) => {
                if (res.ok) {
                    res.json().then(
                        (json) => {
                            console.log(json);
                            setBookData(Object.values(json.detail));
                        }
                    )
                } else {
                    console.log("Net error");
                }
            }).catch((error)=>{console.log("Parse error" + error)});
        }, []
    )

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
            fetch(`${constant.BACKEND}/searchAllOrdersWithPage`, {
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
                        console.log("Get Page result!");
                        console.log(json.detail);
                        if (json.detail != null) {
                            setOrderData((Object.values(json.detail)));
                        } else {
                            message.info("哎呀到底啦，再点就回到第一页了");
                            setPageIndex(-1);
                        }
                    })
                } else console.log("Net error");
            }).catch((error) => {console.log(error);});
        }
    }

    function handleSearch() {
        setPageIndex(0);
        handleSubmit();
    }

    function handleNextPage() {
        setPageIndex(prevState => prevState + 1);
        handleSubmit();
    }

    // useEffect(
    //     () => {
    //         fetch(`${constants.BACKEND}/getAllOrders`,)
    //             .then((res) => {
    //                 if (res.ok) {
    //                     res.json().then(
    //                         (json) => {
    //                             console.log(json);
    //                             setOrderData(Object.values(json.detail));
    //                         }
    //                     )
    //                 } else {
    //                     console.log("Net error");
    //                 }
    //             }).catch((error)=>{console.log("Parse error" + error)});
    //     },[]
    // )
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
                renderItem={item => {
                    console.log(item);
                    return (
                        <OrderCard order={item} bookData={bookData}/>
                    );
                }}
            ></List>
            <h1>这是一个彩蛋</h1>
        </div>
    );
}
export default AdminOrderTable;