import { Box, Button, Link, TextField } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import './Login&Register.scss';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: bodyAdminColor }}>
            <Box className="red-panel" sx={{ width: 800, height: 400, display: 'flex' }}>
                <Box sx={{
                    width: 800, height: 400, backgroundColor: "white",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>Đăng nhập</Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, border: '1px solid black', borderRadius: '50%' }}>
                            <FacebookIcon />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, border: '1px solid black', borderRadius: '50%' }}>
                            <GoogleIcon />
                        </Box>
                    </Box>
                    <Box sx={{ fontSize: 15 }}>Hoặc tài khoản của bạn</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

                        <Link
                            component="button"
                            variant="body2"
                        >
                            Quên mật khẩu?
                        </Link>

                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, ml: 9 }}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </Box>
                <CSSTransition
                    in={true}
                    timeout={600}
                    classNames="red-panel"
                    unmountOnExit
                >
                    <Box sx={{
                        width: 800, height: 400, backgroundColor: "red",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>Xin chào, bạn !</Box>
                        <Box sx={{ fontSize: 15, color: 'white', mt: 2 }}>Nhập thông tin cá nhân của bạn</Box>
                        <Box sx={{ fontSize: 15, color: 'white' }}>và bắt đầu hành trình với chúng tôi!</Box>
                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, mt: 3, border: '1px solid white' }}
                           onClick={() => navigate("/register")}>
                            Đăng ký
                        </Button>
                    </Box>
                </CSSTransition>
            </Box>
        </Box>
    );
};
export default Login;