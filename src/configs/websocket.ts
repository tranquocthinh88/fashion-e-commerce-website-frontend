// import SockJS from "sockjs-client";
// import { apiUrl } from "./api-url";
// import { Client, Message, over } from "stompjs";

// export var stompClient: Client | null = null;

// export const connect = (onConnected: () => void, onError: (error: any) => void) => {
//     let sock = new SockJS(`${apiUrl}/ws`);
//     stompClient = over(sock);
//     stompClient.connect({}, onConnected, (error) => {
//         onError(error); // Gọi onError với thông tin lỗi
//     });
// }

// export const disconnect = () => {
//     if (stompClient !== null) {
//         stompClient.disconnect(() => {
//             console.log("Disconnected from server.");
//         });
//         stompClient = null;
//     }
// };

// export const isConnected = (): boolean => {
//     return stompClient !== null && stompClient.connected;
// };

// export const sendMessage = (destination: string, body: any) => {
//     if (stompClient && stompClient.connected) {
//         stompClient.send(destination, {}, JSON.stringify(body));
//     } else {
//         console.error("WebSocket is not connected.");
//     }
// };

// export const subscribe = (
//     destination: string,
//     callback: (message: Message) => void
// ) => {
//     if (stompClient && stompClient.connected) {
//         return stompClient.subscribe(destination, (message: Message) => {
//             callback(message);
//         });
//     } else {
//         console.error("WebSocket is not connected.");
//     }
// };

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient: any = null;
let isConnected = false; 

export const connect = (onConnected: () => void, onError: (error: any) => void) => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame: any) => {
        isConnected = true;
        console.log('Connected: ' + frame);
        onConnected(); 
    }, (error: any) => {
        onError(error); 
    });
};

export const disconnect = () => {
    if (stompClient && isConnected) {
        stompClient.disconnect(() => {
            console.log("Disconnected");
            isConnected = false; 
        });
    } else {
        console.warn("Tried to disconnect but was not connected.");
    }
};

export const sendMessage = (destination: string, message: any) => {
    if (stompClient && isConnected) { 
        stompClient.send(destination, {}, JSON.stringify(message));
    } else {
        throw new Error("Không thể gửi tin nhắn, chưa kết nối WebSocket."); 
    }
};

export const subscribe = (topic: string, callback: (message: any) => void) => {
    if (stompClient && isConnected) { 
        stompClient.subscribe(topic, callback);
    } else {
        console.warn("Tried to subscribe but was not connected.");
    }
};
