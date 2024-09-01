import { Box, Button, Container, ListItemButton, TextField, Typography } from "@mui/material";
import logo from '../../assets/logo.png';
import message from '../../assets/message.png'; // Import the message.png file
import account from '../../assets/account.png'; // Import the account.png file
import notification from '../../assets/notification.png'; // Import the notification.png file
import setting from '../../assets/setting.png'; // Import the setting.png file
import '../admin/Header.scss';
import { UserMenu } from "../common/Menu";
import { Link, useLocation } from "react-router-dom";
import { blueGradient, thirdGradient } from "../../theme";


const Header = () => {
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
                <Box sx={{ display: "flex", justifyContent: "center", width: "15%",}}>
                    <img src={logo} alt="Logo" className="logo_shop-item" />
                </Box>
                
                <Box sx={{width: "65%", pr: 20}}>
                    <TextField
                        id="search"
                        label="Search..."
                        sx={{ width: "100%"}}
                    />
                </Box>
                <Box sx={{display: "flex", width: "20%",}}>
                    <Button className="btn">
                        <img src={message} alt="Message" className="message-item" />
                    </Button>
                    <Button className="btn">
                        <img src={account} alt="Account" className="account-item" />
                    </Button>
                    <Button className="btn">
                        <img src={notification} alt="Notification" className="notification-item" />
                    </Button>
                    <Button className="btn">
                        <img src={setting} alt="Setting" className="setting-item" />
                    </Button>
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