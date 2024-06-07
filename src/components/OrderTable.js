import React, {useEffect} from "react";
import * as constants from "../utilities/constant";
import {List, message} from "antd";
import OrderCard from "./OrderCard";
import {useNavigate} from "react-router-dom";

function OrderTable(props) {
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${constants.BACKEND}/getOrders`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({"userID": props.userInfo.userID})
        }).then((res) => {
            if (res.status === 403) {
                message.info("Please login first");
                navigate("/login");
            }
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.detail);
                    if (json.detail != null) {
                        props.setOrderData(Object.values(json.detail));
                    }
                })
            } else console.log("Net error");
        }).catch((error) => {console.log(error);})
    }, [])

    return (
        <div>
            <List
                // dataSource={props.orderData}
                dataSource={props.orderData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))}
                renderItem={item => {
                    console.log(item);
                    return (
                        <OrderCard order={item} bookData={props.bookData}/>
                    );
                }}
            ></List>
        </div>
    );
}
export default OrderTable;