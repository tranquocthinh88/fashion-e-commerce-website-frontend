
import SockJS from "sockjs-client";
import { apiUrl } from "./api-url";
import { Client, Message, over } from "stompjs";

export var stompClient : Client | null = null;

export const connect = (onConnected: () => void, onError: () => void)  => {
    let sock = new SockJS(`${apiUrl}/ws`);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect(()=> {
            console.log("Disconnected from server.");
        });
        stompClient = null;
    }
};

export const isConnected = (): boolean => {
    return stompClient !== null && stompClient.connected;
};

export const sendMessage = (destination: string, body: any) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(destination, {}, JSON.stringify(body));
    } else {
        console.error("WebSocket is not connected.");
    }
};

export const subscribe = (
    destination: string,
    callback: (message: Message) => void
) => {
    if (stompClient && stompClient.connected) {
        return stompClient.subscribe(destination, (message: Message) => {
            callback(message);
        });
    } else {
        console.error("WebSocket is not connected.");
    }
};
