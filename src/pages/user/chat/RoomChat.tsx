// import { Box, IconButton, Input, Typography } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import ImageIcon from '@mui/icons-material/Image';
// import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
// import { useState } from "react";

// const RoomChat = () => {

//      const [isOpen, setIsOpen] = useState(true);

//      const closeChat = () => {
//          setIsOpen(false);
//      }

//      if (!isOpen) return null;
 
//     return (
//         <Box sx={{
//             position: 'fixed',
//             bottom: 0,
//             right: 20,
//             width: 450,
//             height: 500,
//             backgroundColor: 'white',
//             boxShadow: 3,
//             borderRadius: 2,
//             p: 2,
//             zIndex: 1000,
//             display: 'flex',
//             flexDirection: 'column',
//         }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="h6" gutterBottom>Trao đổi với nhân viên</Typography>
//                 <IconButton color="primary" size="small"  onClick={closeChat}>
//                     <CloseIcon />
//                 </IconButton>
//             </Box>
//             <Box sx={{
//                 flexGrow: 1, 
//                 overflowY: 'auto',
//                 border: '1px solid #ddd',
//                 p: 1,
//             }}>
//                 <Box>
//                     <Box>
//                         <Typography>Nhân viên: Chào bạn! Bạn cần hỗ trợ gì ạ?</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
//                         <Typography>Người dùng: Tôi muốn hỏi về sản phẩm này.</Typography>
//                     </Box> 
//                 </Box>
//             </Box>
//             <Box sx={{ mt: 1 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Input placeholder="Nhập tin nhắn của bạn" fullWidth />
//                     <IconButton color="primary" size="small">
//                         <SendIcon />
//                     </IconButton>
//                 </Box>
//                 <Box sx={{ mt: 1 }}>
//                     <IconButton color="primary" size="small">
//                         <AttachFileIcon />
//                     </IconButton>
//                     <IconButton color="primary" size="small">
//                         <ImageIcon />
//                     </IconButton> <IconButton color="primary" size="small">
//                         <OndemandVideoIcon />
//                     </IconButton>
//                 </Box>
//             </Box>
//         </Box>
//     )
// }

// export default RoomChat;
import { Box, IconButton, Input, Typography, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useEffect, useState } from "react";
import { connect, disconnect, sendMessage, subscribe } from "../../../configs/websocket"; // Đảm bảo rằng đường dẫn đúng

// Định nghĩa kiểu dữ liệu cho message
interface MessageModel {
    sender: string;
    content: string;
}

interface RoomChatProps {
    senderId: string; // ID của người gửi
    receiverId: string; // ID của người nhận
}

const RoomChat = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState<MessageModel[]>([]); // Lưu trữ tin nhắn
    const [inputMessage, setInputMessage] = useState(""); // Tin nhắn đang nhập
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Lưu trữ thông báo lỗi
    const [isConnected, setIsConnected] = useState(false); // Theo dõi trạng thái kết nối WebSocket

    // Đóng chat
    const closeChat = () => {
        setIsOpen(false);
    };

    // Kết nối đến WebSocket
    useEffect(() => {
        const onConnected = () => {
            console.log("Connected to WebSocket");
            setIsConnected(true); // Cập nhật trạng thái kết nối thành công
            subscribe("/topic/messages", (message) => {
                const msg = JSON.parse(message.body); // Giả sử tin nhắn đến dưới dạng JSON
                setMessages((prevMessages) => [...prevMessages, msg]); // Cập nhật tin nhắn
            });
        };

        const onError = (error: any) => {
            console.error("Error connecting to WebSocket", error);
            setErrorMessage("Kết nối WebSocket thất bại"); // Hiển thị thông báo lỗi
        };

        connect(onConnected, onError);

        return () => {
            disconnect(); // Ngắt kết nối khi component unmount
            setIsConnected(false); // Reset trạng thái kết nối khi ngắt kết nối
        };
    }, []);

    // Gửi tin nhắn
    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return; // Không gửi tin nhắn trống
        
        // Kiểm tra trạng thái kết nối trước khi gửi tin nhắn
        if (!isConnected) {
            setErrorMessage("Kết nối WebSocket chưa được thiết lập.");
            return;
        }

        const message = {
            sender: "trungthinh080602@gmail.com", // Sử dụng ID thực tế của người gửi
            receiver: "admin@gmail.com", // Sử dụng ID thực tế của người nhận
            content: inputMessage,
            // Thêm thông tin khác nếu cần
        };

        console.log("Sending message", message);
        
        
        try {
            sendMessage("/app/sendMessage", message); // Gửi đến server
            setInputMessage(""); // Xóa ô input sau khi gửi
        } catch (error) {
            console.error("Error sending message", error);
            setErrorMessage("Gửi tin nhắn thất bại"); // Hiển thị thông báo lỗi
        }
    };

    // Đóng thông báo lỗi
    const handleCloseErrorSnackbar = () => {
        setErrorMessage(null);
    };

    if (!isOpen) return null;

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
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>Trao đổi với nhân viên</Typography>
                <IconButton color="primary" size="small" onClick={closeChat}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                border: '1px solid #ddd',
                p: 1,
            }}>
                {/* Hiển thị tin nhắn */}
                {messages.map((msg, index) => (
                    <Box key={index}>
                        <Typography>{msg.sender}: {msg.content}</Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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


