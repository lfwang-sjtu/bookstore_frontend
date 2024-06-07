import React, {useEffect, useState} from "react";
import {Button, Input, List, message} from "antd";
import BookCard from "./BookCard";
import * as constant from "../utilities/constant";
import {useNavigate} from "react-router-dom";
function BookSearchList() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [bookData, setBookData] = useState([]);

    const navigate = useNavigate();

    function handleSearch() {
        fetch(`${constant.BACKEND}/searchBook?keyword=${searchKeyword}`, {
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 403) {
                    message.info("Please login first");
                    navigate("/login");
                }
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
    }

    return (
        <div>
            <Input
                placeholder="输入关键词搜索书籍"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleSearch}>搜索！</Button>

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