import React from "react";
import {Button, Table} from "antd";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
    }
];

const data = [
    {
        key: '1',
        name: '小王子',
        amount: 1,
        price: 8.89,
        action: 'Delete',
    },
    {
        key: '2',
        name: '老人与海',
        amount: 1,
        price: 27.80,
        action: 'Delete',
    },
];
function CartTable() {
    return (
        <Table columns={columns} dataSource={data}/>
    );
}
export default CartTable;