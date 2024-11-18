import { Box, IconButton, Input, Typography, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useEffect, useState, useRef } from "react";
import { getAllMessageByUserIdAndChatbotId, sendMessage } from "../../../services/chatbot.service";
import { UserModel } from "../../../models/user.model";
import { getUserFromLocalStorage } from "../../../services/user.service";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { MessageChatbotModel } from "../../../models/chatbot/messages.chatbot";

const ChatAI = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messagesChatbotList, setMessagesChatbotList] = useState<MessageChatbotModel[]>([]); // Lưu trữ tin nhắn
    const [inputMessage, setInputMessage] = useState(""); // Tin nhắn đang nhập
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Lưu trữ thông báo lỗi
    const user: UserModel | null = getUserFromLocalStorage();
    const [newMessageTrigger, setNewMessageTrigger] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Đóng chat
    const closeChat = () => {
        setIsOpen(false);
    };

    // Gửi tin nhắn
    const handleSendMessage = async () => {
        if (inputMessage.trim() === "") return;

        const conversation = {
            userId: user?.id || 0,
            chatbotId: 'chatbot-AI',
            messages: []
        }

        setMessagesChatbotList(prev => [...prev, {
            role: 'user',
            content: inputMessage,
            conversation: conversation,
        }]);

        setInputMessage("");

        const chatbotMessage = {
            model: 'gpt-4o',
            chatbotId: 'chatbot-AI',
            messages: [{
                conversation: conversation,
                role: 'user',
                content: inputMessage,
            }]
        }

        try {
            await sendMessage(chatbotMessage, user?.id!);
            setInputMessage("");
            setNewMessageTrigger(prev => !prev);
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


    useEffect(() => {
        (async () => {
            try {
                if (user?.id !== undefined) {
                    const response: ResponseSuccess<MessageChatbotModel[]> =
                        await getAllMessageByUserIdAndChatbotId(user.id, 'chatbot-AI');
                    console.log("API Response:", response);

                    if (response && Array.isArray(response)) {
                        setMessagesChatbotList(response);
                    } else {
                        console.error("Invalid response data:", response.data);
                    }
                } else {
                    console.error("User ID is undefined");
                }
            } catch (error) {
                console.error("Error", error);
            }
        })();
    }, [newMessageTrigger]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messagesChatbotList]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

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
                <Typography variant="h6" gutterBottom>Trao đổi với AI</Typography>
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
                }}
                >
                {messagesChatbotList?.map((msg, index) => (
                    <Box
                        key={msg.id || index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: msg.role === 'user' ? '#cce5ff' : '#f8d7da',
                                padding: '10px',
                                borderRadius: '5px',
                                margin: '5px 0',
                                maxWidth: '75%',
                                wordWrap: 'break-word',
                            }}
                        >
                            <Typography align={msg.role === 'user' ? 'right' : 'left'}>
                                {msg.content}
                            </Typography>
                            <Typography>
                                {msg.timestamp ? msg.timestamp.toString() : ''}
                            </Typography>

                        </Box>
                    </Box>
                ))}


            </Box>
            <Box sx={{ mt: 1 }}>
                <Box 
                    onKeyDown={handleKeyDown}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

export default ChatAI;


