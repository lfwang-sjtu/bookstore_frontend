import React from "react";
import {Menu} from "antd";
import {Link} from 'react-router-dom'

function SideBar() {
    return (
        <Menu
            mode={"vertical"}
            theme={'light'}
        >
            <Link to={"/home"} >
                <Menu.Item key="1">Books</Menu.Item>
            </Link>
            <Link to={"/cart"} >
                <Menu.Item key="2">My Cart</Menu.Item>
            </Link>
            <Link to={"/orders"}>
                <Menu.Item key="3">My Orders</Menu.Item>
            </Link>
            <Link to={"/profile"}>
                <Menu.Item key="4">My Profile</Menu.Item>
            </Link>
        </Menu>
    )
}
export default SideBar;