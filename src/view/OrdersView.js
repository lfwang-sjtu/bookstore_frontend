import React from "react";
import {Layout} from "antd";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";

const { Header, Sider, Content } = Layout;

function OrdersView() {
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
                </Content>
            </Layout>
        </Layout>
    );
}

export default OrdersView;