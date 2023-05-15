import React from "react";
import {Form, Input} from "antd";

function Profile() {
    return (
        <Form>
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Email" rules={[{type:"email"}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Avatar">
                <img src="https://avatars.githubusercontent.com/u/16714790?v=4" alt={"avatar"}/>
            </Form.Item>
            <Form.Item label="Notes">
                <Input/>
            </Form.Item>
        </Form>
    );
}
export default Profile;