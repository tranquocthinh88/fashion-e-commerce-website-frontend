import { Box, IconButton, Input, Typography, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useEffect, useRef, useState } from "react";
import { connect, disconnect, subscribe } from "../../../configs/websocket";
import { getMessageByRoomId, send } from "../../../services/message.service";
import { MessageModel } from "../../../models/message.model";
import { UserModel } from "../../../models/user.model";
import { getUserFromLocalStorage } from "../../../services/user.service";

const RoomChat = () => {
    const user: UserModel | null = getUserFromLocalStorage();
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const isAdmin = user?.email === 'admin@gmail.com';
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Đóng chat
    const closeChat = () => {
        setIsOpen(false);
    };

    // Kết nối đến WebSocket
    useEffect(() => {
        const onConnected = () => {
            console.log("Connected to WebSocket");
            setIsConnected(true);
            subscribe("/topic/messages", (message) => {
                const msg = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, msg]);
            });
            subscribe("/user/queue/notifications", (notification) => {
                const msg = JSON.parse(notification.body);
                setMessages((prevMessages) => [...prevMessages, msg]);
            });
        };

        const onError = (error: any) => {
            console.error("Error connecting to WebSocket", error);
            setErrorMessage("Kết nối WebSocket thất bại");
        };

        connect(onConnected, onError);

        return () => {
            disconnect();
            setIsConnected(false);
        };
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            // 
            const roomId = user?.email
                ? `admin@gmail.com_${user.email}` || `${user.email}_admin@gmail.com`
                : 'unknown';
            console.log("RoomId: ", roomId);

            if (roomId) {
                try {
                    const response = await getMessageByRoomId(roomId);
                    console.log("Messages: ", response.data);
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === "") return;

        if (!isConnected) {
            setErrorMessage("Kết nối WebSocket chưa được thiết lập.");
            return;
        }

        const messageRequestDto = {
            sender: isAdmin ? 'admin@gmail.com' : user?.email || 'unknown',
            receiver: isAdmin ? user?.email || 'unknown' : 'admin@gmail.com',
            content: inputMessage,
            messageTime: new Date(),
        }

        try {
            await send(messageRequestDto);
            setInputMessage("");
        } catch (error) {
            console.error("Error sending message", error);
            setErrorMessage("Gửi tin nhắn thất bại");
        }
    };

    // Đóng thông báo lỗi
    const handleCloseErrorSnackbar = () => {
        setErrorMessage(null);
    };

    if (!isOpen) return null;


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            right: 20,
            width: 450,
            height: 500,
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>Trao đổi với nhân viên</Typography>
                <IconButton color="primary" size="small" onClick={closeChat}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box
                ref={chatContainerRef}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    p: 1,
                    backgroundColor: '#99CCFF'
                }}
            >
                {messages?.map((msg, index) => (
                    <Box
                        key={msg.id || index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === user?.email ? 'flex-end' : 'flex-start',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: msg.sender === user?.email ? '#cce5ff' : '#f8d7da',
                                padding: '10px',
                                borderRadius: '5px',
                                margin: '5px 0',
                                maxWidth: '75%',
                                wordWrap: 'break-word',
                            }}
                        >
                            <Typography align={msg.sender === user?.email ? 'right' : 'left'}>
                                {msg.content}
                            </Typography>
                            <Typography>
                                {msg.messageTime ? msg.messageTime.toString() : ''}
                            </Typography>

                        </Box>
                    </Box>
                ))}


            </Box>
            <Box sx={{ mt: 1 }}>
                <Box onKeyDown={handleKeyDown} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input
                        placeholder="Nhập tin nhắn của bạn"
                        fullWidth
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <IconButton color="primary" size="small" onClick={handleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <IconButton color="primary" size="small">
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton color="primary" size="small">
                        <ImageIcon />
                    </IconButton>
                    <IconButton color="primary" size="small">
                        <OndemandVideoIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Thông báo lỗi */}
            {errorMessage && (
                <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
                    <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default RoomChat;


