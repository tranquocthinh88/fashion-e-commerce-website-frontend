import { Box, Button, TextField, } from "@mui/material";
import message from '../../assets/message.png';
import account from '../../assets/account.png';
import notification from '../../assets/notification.png';
import setting from '../../assets/setting.png';
import navbar from '../../assets/navbar.png';
import '../admin/Header.scss';

type HeaderProps = {
    handleOpenNavbar: () => void;
}

const Header = ({handleOpenNavbar} : HeaderProps) => {
    return (
        <Box>
            <Box sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 1, pb: 1,
            }}>
                <Box sx={{
                    display: "flex", width: "10%", transition: "transform 0.3s ease-in-out",
                    '&:hover': {
                        transform: "scale(1.1)",
                    }
                }} onClick={handleOpenNavbar}>
                    <img src={navbar} alt="Navbar" className="navbar-item" />
                </Box>

                <Box sx={{ width: "35%", marginRight: 40 }}>
                    <TextField
                        id="search"
                        label="Search..."
                        variant="outlined"
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box sx={{ display: "flex", width: "20%", }}>
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
        </Box>
    )
}
export default Header;