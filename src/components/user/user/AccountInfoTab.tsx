import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Backdrop, CircularProgress, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Snackbar, Alert } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { userUpdateDto } from '../../../dtos/requests/user/user.update.dto';
import { UserModel, Gender } from '../../../models/user.model';
import { ResponseSuccess } from '../../../dtos/responses/response.success';
import { getUserFromLocalStorage, saveUserToLocalStorage, updateUser, uploadAvatar } from '../../../services/user.service';
import dayjs, { Dayjs } from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';
import { navbarHover } from '../../../theme';
import DialogChangePassword from '../../common/dialogs/DialogChangePassword';

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AccountInfoTab = ({ showAlert }: { showAlert: (status: string, message: string) => void }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState<{ show: boolean, status: string, message: string }>({ show: false, status: '', message: '' });
    const [openDialogChangePassword, setOpenDialogChangePassword] = useState(false);

    const handleCloseDialogChangePassword = () => {
        setOpenDialogChangePassword(false);
    }


    const user: UserModel | null = getUserFromLocalStorage();

    // Lưu trữ thông tin ban đầu của người dùng
    const initialUser = user ? {
        username: user.username || "",
        phone: user.phone || "",
        avatarUrl: user.avatarUrl || "",
        gender: user.gender || "",
        dateOfBirth: dayjs(user.dateOfBirth) || dayjs('1990-01-01'),
        street: user.address?.street || "",
        district: user.address?.district || "",
        city: user.address?.city || ""
    } : null;

    const [username, setUserName] = useState<string>(initialUser?.username || "");
    const [phone, setPhone] = useState<string>(initialUser?.phone || "");
    const [avatarUrl, setAvatarUrl] = useState<string>(initialUser?.avatarUrl || "");
    const [gender, setGender] = useState<string>(initialUser?.gender || "");
    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(initialUser?.dateOfBirth || dayjs('1990-01-01'));
    const [street, setStreet] = useState<string>(initialUser?.street || "");
    const [district, setDistrict] = useState<string>(initialUser?.district || "");
    const [city, setCity] = useState<string>(initialUser?.city || "");

    // Kiểm tra sự thay đổi trong form
    const hasFormChanged = () => {
        return (
            username !== initialUser?.username ||
            phone !== initialUser?.phone ||
            avatarUrl !== initialUser?.avatarUrl ||
            gender !== initialUser?.gender ||
            !dayjs(dateOfBirth).isSame(initialUser?.dateOfBirth, 'day') ||
            street !== initialUser?.street ||
            district !== initialUser?.district ||
            city !== initialUser?.city
        );
    };

    // Hàm xử lý upload ảnh đại diện
    const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleUploadAvatar triggered");
        const files = e.target.files;
        if (files && files.length > 0) {
            try {
                const response: ResponseSuccess<string> = await uploadAvatar(files[0]);
                setAvatarUrl(response.data);
                console.log("Kiểm tra: ", response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Hàm xử lý cập nhật thông tin người dùng
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 500);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateInfo = async () => {
        console.log("handleUpdateInfo triggered");
        setIsUpdating(true);

        try {
            let gd: Gender = Gender.MALE;
            if (gender === "FEMALE") {
                gd = Gender.FEMALE;
            }

            const userUpdateDto: userUpdateDto = {
                username: username,
                phone: phone,
                address: {
                    street: street,
                    district: district,
                    city: city
                },
                gender: gd,
                avatarUrl: avatarUrl,
                dateOfBirth: dateOfBirth ? dateOfBirth.add(1, 'day').toDate().toISOString() : ''
            };

            console.log("userUpdateDto: ", userUpdateDto);

            const response: ResponseSuccess<UserModel> = await updateUser(user?.email || "", userUpdateDto);
            saveUserToLocalStorage(response.data);

            showAlert('success', 'Cập nhật thông tin thành công');
            setIsUpdating(false);
        } catch (error) {
            console.log(error);
            showAlert('error', 'Cập nhật thông tin thất bại');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>

            <Box sx={{ display: 'flex', width: '80vw', height: '100vh' }}>
                <Box sx={{ width: '60%', }}>
                    <Typography variant="h6">Thông tin tài khoản</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ width: '120px', }}>
                            Email:
                        </Typography>
                        <TextField
                            sx={{
                                flexBasis: '200px',
                                display: 'flex',
                                flexGrow: 1
                            }}
                            name="email"
                            value={user?.email}
                            disabled
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
                        <Typography sx={{ width: '120px', }}>
                            Họ và tên:
                        </Typography>
                        <TextField
                            sx={{
                                flexBasis: '200px',
                                display: 'flex',
                                flexGrow: 1,
                            }}
                            name="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
                        <Typography sx={{ width: '120px', }}>
                            Số điện thoại:
                        </Typography>
                        <TextField
                            sx={{
                                flexBasis: '200px',
                                display: 'flex',
                                flexGrow: 1
                            }}
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Box>
                    <Box >
                        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ width: '120px', }}>Giới tính</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
                                <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ width: '120px', }}>
                            Ngày sinh:
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker value={dateOfBirth} onChange={(e) => setDateOfBirth(e)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography sx={{ width: '120px', }}>
                            Địa chỉ:
                        </Typography>
                        <Box >
                            <Box sx={{
                                pt: 2,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px'
                            }}>
                                <TextField
                                    sx={{
                                        flexBasis: '200px',
                                        display: 'flex',
                                        flexGrow: 1
                                    }}
                                    value={`${street}, ${district}, ${city}`}
                                    label="Địa chỉ"
                                    name="address"
                                    disabled
                                />
                            </Box>

                            <Box sx={{
                                pt: 2,
                                display: 'flex',
                                // flexWrap: 'wrap',
                                gap: '20px'
                            }}>
                                <TextField
                                    sx={{
                                        flexBasis: '200px',
                                        display: 'flex',
                                        flexGrow: 1
                                    }}
                                    value={street}
                                    label="Tên đường"
                                    name="street"
                                    onChange={(e) => setStreet(e.target.value)}

                                />
                                <TextField
                                    sx={{
                                        flexBasis: '200px',
                                        display: 'flex',
                                        flexGrow: 1
                                    }}
                                    value={district}
                                    label="Quận/huyện"
                                    name="district"
                                    onChange={(e) => setDistrict(e.target.value)}

                                />
                            </Box>
                            <Box sx={{
                                pt: 2,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px'
                            }}>
                                <TextField
                                    sx={{
                                        flexBasis: '200px',
                                        display: 'flex',
                                        flexGrow: 1
                                    }}
                                    value={city}
                                    label="Tỉnh/thành phố"
                                    name="city"
                                    onChange={(e) => setCity(e.target.value)}

                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { handleUpdateInfo(); handleOpen(); }}
                            disabled={!hasFormChanged() || isUpdating}
                        >
                            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                        </Button>
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={open}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Box>
                </Box>

                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">Ảnh đại diện</Typography>
                    <Box>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                            />
                        ) : (
                            <Typography>Không có ảnh đại diện</Typography>
                        )}
                    </Box>
                    <Box>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                ':hover': {
                                    background: navbarHover,
                                    color: 'white'
                                },
                                backgroundColor: '#E6B9DB'
                            }}
                        >
                            Tải lên ảnh
                            <VisuallyHiddenInput type="file" accept={"image/*"} onChange={handleUploadAvatar} />
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                ':hover': {
                                    background: navbarHover,
                                    color: 'white'
                                },
                                // backgroundColor: '#E6B9DB'
                            }}
                            onClick={() => setOpenDialogChangePassword(true)}
                        >
                          Đổi mật khẩu
                           
                        </Button>
                        {openDialogChangePassword &&
                        <DialogChangePassword
                            open={openDialogChangePassword}
                            handleClose={handleCloseDialogChangePassword}
                        />}
                    </Box>
                </Box>

            </Box>

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
    );
};

export default AccountInfoTab;
