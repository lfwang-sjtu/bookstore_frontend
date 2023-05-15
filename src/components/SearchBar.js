import React from "react";
import {Input, Button } from "antd";
import {SearchOutlined} from "@ant-design/icons";

function SearchBar() {
    return (
        <Input
            placeholder={"search"}
            suffix={
                <Button size="large">
                    <SearchOutlined />
                </Button>
            }
        />
    )
}
export default SearchBar;