import HeadBar from "../components/HeadBar";
import {Layout, Menu} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import React, {useState} from "react";
import Sider from "antd/es/layout/Sider";
import {BookOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import AdminBookTable from "../components/AdminBookTable";
import AdminOrderTable from "../components/AdminOrderTable";
import AdminUserTable from "../components/AdminUserTable";
import FootInfo from "../components/FootInfo";
import Statistics from "../components/Statistics";

function AdminView(props) {

    const [currentMenuItem,  setCurrentMenuItem] = useState('users'); // 初始选中的菜单项，默认为 'books'
    const handleMenuClick = (e) => {
        setCurrentMenuItem(e.key);
    };
    let content;
    // 根据当前选中的菜单项，设置不同的内容
    if (currentMenuItem === 'users') {
        content =
            <AdminUserTable />
    } else if (currentMenuItem === 'books') {
        content =
            <AdminBookTable />
    } else if (currentMenuItem === 'orders') {
        content =
            <AdminOrderTable
                bookData={props.bookData}
                userInfo={props.userInfo}
                setUserInfo={props.setUserInfo}
            />
    } else if (currentMenuItem === 'statistics') {
        content = <Statistics />
    }

    const items = [
        {
            label: (
                <a>用户管理</a>
            ),
            key: 'users',
            icon: <UserOutlined />
        },
        {
            label: (
                <a>书籍管理</a>
            ),
            key: 'books',
            icon: <BookOutlined />
        },
        {
            label: (
                <a>订单管理</a>
            ),
            key: 'orders',
            icon: <UnorderedListOutlined />
        },
        {
            label: (
                <a>统计</a>
            ),
            key: 'statistics',
            icon: <UnorderedListOutlined />
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
                        padding: '0 0',
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
                            onClick={handleMenuClick}
                            selectedKeys={[currentMenuItem]}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '24px 24px',
                            minHeight: 500,
                        }}
                    >
                        {content}
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
export default AdminView;