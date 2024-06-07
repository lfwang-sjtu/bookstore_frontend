import React, {useState} from "react";
import {Card, Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom"
import * as constant from "../utilities/constant";
function LoginCard(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        if(username==='' || password===''){
            message.error('用户名或密码不能为空');
            return;
        }

        let request = {
            "username": username,
            "password": password
        };

        fetch(`${constant.BACKEND}/login`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(request),
            credentials: 'include',
        }).then((res) => {
            if (res.ok) {
                res.json().then(
                    (json) => {
                        console.log(json.detail);
                        if (json.code === 200) {
                            if (json.detail.type === 1) {
                                props.setUserInfo(json.detail);
                                message.info(json.msg + "(normal user)");
                                navigate("/");
                            }
                            else if (json.detail.type === 2) {
                                props.setUserInfo(json.detail);
                                message.info(json.msg + "(admin user)");
                                navigate("/admin");
                            }
                            else
                                message.info("Blocked User!");
                        } else message.info(json.msg);
                    }
                );
            } else console.log("Net res error");
        }).catch((error) => {
            console.log("parse error" + error);
        });
    };

    const cardStyle = {
        width: 400,
        margin: 'auto',
        marginTop: 0,
        padding: 20,
        textAlign: 'center',
    };
    return (
        <div>
            <Card style={cardStyle} title="欢迎登陆！">
                <Input
                    placeholder="用户名"
                    style={{ marginBottom: 16 }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input.Password
                    placeholder="密码"
                    style={{ marginBottom: 16 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="primary"
                    style={{ marginRight: 8 }}
                    onClick={handleLogin}
                >
                    登陆
                </Button>
                <Button onClick={() => props.setRegisterFlag(true)}>
                    注册
                </Button>
            </Card>
        </div>
    );
}
export default LoginCard;