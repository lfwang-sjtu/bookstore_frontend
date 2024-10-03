import React from "react";
import {Layout, Menu} from "antd";
import HeadBar from "../components/HeadBar";
import BookDetail from "../components/BookDetail";
import {Link, useParams} from "react-router-dom";
import {RollbackOutlined} from "@ant-design/icons";
import {Footer} from "antd/es/layout/layout";
import FootInfo from "../components/FootInfo";

const { Header, Sider, Content } = Layout;

function BookDetailView(props) {
    console.log(props.bookData);
    const items = [
        {
            label: (
                <Link to={"/"}>
                    <a>返回书籍列表</a>
                </Link>
            ),
            key: 'books',
            icon: <RollbackOutlined />
        }
    ];

    return (
        <Layout>
            <Header style={{color:"white"}}>
                <HeadBar userInfo={props.userInfo} setUserInfo={props.setUserInfo}/>
            </Header>
            <Content>
                <Layout
                    style={{
                        background: "azure",
                    }}
                >
                    <Sider
                        width={250}
                    >
                        <Menu
                            mode="vertical"
                            style={{
                                height: '100%',
                            }}
                            items={items}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '24px 24px',
                        }}
                    >
                        <BookDetail id={useParams().id} userInfo={props.userInfo}/>
                    </Content>
                </Layout>
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

export default BookDetailView;