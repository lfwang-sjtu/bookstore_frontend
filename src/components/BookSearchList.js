import React, {useEffect, useState} from "react";
import {Input, List} from "antd";
import BookCard from "./BookCard";
import * as constant from "../utilities/constant";
function BookSearchList() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        // 发送请求到后端接口
        fetch(`${constant.BACKEND}/searchBook?keyword=${searchKeyword}`, {
            credentials: 'include',
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then(
                        (json) => {
                            setBookData(Object.values(json.detail));
                        }
                    )
                }
            })
            .catch(error => {
                console.error('Error fetching book list:', error);
            });
    }, [searchKeyword]);

    return (
        <div>
            <Input
                placeholder="输入关键词搜索书籍"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{ marginBottom: '16px' }}
            />

            <List
                dataSource={bookData}
                grid={{ gutter: 16, column: 4 }}
                renderItem={item => (
                    <List.Item>
                        <BookCard item={item} />
                    </List.Item>
                )}
            />
        </div>
    );
}
export default BookSearchList;