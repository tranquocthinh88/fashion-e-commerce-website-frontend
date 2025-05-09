import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Alert, Box, Snackbar } from '@mui/material';
import { ChangePasswordDto } from '../../../dtos/requests/user/change.password.dto';
import { useFormik } from "formik";
import * as yup from 'yup';
import { changePassword, getUserFromLocalStorage } from '../../../services/user.service';
import CustomTextField from '../TextFieldCustom';
import { logout, removeLocalStorage } from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../services/token.service';
import { LoginResponse } from '../../../dtos/responses/login.response';
import { ResponseSuccess } from '../../../dtos/responses/response.success';

type Props = {
    open: boolean;
    handleClose: () => void;
}

type ChangePasswordForm = ChangePasswordDto & {
    confirmPassword: string
}
const validationRegisterSchema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    oldPassword: yup.string()
        .required('Vui lòng nhập mật khẩu').min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    newPassword: yup.string()
        .required('Vui lòng nhập mật khẩu').min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
});

const DialogChangePassword = ({ open, handleClose }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const user = getUserFromLocalStorage();
    const navigate = useNavigate();

    const formikChangePassword = useFormik({
        initialValues: {
            email: user?.email || '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: validationRegisterSchema,
        onSubmit: async (values: ChangePasswordForm) => {

            const { confirmPassword, ...useChangePassword } = values;

            try {
                const response: ResponseSuccess<String> = await changePassword(useChangePassword);

                if (response.status === 409) {
                    showAlert('error', 'Đổi mật khẩu không thành công. Mật khẩu cũ không đúng!');
                    return;
                }
                showAlert('success', 'Đổi mật khẩu thành công. Đăng nhập lại tài khoản!');
                const token: LoginResponse | null = getToken();
                await logout(token?.refreshToken || '');
                removeLocalStorage();
                handleClose();
                navigate('/');
            } catch (error) {
                showAlert('error', 'Đổi mật khẩu không thành công. Mật khẩu cũ không đúng!');
                console.log(error);
            }

        },
    })


    const [openAlert, setOpenAlert] = React.useState({
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

    const handleCloseAlert = () => {
        setOpenAlert({ ...openAlert, show: false });
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-change-password"
            >
                <DialogTitle id="dialog-change-password">
                    {"Đổi mật khẩu"}
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Box sx={{ width: "100%", mb: 1, mt: 1 }}>
                            <CustomTextField label="Mật khẩu cũ" id="oldPassword" name="oldPassword" type="password" formik={formikChangePassword} width="100%" />
                        </Box>
                        <Box sx={{ width: "100%", mb: 1 }}>
                            <CustomTextField label="Mật khẩu mới" id="newPassword" name="newPassword" type="password" formik={formikChangePassword} width="100%" />
                        </Box>
                        <Box sx={{ width: "100%", mb: 1 }}>
                            <CustomTextField label="Xác thực mật khẩu" id="confirmPassword" name="confirmPassword" type="password" formik={formikChangePassword} width="100%" />
                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => formikChangePassword.handleSubmit()}
                        autoFocus
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert.show}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <Alert severity={openAlert.status === 'success' ? 'success' : 'error'} variant="filled">
                    {openAlert.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default DialogChangePassword;
