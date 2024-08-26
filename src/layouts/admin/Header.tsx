import { Box, Button, TextField } from "@mui/material";
import logo from '../../assets/logo.png';
import navbar from '../../assets/navbar.png';
import message from '../../assets/message.png'; // Import the message.png file
import account from '../../assets/account.png'; // Import the account.png file
import notification from '../../assets/notification.png'; // Import the notification.png file
import setting from '../../assets/setting.png'; // Import the setting.png file
import './Header.scss'; // Import the Header.scss file

const Header = () => {
    return (
        <Box sx={{ backgroundColor: "white", height: 115 }}>
            <img src={logo} alt="Logo" className="logo_shop-item" />
            <Button sx={{ width: 10, height: 50, borderRadius: 10, marginLeft: 10, marginBottom: 10 }}>
                <img src={navbar} alt="Navbar" className="navbar-item" />
            </Button>
            <TextField
                id="search"
                label="Search..."
                sx={{ width: 400, marginLeft: 5, marginTop: 5 }}
            />
            <Button sx={{ width: 10, height: 50, marginLeft: 40, marginBottom: 10 }}>
                <img src={message} alt="Message" className="message-item" />
            </Button>
            <Button sx={{ width: 10, height: 50, marginLeft: 5, marginBottom: 10 }}>
                <img src={account} alt="Account" className="account-item" />
            </Button>
            <Button sx={{ width: 10, height: 50, marginLeft: 5, marginBottom: 10 }}>
                <img src={notification} alt="Notification" className="notification-item" />
            </Button>
            <Button sx={{ width: 10, height: 50, marginLeft: 5, marginBottom: 10 }}>
                <img src={setting} alt="Setting" className="setting-item" />
            </Button>
        </Box>
    )
}

export default Header;