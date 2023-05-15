import React from "react";
import {Col, Row} from "antd";

function HeadBar() {
    return (
        <Row justify={"space-between"}>
            <Col span={6}>Bookstore</Col>
            <Col span={6}>Welcome back, Mr. Wang</Col>
        </Row>
    );
}
export default HeadBar;