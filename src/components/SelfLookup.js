import {Button, DatePicker, Table} from "antd";
import Title from "antd/es/typography/Title";
import React, {useState} from "react";
import * as constant from "../utilities/constant";

function SelfLookup(props) {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [selfLookup, setSelfLookup] = useState(null);

    let sortedBook = [];
    if (selfLookup !== null) {
        sortedBook = [...selfLookup[0]].sort((a, b) => b.num - a.num);
    }

    const columns = [
        {
            title: 'Book Name',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Num',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
    ];

    function handleLookup() {
        if (start && end) {
            const request = {
                "userID": props.userInfo.userID,
                "start": start.toISOString(),
                "end": end.toISOString()
            }
            fetch(`${constant.BACKEND}/selfLookup`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(request)
            }).then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        console.log(json.detail);
                        if (json.detail != null) {
                            setSelfLookup((Object.values(json.detail)));
                            console.log(selfLookup);
                        }
                    })
                } else console.log("Net error");
            }).catch((error) => {console.log(error);});
        }
    }

    return(
        <div>
            <Button onClick={handleLookup}>统计我的</Button>
            <DatePicker
                placeholder="选择开始日期"
                style={{ marginBottom: '16px', marginRight: '8px' }}
                value={start}
                onChange={date => setStart(date)}
            />
            <DatePicker
                placeholder="选择结束日期"
                style={{ marginBottom: '16px', marginRight: '8px' }}
                value={end}
                onChange={date => setEnd(date)}
            />
            {selfLookup && (
                <div>
                    <Title level={3}>Book Information</Title>
                    <Table dataSource={sortedBook} columns={columns} pagination={true} />
                    <Title level={4}>Total Num: {selfLookup[1]}本书</Title>
                    <Title level={4}>Total Money: {selfLookup[2]}元</Title>
                    <Title level={4}>您好这里是隐藏彩蛋</Title>
                </div>
            )}
        </div>
    )
}
export default SelfLookup;