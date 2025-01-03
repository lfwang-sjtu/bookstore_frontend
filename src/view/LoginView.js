import React, {useState} from "react";
import {Layout, Space} from "antd";
import LoginCard from "../components/LoginCard";
import {Content, Footer, Header} from "antd/es/layout/layout";
import HeadBar from "../components/HeadBar";
import RegisterCard from "../components/RegisterCard";
import FootInfo from "../components/FootInfo";

function LoginView(props) {
    const [registerFlag,setRegisterFlag] =useState(false);

    return (
        <Layout>
            <Header>
                <HeadBar userInfo={props.userInfo}/>
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
                {registerFlag ?
                    (<RegisterCard setRegisterFlag={setRegisterFlag}/>) :
                    (<LoginCard userInfo={props.userInfo} setUserInfo={props.setUserInfo} setRegisterFlag={setRegisterFlag}/>)
                }
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
    );
}

export default LoginView;