import {message} from "antd";

export var socket;

export function openSocket(userID) {
    if (typeof (WebSocket) == "undefined") {
        alert("Your browser doesn't support WebSocket");
    } else {
        if (socket != null) return;
        var socketURL = "ws://localhost:8080/websocket/" + userID;
        socket = new WebSocket(socketURL);
        console.log(socket);

        socket.onopen = function () {
            if (userID === null) message.info("Please login firsts");
            else socket.send("From frontend userid" + userID);
            message.info("webSocket is turned on");
        };

        socket.onmessage = function (msg) {
            var serverMsg = "Receive message from server" + msg.data;
            console.log(serverMsg);
            message.info(serverMsg);
        }

        socket.onclose = function () {
            console.log("webSocket is closed");
        }

        socket.onerror = function () {
            console.log("webSocket error");
        }
    }
}

export function closeSocket() {
    if (socket === undefined || socket === null) {
        alert("Please connect websocket first");
        return;
    }
    socket.close();
    socket = null;
}

export function sendMessage(userID) {
    if (socket === undefined || socket === null) {
        alert("Please connect websocket first");
        return;
    }
    if (typeof (WebSocket) == "undefined") {
        console.log("Your browser doesn't support WebSocket");
    } else {
        console.log("Your browser supports WebSocket");
        var msg = JSON.stringify({'userID': userID});
        console.log(msg);
        socket.send(msg);
    }
}