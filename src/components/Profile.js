import React from "react";
import {Descriptions, message} from "antd";

function Profile(props) {
    function renderProfile() {
        if (props.userInfo === null || props.userInfo.userID === undefined)
            message.info("please login first");
        else return (
            <Descriptions title="USER INFO">
                <Descriptions.Item label="Avatar">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(props.userInfo.username)}`} alt="Avatar" />
                </Descriptions.Item>
                <Descriptions.Item label="Username">{props.userInfo.username}</Descriptions.Item>
                <Descriptions.Item label="Password">{props.userInfo.password}</Descriptions.Item>
                <Descriptions.Item label="Email">{props.userInfo.email}</Descriptions.Item>
                <Descriptions.Item label="Type(1:normal, 2:admin, 3:blocked)">{props.userInfo.type}</Descriptions.Item>
            </Descriptions>
        )
    }
    return (
        <div>
            {renderProfile()}
        </div>
    );
}
export default Profile;