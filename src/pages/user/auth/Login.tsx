import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import './Login&Register.scss';
import { CSSTransition } from 'react-transition-group';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { LoginResponse } from "../../../dtos/responses/login.response";
import { login } from "../../../services/auth.service";
import { LoginRequestDto } from "../../../dtos/requests/login.dto";
import { saveToken } from "../../../services/token.service";
import { useState } from "react";
import { UserModel } from "../../../models/user.model";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";

const validationLoginSchema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu')
});


const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationLoginSchema,
        onSubmit: async (values:LoginRequestDto) => {
            try {
                // setOpen(true);

                // Gửi yêu cầu đăng nhập
                const response: ResponseSuccess<LoginResponse> = await login(values);

                const accessToken = Cookies.get('accessToken');
                const refreshToken = Cookies.get('refreshToken');
                if (accessToken && refreshToken) {
                    const loginResponse: LoginResponse = {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    };

                    saveToken(loginResponse);
                    console.log("Đã lưu token vào localStorage");
                } else {
                    console.log("Không thể lấy token từ cookie.");
                }

                const responseUser: ResponseSuccess<UserModel> = await getUserByEmail(values.email);
                saveUserToLocalStorage(responseUser.data);

                const from = location.state?.from || '/home';
                navigate(from);
            } catch (error) {
                localStorage.removeItem("token");
                setError('Email hoặc mật khẩu không đúng');
            }
        }
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          formikLogin.submitForm(); // Gọi hàm submitForm khi nhấn Enter
        }
      };

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
                }}
                onKeyDown={handleKeyDown} 
                >
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
                            name="email"
                            type="email"
                            placeholder="Nhập email"
                            value={formikLogin.values.email}
                            onChange={formikLogin.handleChange}
                            onBlur={formikLogin.handleBlur}
                            error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                            helperText={formikLogin.touched.email && formikLogin.errors.email}
                            sx={{ width: 300 }}
                        />
                        <TextField
                            id="password"
                           label="Mật khẩu"
                           name="password"
                           type="password"
                            placeholder="Nhập mật khẩu"
                           value={formikLogin.values.password}
                           onChange={formikLogin.handleChange}
                           onBlur={formikLogin.handleBlur}
                           error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                           helperText={formikLogin.touched.password && formikLogin.errors.password}
                            sx={{ width: 300 }}
                        />
                        {error && <Typography component={'span'} sx={{ color: 'red' }}>{error}</Typography>}
                        <Link
                            component="button"
                            variant="body2"
                        >
                            Quên mật khẩu?
                        </Link>

                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, ml: 9 }}
                            onClick={() => formikLogin.submitForm()}
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