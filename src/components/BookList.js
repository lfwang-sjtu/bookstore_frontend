import React, {useState, useEffect} from "react";
import Book from "./Book";
import {Card, List} from "antd";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";

function BookList(props) {
    const BOOK_PER_ROW = 2;
    const BOOK_PER_LINE = 4;
    const BOOK_PER_PAGE = BOOK_PER_LINE * BOOK_PER_ROW;
    const [p, setP] = useState(1);

    let books = props.bookData.slice((p - 1) * BOOK_PER_PAGE, p * BOOK_PER_PAGE);
    return (
        <div>
            <List
                dataSource={books}
                grid={{ gutter: 16, column: 4 }}
                renderItem={item => (
                    <List.Item>
                        <Book info={item} />
                    </List.Item>
                )}
            />
        </div>
    );
}
export default BookList;