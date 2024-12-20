import React, { useState } from 'react';
import { message, Spin } from 'antd'; // 如果你希望使用 Spin 进行加载动画

function GraphQL() {
    // State to store user input, book data, loading state, and error message
    const [bookName, setBookName] = useState('');
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const BACKEND_URL = 'http://localhost:8080/graphql'; // 后端 URL
    const constant = {
        BACKEND: BACKEND_URL
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 构建 GraphQL 查询
        const request = {
            query: `
                query {
                    bookByName(name: "${bookName}") {
                        id
                        isbn
                        name
                        author
                        price
                        description
                        inventory
                        image
                    }
                }
            `
        };

        // 使用你提供的 fetch 请求方式
        fetch(`${constant.BACKEND}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 如果需要携带 Cookie
            body: JSON.stringify(request),
        })
            .then((res) => {
                if (res.status === 403) {
                    message.info("Please login first");
                    // Handle redirect to login page if necessary
                    // navigate("/login");
                }
                if (res.ok) {
                    res.json().then((json) => {
                        console.log(json);
                        if (json.data && json.data.bookByName) {
                            setBookData(json.data.bookByName);
                        } else {
                            setError('Book not found');
                        }
                    });
                } else {
                    console.log("Network error");
                    setError('Network error');
                }
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred while fetching the data');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Search Book by Name</h1>

            {/* Input field to enter book name */}
            <form onSubmit={handleSubmit}>
                <label>
                    Book Name:
                    <input
                        type="text"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        placeholder="Enter book name"
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? <Spin /> : 'Search'}
                </button>
            </form>

            {/* Display error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display book information if available */}
            {bookData && (
                <div>
                    <h2>{bookData.name}</h2>
                    <p><strong>Author:</strong> {bookData.author}</p>
                    <p><strong>Price:</strong> {bookData.price}</p>
                    <p><strong>Description:</strong> {bookData.description}</p>
                    <p><strong>Inventory:</strong> {bookData.inventory}</p>
                    <img src={bookData.image} alt={bookData.name} style={{ maxWidth: '200px' }} />
                </div>
            )}
        </div>
    );
}

export default GraphQL;
