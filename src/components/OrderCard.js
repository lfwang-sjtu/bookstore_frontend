import React, {useEffect, useState} from "react";
import Title from "antd/es/typography/Title";
import {Card, List, Table} from "antd";
import * as constant from "../utilities/constant";

function OrderCard(props) {
    const columns = [
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                const book = Object.values(props.bookData).find((ebook) => ebook.isbn === record.isbn);
                if (book == null) return <span>此书已被删</span>;
                else return <span>{book.name}</span>;
            },
        },
        {
            title: '价格',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
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
    ];
    const data = props.order.orderItems.map((item) => ({ key: item.isbn, ...item }));

    const date = new Date(props.order.timestamp);
    const formattedDate = date.toLocaleString();

    return (
        <Card
            title={"订单ID:" + props.order.orderID + ", 下单日期" + formattedDate}
        >
            <Table columns={columns} dataSource={data} pagination={false}/>
        </Card>
    )
}

export default OrderCard;