import { Avatar, Badge, Box, Button, Container, IconButton, ListItemButton, Menu, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import logo from '../../assets/logo.png';
import '../admin/Header.scss';
import { UserMenu } from "../common/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { thirdGradient } from "../../theme";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailIcon from '@mui/icons-material/Mail';
import { Notifications } from "@mui/icons-material";
import { useState } from "react";
import RoomChat from "../../pages/user/chat/RoomChat";
import ProtectRouter from "../../routes/ProtectRoutes";
import { Role, UserModel } from "../../models/user.model";
import { getUserFromLocalStorage, isLoginAccount } from "../../services/user.service";
import { LoginResponse } from "../../dtos/responses/login.response";
import { getToken } from "../../services/token.service";
import { logout, removeLocalStorage } from "../../services/auth.service";
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const login: boolean = isLoginAccount();
    const user: UserModel | null = getUserFromLocalStorage();

    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
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
                <Box sx={{ display: "flex", justifyContent: "center", width: "15%", }}>
                    <img src={logo} alt="Logo" className="logo_shop-item" />
                </Box>

                <Box sx={{ width: "60%", pr: 20 }}>
                    <TextField
                        id="search"
                        label="Search..."
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "25%",
                    pr: 5
                }}>

                    <Tooltip title="tin nhắn">
                        <IconButton onClick={toggleChat}>
                            <Badge badgeContent={4} color="primary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="giỏ hàng">
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="thông báo">
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <Notifications />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    {login ? <>
                        <Tooltip title={user ? user.username : "tài khoản"}>
                            <IconButton onClick={handleClickAvatar}>
                                <Avatar alt={user?.username} src={user?.avatarUrl}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: randomColor,
                                    }}>  {user?.avatarUrl ? null : user?.username?.charAt(0).toUpperCase()}</Avatar>
                                <></>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={()=> {
                                window.location.href = `/user/${user?.email}`;
                            }}>Quản lý tài khoản</MenuItem>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </>
                        : <Button variant="contained" sx={{ textTransform: 'none' }}
                            onClick={() => {
                                localStorage.setItem("historyPath", location.pathname);
                                navigate('/login', { state: { from: location.pathname } });
                            }}
                        >Đăng nhập</Button>}
                </Box>
            </Box>
            <Container>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: thirdGradient,
                    width: '90%',
                }}>
                    {UserMenu.map((item: any, index: number) => (
                        <ListItemButton key={index} component={Link} to={item.href} sx={{
                            display: "flex",
                            justifyContent: "center",
                            ':hover': {
                                background: thirdGradient,
                                color: 'white'
                            },
                            // background: location.pathname.startsWith(item.href) ? primaryGradient : 'none',
                            color: location.pathname.startsWith(item.href) ? 'black' : 'none',
                            textDecoration: 'none',
                            pl: 1, pr: 1,

                        }}>
                            <Typography>{item.title}</Typography>
                        </ListItemButton>
                    ))}
                </Box>
            </Container>
            {isChatOpen &&
                <ProtectRouter role={Role.ROLE_USER}> <RoomChat /></ProtectRouter>

            }
        </Box>
    )
}
export default Header;