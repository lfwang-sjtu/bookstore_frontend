import React from "react";
import {Layout} from "antd";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";

const { Header, Sider, Content } = Layout;

function ProfileView() {
    return (
        <Layout>
            <Header style={{color:"white"}}>
                <HeadBar />
            </Header>
            <Layout>
                <Sider theme={"light"} width={"15%"}>
                    <SideBar />
                </Sider>
                <Content>
                    <Profile />
                </Content>
            </Layout>
        </Layout>
    );
}

export default ProfileView;