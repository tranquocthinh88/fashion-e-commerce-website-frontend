import { Box, TextField, } from "@mui/material";
import ReorderIcon from '@mui/icons-material/Reorder';
import { navbarHover } from "../../theme";
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

type HeaderProps = {
    handleOpenNavbar: () => void;
}

const Header = ({ handleOpenNavbar }: HeaderProps) => {
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
                        label="Search..."
                        variant="outlined"
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ':hover': {
                        background: navbarHover,
                        color: 'white',
                        borderRadius: '50%',
                        transition: 'background 0.5s ease-in-out',
                    }
                }} >
                    <AccountCircleIcon />
                </Box>
                <Box sx={{ display: "flex", width: "20%", justifyContent: 'space-around' }}>
                    <Box sx={{
                        display: "flex",
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ':hover': {
                            background: navbarHover,
                            color: 'white',
                            borderRadius: '50%',
                            transition: 'background 0.5s ease-in-out',
                        }
                    }} >
                        <MessageIcon />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ':hover': {
                            background: navbarHover,
                            color: 'white',
                            borderRadius: '50%',
                            transition: 'background 0.5s ease-in-out',
                        }
                    }} >
                        <NotificationsIcon />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ':hover': {
                            background: navbarHover,
                            color: 'white',
                            borderRadius: '50%',
                            transition: 'background 0.5s ease-in-out',
                        }
                    }} >
                        <SettingsIcon />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Header;