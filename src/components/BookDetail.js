import React, {useEffect, useState} from 'react';
import {Descriptions, Button, message, Form, InputNumber, Layout, Menu} from 'antd';
import * as constant from "../utilities/constant";
import HeadBar from "./HeadBar";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {BookOutlined, ShoppingCartOutlined, UnorderedListOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {useNavigate} from "react-router-dom";

function BookDetail(props) {
    const [book, setBook] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        console.log("get book with id=" + props.id);
        fetch(`${constant.BACKEND}/getBook?id=${props.id}`, {
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 403) {
                    message.info("Please login first");
                    navigate("/login");
                }
                if (res.ok) {
                    res.json().then((json) => {
                        if (json.code === 200) {
                            setBook(json.detail);
                            console.log(book);
                        } else {
                            message.info("Request Error");
                        }
                    })
                }
            })
    }, [])
    console.log(props);

    function addCartItem(values) {
        if (props.userInfo === null) {
            message.info("Please login first!");
            return;
        }
        if (values.bookAmount < 1) {
            message.info("inventory not sufficient!");
            return;
        }
        let request = {
            "id":props.id,
            "userID":props.userInfo.userID,
            "bookAmount":values.bookAmount
        };
        console.log(request);
        fetch(`${constant.BACKEND}/addCartItem`, {
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
                    message.info(json.msg);
                })
            }
        }).catch((error) => {console.log("parse error");})
    }


    return (
        <div>
            <div style={{ display: 'flex', gap: '16px'}}>
                <img alt="image" src={book.image} style={{width:"350px", height:"350px"}}/>
                <Descriptions bordered>
                    <Descriptions.Item label={"书名"} span={3}>{book.name}</Descriptions.Item>
                    <Descriptions.Item label={"作者"} span={3}>{book.author}</Descriptions.Item>
                    <Descriptions.Item label={"分类"} span={3}>{book.type}</Descriptions.Item>
                    <Descriptions.Item label={"定价"} span={3}>¥ {book.price}</Descriptions.Item>
                    <Descriptions.Item label={"状态 "} span={3}>有货 库存 {book.inventory}件</Descriptions.Item>
                    <Descriptions.Item label={"作品简介"} span={3}>{book.description}</Descriptions.Item>
                </Descriptions>
            </div>
            <Form
                onFinish={addCartItem}
            >
                <Form.Item name="bookAmount">
                    <InputNumber size="small" min={1} max={book.inventory}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size={"large"} htmlType="submit">
                        加入购物车
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default BookDetail;