import React from "react";
import {Layout} from "antd";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import BookDetail from "../components/BookDetail";
import {useParams} from "react-router-dom";

const { Header, Sider, Content } = Layout;

function BookDetailView(props) {

    console.log(props.bookData);
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
                    <BookDetail info={props.bookData[useParams().id - 1]}/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default BookDetailView;