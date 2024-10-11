import { Box, Button, TextField, Typography } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import './Login&Register.scss';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/common/TextFieldCustom";
import { RegisterRequestDto } from "../../../dtos/requests/register.dto";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useState } from "react";
import { register, verifyEmail } from "../../../services/auth.service";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { VerifyEmailDto } from "../../../dtos/requests/verify.dto";

type RegisterForm = RegisterRequestDto & {
    confirmPassword: string
}
const validationRegisterSchema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    username: yup.string().required('Vui lòng nhập họ và tên'),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu').min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    phone: yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
});

const Register = () => {
    const navigate = useNavigate();
    const [errorEmail, setErrorEmail] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const formikRegister = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            phone: ''
        },
        validationSchema: validationRegisterSchema,
        onSubmit: async (values: RegisterForm) => {
            const userRegisterDto: RegisterRequestDto = values;
            try {
                await register(userRegisterDto);
                setIsRegistered(true);
            } catch (error) {
                setErrorEmail("Email đã được sử dụng");
            }
        },
    })

    const handelVerify = async () => {

        const verifyEmailDto: VerifyEmailDto = {
            email: formikRegister.values.email ?? "",
            otp
        }
        try {
            const response: ResponseSuccess<string> = await verifyEmail(verifyEmailDto);
            if (response.status === 200) { 
                console.log(response.data);
                navigate("/login");  
            } else {
                setError("Otp không chính xác");
            }
        } catch (error) {
            setError("Otp không chính xác")
        }
    }
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: bodyAdminColor }}>
            <Box className="red-panel" sx={{ width: 800, minHeight: 400, display: 'flex' }}>
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
                    width: 800, minHeight: 400, backgroundColor: "white",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>

                    {isRegistered ? (
                        <>
                            <Typography variant="h4" sx={{ color: 'black' }}>Nhập OTP xác thực</Typography>
                            <Typography variant="body1" sx={{ color: 'black', fontSize: 15, textAlign: 'center' }} >
                                Chúng tôi đã gửi mã OTP đến địa chỉ <strong>{formikRegister.values.email}</strong>.
                                Vui lòng kiểm tra và nhập OTP để hoàn thành đăng ký.
                            </Typography>
                            <TextField
                                helperText="Vui lòng nhập OTP"
                                id="otp"
                                label="OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10 }}
                                onClick={handelVerify}>
                                Xác thực
                            </Button>
                            {error && <Typography component={'span'} sx={{ color: 'red' }}>{error}</Typography>}
                        </>
                    ) : (
                        <>
                            <Box sx={{ fontSize: 25, fontWeight: 'bold' }}>Tạo tài khoản</Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', alignItems: 'center' }}>
                                <CustomTextField label="Tên tài khoản" id="username" name="username" type="text" formik={formikRegister} />
                                <CustomTextField label="Email" id="email" name="email" type="email" formik={formikRegister} />
                                <CustomTextField label="Mật khẩu" id="password" name="password" type="password" formik={formikRegister} />
                                <CustomTextField label="Xác thực mật khẩu" id="confirmPassword" name="confirmPassword" type="password" formik={formikRegister} />
                                <CustomTextField label="Số điện thoại" id="phone" name="phone" type="text" formik={formikRegister} />
                                {errorEmail && <Typography component={'span'} sx={{ color: 'red' }}>{errorEmail}</Typography>}
                                <Button variant="contained"
                                    sx={{ backgroundColor: 'red', color: 'white', width: 150, borderRadius: 10, mb: 2 }}
                                    onClick={() => formikRegister.submitForm()}
                                >
                                    Đăng ký
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default Register;