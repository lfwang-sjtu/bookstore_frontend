import React, {useEffect} from "react";
import * as constants from "../utilities/constant";
import {List} from "antd";
import OrderCard from "./OrderCard";

function OrderTable(props) {
    useEffect(() => {
        fetch(`${constants.BACKEND}/getOrders`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({"userID": props.userInfo.userID})
        }).then((res) => {
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