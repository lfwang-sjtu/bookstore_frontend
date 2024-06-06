import {useState} from "react";
import {Button, Card, Input, message} from "antd";
import * as constant from "../utilities/constant";
import {json, useNavigate} from "react-router-dom";

function RegisterCard(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleSubmit() {
        if(username === "" || password==="" ||email===""){
            message.error("信息不能为空");
            return;
        }
        if(password!==rePassword){
            message.error("两次输入密码不相同");
            return;
        }

        if(!validateEmail(email)){
            message.error("邮箱格式不正确");
            return;
        }

        let request = {
            "username": username,
            "password": password,
            "email": email
        };

        // todo
        fetch(`${constant.BACKEND}/register`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(request)
        }).then((res) => {
            if (res.ok) {
                res.json().then(
                    (json) => {
                        console.log(json.detail);
                        if (json.code === 200) {
                            message.info("Successfully Registered!");
                            props.setRegisterFlag(false);
                        } else message.info("Repeated Username!");
                    }
                )
            } else console.log("Net res error");
        }).catch((error) => {
            console.log("parse error" + error);
        });
    }


    const cardStyle = {
        width: 400,
        margin: 'auto',
        marginTop: 0,
        padding: 20,
        textAlign: 'center',
    };

    return (
        <div>
            <Card style={cardStyle} title="Register">
                <Input
                    placeholder="Username"
                    style={{ marginBottom: 16 }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input.Password
                    placeholder="Password"
                    style={{ marginBottom: 16 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input.Password
                    placeholder="Repeat Password"
                    style={{ marginBottom: 16 }}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
                <Input
                    placeholder="Email"
                    style={{ marginBottom: 16 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="primary" style={{ marginRight: 8 }} onClick={handleSubmit}>
                    提交
                </Button>
                <Button onClick={() => props.setRegisterFlag(false)}>
                    取消
                </Button>
            </Card>
        </div>
    );
}
export default RegisterCard;