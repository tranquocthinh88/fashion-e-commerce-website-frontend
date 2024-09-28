import { Box, Button, TextField } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import './Login&Register.scss';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: bodyAdminColor }}>
            <Box className="red-panel" sx={{ width: 800, height: 400, display: 'flex' }}>
                <CSSTransition
                    in={true}
                    timeout={600}
                    classNames="red-panel"
                    unmountOnExit
                >
                    <Box  sx={{
                        width: 800, height: 400, backgroundColor: "red",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>Chào mừng bạn trở lại !</Box>
                        <Box sx={{ fontSize: 15, color: 'white', mt: 2 }}>Để giữ kết nối với chúng tôi</Box>
                        <Box sx={{ fontSize: 15, color: 'white' }}>vui lòng đăng nhập bằng thông tin cá nhân!</Box>
                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, mt: 3, border: '1px solid white' }}
                            onClick={() => navigate("/login")} >
                            Đăng nhập
                        </Button>
                    </Box>
                </CSSTransition>
                <Box sx={{
                    width: 800, height: 400, backgroundColor: "white",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>Tạo tài khoản</Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            id="name"
                            label="Tên tài khoản"
                            placeholder="Nhập tên tài khoản"
                            multiline
                            sx={{ width: 300 }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            placeholder="Nhập email"
                            multiline
                            sx={{ width: 300 }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            placeholder="Nhập password"
                            multiline
                            sx={{ width: 300 }}
                        />

                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, ml: 9 }}>
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Register;