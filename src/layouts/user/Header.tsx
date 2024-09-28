import { Badge, Box, Container, IconButton, ListItemButton, TextField, Tooltip, Typography } from "@mui/material";
import logo from '../../assets/logo.png';
import '../admin/Header.scss';
import { UserMenu } from "../common/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { thirdGradient } from "../../theme";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Notifications } from "@mui/icons-material";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
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

                <Box sx={{ width: "65%", pr: 20 }}>
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
                    width: "20%", 
                    pr: 5
                }}>

                    <Tooltip title="tin nhắn">
                        <IconButton>
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
                    <Tooltip title="Đăng nhập/Đăng kí">
                        <IconButton onClick={() => navigate("/login")}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>
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
        </Box>
    )
}
export default Header;