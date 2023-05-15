import React from "react";
import {Layout, Space} from "antd";
import LoginCard from "../components/LoginCard";

function LoginView(props) {
    return (
        <Space
            style={{
                height:"100vh", width:"100vw",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <LoginCard />
        </Space>
    );
}

export default LoginView;