import React from "react";
import {Card, Button, Checkbox, Form, Input} from "antd";
import { Link } from "react-router-dom"

function LoginCard() {
    return (
        <Card
            title={"Login"}
            extra={<a href="#">Forget Password?</a>}
            style={{
                width: 300,
            }}
        >
            <Form>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input defaultValue={"lfwang"}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password defaultValue={"hi"}/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Link to={"/home"}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </Card>
    );
}
export default LoginCard;