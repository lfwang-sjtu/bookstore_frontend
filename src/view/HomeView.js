import React, {useEffect, useState} from "react";
import {Layout, Menu, message} from "antd";
import HeadBar from "../components/HeadBar";
import BookCarousel from "../components/BookCarousel";
import BookList from "../components/BookList";
import {BookOutlined, ShoppingCartOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import {Footer} from "antd/es/layout/layout";
import CartTable from "../components/CartTable";
import OrderTable from "../components/OrderTable";
import Profile from "../components/Profile";
import FootInfo from "../components/FootInfo";
import BookSearchList from "../components/BookSearchList";
import OrderSearchList from "../components/OrderSearchList";
import SelfLookup from "../components/SelfLookup";
import * as constant from "../utilities/constant";
import {useNavigate} from "react-router-dom";
import BookSearchPageList from "../components/BookSearchPageList";
import GetAuthor from "../components/GetAuthor";

const { Header, Sider, Content } = Layout;

function HomeView(props) {
    const [currentMenuItem,  setCurrentMenuItem] = useState('books'); // 初始选中的菜单项，默认为 'books'
    const navigate = useNavigate();
    const [bookData, setBookData] = useState([]);
    useEffect(
        () => {
            fetch(`${constant.BACKEND}/getBooks`, {
                credentials: 'include',
            }).then((res) => {
                if (res.ok) {
                    res.json().then(
                        (json) => {
                            console.log(json);
                            setBookData(Object.values(json.detail));
                        }
                    )
                } else {
                    console.log("Net error");
                }
            }).catch((error)=>{console.log("Parse error" + error)});
        }, []
    )
    const handleMenuClick = (e) => {
        setCurrentMenuItem(e.key);
    };
    let content;
    // 根据当前选中的菜单项，设置不同的内容
    if (currentMenuItem === 'books') {
        content =
            <BookSearchList />
            // <BookList bookData={bookData}/>
    } else if (currentMenuItem === 'books_with_page') {
        content =
            <BookSearchPageList />
    } else if (currentMenuItem === 'cart') {
        content =
            <CartTable
                bookData={bookData}
                userInfo={props.userInfo}
                cartData={props.cartData}
                setCartData={props.setCartData}
            />
    } else if (currentMenuItem === 'orders') {
        content =
            <OrderTable
                bookData={bookData}
                userInfo={props.userInfo}
                orderData={props.orderData}
                setOrderData={props.setOrderData}
            />
    } else if (currentMenuItem === 'profile') {
        content =
            <Profile userInfo={props.userInfo} />
    } else if (currentMenuItem === 'bookSearch') {
        content =
            <BookSearchList />
    } else if (currentMenuItem === 'orderSearch') {
        content =
            <OrderSearchList userInfo={props.userInfo} bookData={bookData}/>
    } else if (currentMenuItem === 'selfLookup') {
        content =
            <SelfLookup userInfo={props.userInfo}/>
    } else if (currentMenuItem === 'micro') {
        content =
            <GetAuthor />
    }

    const items = [
        {
            label: (
                <a>书籍列表</a>
            ),
            key: 'books',
            icon: <BookOutlined />
        },
        {
            label: (
                <a>分页查询的书籍列表</a>
            ),
            key: 'books_with_page',
            icon: <BookOutlined />
        },
        {
            label: (
                <a>购物车</a>
            ),
            key: 'cart',
            icon: <ShoppingCartOutlined />
        },
        {
            label: (
                <a>订单</a>
            ),
            key: 'orders',
            icon: <UnorderedListOutlined />
        },
        {
            label: (
                <a>用户中心</a>
            ),
            key: 'profile',
            icon: <UserOutlined />
        },
        // {
        //     label: (
        //         <a>带搜索的书籍列表</a>
        //     ),
        //     key: 'bookSearch',
        //     icon: <UnorderedListOutlined />
        // },
        {
            label: (
                <a>带搜索的订单列表</a>
            ),
            key: 'orderSearch',
            icon: <BookOutlined />
        },
        {
            label: (
                <a>自我统计</a>
            ),
            key: 'selfLookup',
            icon: <BookOutlined />
        },
        {
            label: (
                <a>查询作者</a>
            ),
            key: 'micro',
            icon: <BookOutlined />
        },
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
export default HomeView;