import React from "react";
import {Layout} from "antd";
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import BookCarousel from "../components/BookCarousel";
import BookList from "../components/BookList";

const { Header, Sider, Content } = Layout;

function HomeView(props) {
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
                    <SearchBar />
                    <BookCarousel />
                    <BookList bookData={props.bookData}/>
                </Content>
            </Layout>
        </Layout>
    );
}
export default HomeView;