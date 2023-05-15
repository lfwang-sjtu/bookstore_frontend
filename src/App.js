import React, {useState, useEffect} from 'react';
import HomeView from "./view/HomeView";
import LoginView from "./view/LoginView";
import BookDetailView from "./view/BookDetailView";
import ProfileView from "./view/ProfileView";
import CartView from "./view/CartView";
import OrdersView from "./view/OrdersView";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom"

const BACKEND = "http://localhost:8080"

function App() {

    const [allBooks, setAllBooks] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(
        () => {
            fetch(`${BACKEND}/getBooks`, )   // getBooks
                .then((res) => {
                    if (res.ok) {
                        res.json().then(
                            (json)=> {
                                console.log(json);
                                setBookData(Object.values(json));
                                //setAllBooks(Object.values(json));
                            }
                        )
                    } else {
                        console.log("Net error");
                    }
                })
                .catch((error)=>{console.log("Parse error" + error)});
        }, []
    )

    useEffect(
        () => {
            fetch(`${BACKEND}/getUserInfo`, )
                .then((res) => {
                    if (res.ok) {
                        res.json().then(
                            (json) => {
                                console.log(json);
                                setUserInfo(Object.values(json));
                            }
                        )
                    } else {
                        console.log("Net error");
                    }
                })
                .catch((error) => {console.log("Parse error" + error)});
        }, []
    )

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginView />} />
                <Route exact path="/home" element={<HomeView bookData={bookData}/>} />
                <Route exact path="/cart" element={<CartView />} />
                <Route exact path="/orders" element={<OrdersView />} />
                <Route exact path="/profile" element={<ProfileView />} />
                <Route exact path="/book_details/:id" element={<BookDetailView bookData={bookData}/>} />
            </Routes>
        </Router>
    );
}

export default App;