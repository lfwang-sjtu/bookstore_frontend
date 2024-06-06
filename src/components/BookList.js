import React, {useState, useEffect} from "react";
import BookCard from "./BookCard";
import {Card, Input, List} from "antd";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";

function BookList(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const filteredBookData = props.bookData.filter(book =>
        book.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    return (
        <div>
            <Input
                placeholder="输入关键词搜索书籍"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{ marginBottom: '16px' }}
            />

            <List
                dataSource={filteredBookData}
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
export default BookList;