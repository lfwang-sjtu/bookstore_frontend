import React from "react";
import {Layout} from "antd";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import Cart from "../components/Cart";

const { Header, Sider, Content } = Layout;

function CartView() {
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
                    <Cart />
                </Content>
            </Layout>
        </Layout>
    );
}

export default CartView;