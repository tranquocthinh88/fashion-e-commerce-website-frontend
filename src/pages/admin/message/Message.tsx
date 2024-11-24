import { Alert, Avatar, Box, Grid, IconButton, Input, Snackbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getAllRoomChat } from "../../../services/roomchat.service";
import { RoomChatModel } from "../../../models/roomchat.model";
import { getUserByEmail, getUserFromLocalStorage } from "../../../services/user.service";
import { UserModel } from "../../../models/user.model";
import { MessageModel } from "../../../models/message.model";
import { getMessageByRoomId, send } from "../../../services/message.service";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { connect, disconnect, subscribe } from "../../../configs/websocket";

const Message = () => {
    const [roomchatList, setRoomchatList] = useState<RoomChatModel[]>([]);
    const currentUserEmail = getUserFromLocalStorage()?.email;
    const [userList, setUserList] = useState<{ [email: string]: UserModel }>({});
    const [lastMessages, setLastMessages] = useState<{ [roomId: string]: MessageModel }>({});
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // Room ID được chọn
    const [currentMessages, setCurrentMessages] = useState<MessageModel[]>([]); // Tin nhắn của Room được chọn
    const [inputMessage, setInputMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const roomchat = roomchatList.find((room) => room.roomId === selectedRoomId);

    // Lấy email của người nhận
    const receiverEmail = roomchat ? roomchat.sender : "";

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllRoomChat();
                console.log(response);
                setRoomchatList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData: { [email: string]: UserModel } = {};
                for (const roomchat of roomchatList) {
                    const email = roomchat.sender;
                    if (!usersData[email]) {
                        const response = await getUserByEmail(email);
                        usersData[email] = response.data;
                    }
                }
                console.log("Kết quả: ", usersData);

                setUserList(usersData);
            } catch (error) {
                console.log(error);
            }
        };
        if (roomchatList.length > 0) {
            fetchUsers();
        }
    }, [roomchatList]);

    useEffect(() => {
        const fetchLastMessages = async () => {
            const messagesData: { [roomId: string]: MessageModel } = {};
            for (const roomchat of roomchatList) {
                const response = await getMessageByRoomId(roomchat.roomId);
                const messages = response.data;
                if (messages.length > 0) {
                    messagesData[roomchat.roomId] = messages[messages.length - 1]; // Tin nhắn cuối cùng
                }
            }
            setLastMessages(messagesData);
        };

        if (roomchatList.length > 0) {
            fetchLastMessages();
        }
    }, [roomchatList, currentMessages]);

    useEffect(() => {
        const fetchRoomMessages = async () => {
            if (selectedRoomId) {
                const response = await getMessageByRoomId(selectedRoomId);
                setCurrentMessages(response.data);
            }
        };
        fetchRoomMessages();
    }, [selectedRoomId]);

    // Kết nối đến WebSocket
    useEffect(() => {
        const onConnected = () => {
            console.log("Connected to WebSocket");
            setIsConnected(true);
            subscribe("/topic/messages", (message) => {
                const msg = JSON.parse(message.body);
                setCurrentMessages((prevMessages) => [...prevMessages, msg]);
            });
            subscribe("/user/queue/notifications", (notification) => {
                const msg = JSON.parse(notification.body);
                setCurrentMessages((prevMessages) => [...prevMessages, msg]);
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

    const handleSendMessage = async () => {
        if (inputMessage.trim() === "") return;

        if (!isConnected) {
            setErrorMessage("Kết nối WebSocket chưa được thiết lập.");
            return;
        }

        const messageRequestDto = {
            sender: 'admin@gmail.com',
            receiver: receiverEmail,
            content: inputMessage,
            messageTime: new Date(),
        }

        try {
            console.log("Sending message", messageRequestDto);

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


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [currentMessages]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        width: '30%',
                        height: `calc(100vh - 250px)`,
                        paddingBottom: '150px',
                        overflowY: 'auto',
                        borderRight: '1px solid #ccc',
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h6">Danh sách tin nhắn</Typography>
                        {roomchatList.map((roomchat, index) => {
                            const user = userList[roomchat.sender];
                            const lastMessage = lastMessages[roomchat.roomId];
                            return (
                                <Grid item xs={12} key={index} >
                                    {user && (
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0 8px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }} onClick={() => setSelectedRoomId(roomchat.roomId)}>
                                            <Box>
                                                {user?.avatarUrl ?
                                                    <img src={user?.avatarUrl || ''}
                                                        alt={user?.username}
                                                        style={{ width: 50, height: 50, borderRadius: '50%', border: '1px' }} /> :
                                                    <Avatar sx={{ backgroundColor: '#FFA500', width: 50, height: 50, }}>{user?.username?.charAt(0).toUpperCase()}</Avatar>
                                                }
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '8px', }}>
                                                <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>{user.username}</Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Typography sx={{
                                                        flex: 1,
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        WebkitLineClamp: 2,
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {lastMessage?.sender === currentUserEmail ? 'Bạn: ' + lastMessage?.content : lastMessage?.content}
                                                    </Typography>
                                                    <Typography sx={{ whiteSpace: 'nowrap', color: 'gray' }}>
                                                        {new Date(lastMessage?.messageTime).toLocaleTimeString('vi-VN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </Typography>
                                                </Box>

                                            </Box>
                                        </Box>
                                    )}
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        width: "70%",
                    }}
                >
                    {selectedRoomId ? (
                        <Box>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                borderBottom: "1px solid #ccc",
                                padding: "10px",
                            }}>
                                {
                                    userList[receiverEmail]?.avatarUrl ?
                                        <img src={userList[receiverEmail]?.avatarUrl || ''}
                                            alt={userList[receiverEmail]?.username}
                                            style={{ width: 50, height: 50, borderRadius: '50%', border: '1px' }} /> :
                                        <Avatar sx={{ backgroundColor: '#FFA500' }}>{userList[receiverEmail]?.username?.charAt(0).toUpperCase()}</Avatar>
                                }
                                <Typography sx={{ fontSize: 18, fontWeight: '500', pl: 1 }} >{userList[receiverEmail]?.username}</Typography>
                            </Box>

                            <Box
                                ref={chatContainerRef}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    maxHeight: "calc(100vh - 250px)",
                                    width: "100%",
                                    overflowY: "auto",
                                    backgroundColor: '#99CCFF'
                                }}
                            >
                                {currentMessages.map((message, index) => (
                                    // { messages?.map((msg, index) => (
                                    <Box
                                        key={message.id || index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: message.sender === currentUserEmail ? 'flex-end' : 'flex-start',
                                            width: '100%',
                                            padding: '0 10px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: message.sender === currentUserEmail ? '#cce5ff' : '#f8d7da',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                margin: '5px 0',
                                                maxWidth: '75%',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            <Typography align={message.sender === currentUserEmail ? 'right' : 'left'}>
                                                {message.content}
                                            </Typography>
                                            <Typography align={message.sender === currentUserEmail ? 'right' : 'left'}>
                                                {message.messageTime ? message.messageTime.toString() : ''}
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
                                    <IconButton color="primary" size="small">
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
                        </Box>
                    ) : (
                        <Typography variant="h6">Chọn một Room Chat để xem tin nhắn</Typography>
                    )}

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
        </>
    );
};
export default Message;
