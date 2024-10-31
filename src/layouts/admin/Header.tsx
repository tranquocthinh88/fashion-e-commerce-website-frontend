import { Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import ReorderIcon from '@mui/icons-material/Reorder';
import { navbarHover } from "../../theme";
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProtectRouter from "../../routes/ProtectRoutes";
import { Role, UserModel } from "../../models/user.model";
import RoomChat from "../../pages/user/chat/RoomChat";
import { getUserFromLocalStorage, isLoginAccount } from "../../services/user.service";
import { getToken } from "../../services/token.service";
import { LoginResponse } from "../../dtos/responses/login.response";
import { logout, removeLocalStorage } from "../../services/auth.service";

type HeaderProps = {
    handleOpenNavbar: () => void;
}

const Header = ({ handleOpenNavbar }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const user: UserModel | null = getUserFromLocalStorage();
    const login: boolean = isLoginAccount() && user?.role === 'ROLE_ADMIN';

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    }

    const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const token: LoginResponse | null = getToken();
        if (token) {
            try {
                await logout(token.refreshToken);
                removeLocalStorage();
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const randomColor = user?.avatarUrl ? 'transparent' : getRandomColor();

    return (
        <Box>
            <Box sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 2, pb: 2,
            }}>
                <Box sx={{
                    display: "flex",
                    marginLeft: 10,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ':hover': {
                        background: navbarHover,
                        color: 'white',
                        borderRadius: '50%',
                        transition: 'background 0.5s ease-in-out',
                    }
                }} onClick={handleOpenNavbar}>
                    <ReorderIcon sx={{ fontSize: 40 }} />
                </Box>

                <Box sx={{ width: "35%", marginRight: 40 }}>
                    <TextField
                        id="search"
                        label="Tìm kiếm..."
                        variant="outlined"
                        sx={{ width: "100%" }}
                    />
                </Box>

                <Box sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    marginRight: 2,
                }}>
                    <Tooltip title="Tin nhắn">
                        <IconButton onClick={toggleChat}>
                            <Badge badgeContent={4} color="primary">
                                <MessageIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Thông báo">
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cài đặt">
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    {login ? (
                        <>
                            <Tooltip title={user ? user.username : "Tài khoản"}>
                                <IconButton onClick={handleAccountClick}>
                                    <Avatar alt={user?.username} src={user?.avatarUrl}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            backgroundColor: randomColor,
                                        }}>
                                        {user?.avatarUrl ? null : user?.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleAccountClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={() => {
                                    navigate(`/admin/account`);
                                    handleAccountClose();
                                }}>Quản lý tài khoản</MenuItem>
                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button variant="contained" sx={{ textTransform: 'none' }}
                            onClick={() => {
                                localStorage.setItem("historyPath", location.pathname);
                                navigate('/login', { state: { from: location.pathname } });
                            }}
                        >Đăng nhập</Button>
                    )}
                </Box>
            </Box>

            {isChatOpen &&
                <ProtectRouter role={Role.ROLE_ADMIN}>
                    <RoomChat />
                </ProtectRouter>
            }
        </Box>
    );
}

export default Header;