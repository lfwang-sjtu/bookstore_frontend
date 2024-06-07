import React, {useState, useEffect} from 'react';
import HomeView from "./view/HomeView";
import LoginView from "./view/LoginView";
import BookDetailView from "./view/BookDetailView";
import {Routes, Route, BrowserRouter as Router, useNavigate} from "react-router-dom"
import * as constant from "./utilities/constant";
import AdminView from "./view/AdminView";
import OrderedView from "./view/OrderedView";
import {message} from "antd";

function App() {
    const [bookData, setBookData] = useState([]); // List<Book>
    const [userInfo, setUserInfo] = useState([]); // User
    const [cartData, setCartData] = useState([]); // List<CartItem>
    const [orderData, setOrderData] = useState([]); // List<Order>

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

    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<LoginView
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}/>}
                />
                <Route exact path="/" element={<HomeView
                    bookData={bookData}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    cartData={cartData}
                    setCartData={setCartData}
                    orderData={orderData}
                    setOrderData={setOrderData}
                />}/>
                <Route exact path="/book_details/:id" element={<BookDetailView
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />}/>
                <Route exact path="/success" element={<OrderedView
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}/>}
                />
                <Route exact path="/admin" element={<AdminView
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    bookData={bookData}
                    setBookData={setBookData}
                />}/>
            </Routes>
        </Router>
    );
}

export default App;