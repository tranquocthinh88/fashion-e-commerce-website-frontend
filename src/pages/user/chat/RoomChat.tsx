import { Box, IconButton, Input, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useState } from "react";

const RoomChat = () => {

     const [isOpen, setIsOpen] = useState(true);

     const closeChat = () => {
         setIsOpen(false);
     }

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
                <IconButton color="primary" size="small"  onClick={closeChat}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{
                flexGrow: 1, 
                overflowY: 'auto',
                border: '1px solid #ddd',
                p: 1,
            }}>
                <Box>
                    <Box>
                        <Typography>Nhân viên: Chào bạn! Bạn cần hỗ trợ gì ạ?</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Typography>Người dùng: Tôi muốn hỏi về sản phẩm này.</Typography>
                    </Box> 
                </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input placeholder="Nhập tin nhắn của bạn" fullWidth />
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
                    </IconButton> <IconButton color="primary" size="small">
                        <OndemandVideoIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default RoomChat;
