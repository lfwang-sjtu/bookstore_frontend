import React, {useEffect, useState} from "react";
import {Button, List, message, Table} from "antd";
import * as constant from "../utilities/constant";
import * as constants from "../utilities/constant";
import {useNavigate} from "react-router-dom";

function CartTable(props) {
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${constant.BACKEND}/getCartItems`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
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
                        props.setCartData(Object.values(json.detail));
                    }
                })
            } else console.log("Net error");
        }).catch((error) => {console.log(error);})
    }, []);

    function cancelCartItem(isbn) {
        const request = {
            "isbn": isbn,
            "userID": props.userInfo.userID,
        };
        fetch(`${constant.BACKEND}/cancelCartItem`,{
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
                    props.setCartData(Object.values(json.detail));
                })
            } else message.info("Oops! Network Error!");
        }).catch((error) => {console.log(error);})
    }
    function makeOrder() {
        const request = {
            "userID": props.userInfo.userID,
        };
        if (props.userInfo.userID === null) {
            message.error("userID is " + props.userInfo.userID);
        } else {
            // todo
            fetch(`${constant.BACKEND}/sendOrder`,{
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
                    navigate("/success");
                } else message.info("Oops! Network Error!");
            }).catch((error) => {console.log(error);})
        }
    }

    const { cartData, bookData } = props;
    const data = cartData.map((item) => ({ key: item.isbn, ...item }));
    const columns = [
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                const book = Object.values(bookData).find((ebook) => ebook.isbn === record.isbn);
                return <span>{book.name}</span>;
            },
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                const book = Object.values(bookData).find((ebook) => ebook.isbn === record.isbn);
                return <span>{book.price} 元</span>;
            },
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
        {
            title: '数量',
            dataIndex: 'bookAmount',
            key: 'bookAmount',
        },
        {
            title: '剩余',
            dataIndex: 'inventory',
            key: 'inventory',
            render: (text, record) => {
                const book = Object.values(bookData).find((ebook) => ebook.isbn === record.isbn);
                return <span>{book.inventory} 本</span>;
            },
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => cancelCartItem(record.isbn)}>取消</Button>
            ),
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <Button
                type={"primary"}
                onClick={()=>{
                    makeOrder()
                }}
            >下单！</Button>
        </div>
    );
}
export default CartTable;