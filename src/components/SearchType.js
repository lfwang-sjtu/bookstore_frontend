import {useState} from "react";
import {Button, Input} from "antd";
import * as constant from "../utilities/constant";

function SearchType() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([{
        "id" : 1,
        "name" : "mamba out"
    }]);

    const handleSearch = () => {
        // 使用 fetch 发送搜索请求的基本框架
        fetch(`${constant.BACKEND}/searchType?type=${searchTerm}`, {
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                // 处理搜索结果
                console.log(data);
                setSearchResults(data.detail);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    };

    return (
        <div>
            <Input
                placeholder="Enter search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={handleSearch}>Search</Button>

            {/* 显示搜索结果 */}
            {searchResults && (
                <div>
                    <h2>Search Results</h2>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.name}</td>
                                <td>{result.author}</td>
                                <td>{result.type}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SearchType;