import React from "react";
import {Button, Col, message, Row} from "antd";
import {json, Link, useNavigate} from "react-router-dom";
import * as constants from "../utilities/constant";

function HeadBar(props) {
    const navigate = useNavigate();
    function handleLogout() {
        console.log("execute logout!");
        let request = {
            "username": props.userInfo.username,
        };
        fetch(`${constants.BACKEND}/logout`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(request)
        })
            .then((res) => {
                if (res.status === 403) {
                    message.info("Please login first");
                    navigate("/login");
                }
                if (res.ok) {
                    res.json().then(
                        (json) => {
                            console.log(json);
                            message.info(json.detail);
                        }
                    )
                } else {
                    console.log("Net error");
                }
            }).catch((error) => {console.log("Parse error" + error)});

        navigate("/login");
        props.setUserInfo(null);
    }

    var log_info;
    if (props.userInfo === null) {
        log_info = "Please Login"
    } else if (props.userInfo.username === undefined) {
        log_info = "Please Login"
    } else {
        log_info = "Welcome back, " + props.userInfo.username;
    }

    var button;
    if (props.userInfo === null) {
        button = <Button onClick={() => navigate("/login")}>登录</Button>
    } else if (props.userInfo.username === undefined) {
        button = <Button onClick={() => navigate("/login")}>登录</Button>
    } else {
        button = <Button onClick={handleLogout}>退出</Button>
    }


    return (
        <Row justify={"space-between"}>
            <Col style={{color:"white"}} span={6} onClick={() => navigate("/")}>Bookstore</Col>
            <Col span={12}/>
            <Col span={4}>
                {log_info}
            </Col>
            <Col span={2}>
                {button}
            </Col>
        </Row>
    );
}
export default HeadBar;