import {Button, Layout} from "antd";
import HeadBar from "../components/HeadBar";
import React from "react";
import {Content, Footer, Header} from "antd/es/layout/layout";
import FootInfo from "../components/FootInfo";

import picture from '../asset/7971713964595_.pic.jpg'
import {useNavigate} from "react-router-dom";

function OrderedView(props) {
    const navigate = useNavigate();

    return (
        <Layout>
            <Header>
                <HeadBar userInfo={props.userInfo} setUserInfo={props.setUserInfo}/>
            </Header>
            <Content
                style={{
                    height:"80vh",
                    // width:"100vw",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <h1>购买成功！！！！！</h1>
                <Button onClick={() => navigate("/")}>
                    返回
                </Button>
                <img src={picture}/>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    position: 'fixed',
                    bottom: 0,
                    width: '100%'
                }}
            >
                <FootInfo />
            </Footer>
        </Layout>
    )
}
export default OrderedView;