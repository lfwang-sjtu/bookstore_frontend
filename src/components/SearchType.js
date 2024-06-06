import {useState} from "react";
import {Button, Input} from "antd";
import * as constant from "../utilities/constant";

function SearchType() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = () => {
        // 使用 fetch 发送搜索请求的基本框架
        fetch(`${constant.BACKEND}/searchType?type=${searchTerm}`, {
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                // 处理搜索结果
                setSearchResults(data);
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
                    <ul>
                        {/* 遍历搜索结果并显示 */}
                        {searchResults.map(result => (
                            <li key={result.id}>{result.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default SearchType;