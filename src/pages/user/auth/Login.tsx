import { Alert, Box, Button, IconButton, Link, Snackbar, Typography } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import GoogleIcon from '@mui/icons-material/Google';
import './Login&Register.scss';
import { CSSTransition } from 'react-transition-group';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { LoginResponse } from "../../../dtos/responses/login.response";
import { login, loginWithSocial } from "../../../services/auth.service";
import { LoginRequestDto } from "../../../dtos/requests/login.dto";
import { saveToken } from "../../../services/token.service";
import { useState } from "react";
import { UserModel } from "../../../models/user.model";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";
import CustomTextField from "../../../components/common/TextFieldCustom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

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
        onSubmit: async (values: LoginRequestDto) => {
            try {
                const response: ResponseSuccess<LoginResponse> = await login(values);
                console.log(response.data);

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

                const userRole = responseUser.data.role;

                if (userRole === 'ROLE_ADMIN') {
                    navigate('/admin/dashboard', { state: { showAlert: true, status: 'success', message: 'Đăng nhập thành công!' } });
                } else {
                    navigate(location.state?.from ||'/home', { state: { showAlert: true, status: 'success', message: 'Đăng nhập thành công!' } });
                }

            } catch (error) {
                localStorage.removeItem("token");
                setError('Email hoặc mật khẩu không đúng');

                showAlert('error', 'Email hoặc mật khẩu không đúng');
            }
        }
    });


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            formikLogin.submitForm();
        }
    };

    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });

    const showAlert = (status: string, message: string) => {
        setOpenAlert({
            show: true,
            status: status,
            message: message
        });
    };


    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: bodyAdminColor }}>
            <Box className="red-panel" sx={{ width: 800, minHeight: 400, display: 'flex' }}>
                <Box sx={{
                    width: 800, minHeight: 400, backgroundColor: "white",
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton onClick={() => loginWithSocial('facebook')} >
                                <FacebookOutlinedIcon sx={{ color: '#1976D2' }} fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => loginWithSocial('google')}>
                                <GoogleIcon sx={{ color: '#DB4437'}} fontSize="large"/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ fontSize: 15 }}>Hoặc tài khoản của bạn</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', alignItems: 'center' }}>
                        <CustomTextField label="Email" id="email" name="email" type="email" formik={formikLogin} width="80%" />
                        <CustomTextField label="Mật khẩu" id="password" name="password" type="password" formik={formikLogin} width="80%" />
                        {error && <Typography component={'span'} sx={{ color: 'red' }}>{error}</Typography>}
                        <Link
                            component="button"
                            variant="body2"
                            color="#1976D2"
                        >
                            Quên mật khẩu?
                        </Link>

                        <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, mb: 2 }}
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
                        width: 800,
                        flexGrow: 1,
                        backgroundColor: "red",
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
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openAlert.show}
                    autoHideDuration={3000}
                    onClose={() => setOpenAlert({ show: false, status: '', message: '' })}
                >
                    <Alert severity={openAlert.status === 'success' ? 'success' : 'error'} variant="filled">
                        {openAlert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};
export default Login;