import {Button, Input, message} from "antd";
import React, {useState} from "react";
import * as constant from "../utilities/constant";
import {json} from "react-router-dom";

function GetAuthor() {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('噜噜噜');

    function handleSearchAuthor() {
        fetch(`${constant.MICRO_BACKEND}/getAuthor?name=${bookName}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! status: ' + response.status);
                }
                return response.text();  // 或者 .json()，根据后端的返回类型
            })
            .then(data => setAuthor(data))
            .catch(error => console.error('Error fetching the author:', error));
    }

    return (
        <div>
            <h1>欢迎使用微服务查询书籍作者</h1>
            <Input
                placeholder="输入书名"
                value={bookName}
                onChange={e => setBookName(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleSearchAuthor}>搜索！</Button>
            <p>作者是【{author}】</p>
        </div>
    );
}

export default GetAuthor;