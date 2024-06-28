import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as constant from "../utilities/constant";
import {Button, Input, List, message} from "antd";
import BookCard from "./BookCard";

function BookSearchPageList() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [bookData, setBookData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 8;

    const navigate = useNavigate();

    function handleSearch() {
        console.log(`${constant.BACKEND}/getBookPage?keyword=${searchKeyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
        fetch(`${constant.BACKEND}/getBookPage?keyword=${searchKeyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
            method: 'GET',
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
                            if (json.detail && json.detail.length > 0) {
                                setBookData(Object.values(json.detail));
                            } else {
                                message.info("已经到头啦");
                                if (pageIndex > 0) {
                                    setPageIndex(prevPageIndex => prevPageIndex - 1);
                                }
                            }
                        }
                    )
                }
            })
            .catch(error => {
                console.error('Error fetching book list:', error);
            });
    }

    function handlePrevious() {
        if (pageIndex < 0) {
            message.info("已经是第一页啦");
            setPageIndex(0);
        } else {
            setPageIndex(prevPageIndex => prevPageIndex - 1);
        }
        handleSearch();
        console.log("click previous" + pageIndex);
    }

    function handleNext() {
        setPageIndex(prevPageIndex => prevPageIndex + 1);
        handleSearch();
        console.log("click next" + pageIndex);
    }

    function handleKeyword() {
        setPageIndex(0);
        handleSearch();
    }

    return (
        <div>
            <Input
                placeholder="输入关键词搜索书籍"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleKeyword}>搜索！</Button>
            <Button type="default" onClick={handlePrevious}>上一页</Button>
            <Button type="default" onClick={handleNext}>下一页</Button>

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

export default BookSearchPageList;