import { Box, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { navbarAdminColor, navbarHover } from '../../theme';
import logo from '../../assets/logo.png';
import '../admin/Navbar.scss';
import IconButtonGradient from '../../components/common/IconButtonGradient';

type NavbarProps = {
    isOpenNavbar: boolean;
}

const Navbar = ({ isOpenNavbar }: NavbarProps) => {
    const buttonIcon = [
        { icon: <Home />, label: 'Dashboard' },
        { icon: <ProductionQuantityLimitsIcon />, label: 'Sản phẩm' },
        { icon: <PeopleAltIcon />, label: 'Người dùng' },
        { icon: <ReceiptIcon />, label: 'Hóa đơn' },
        { icon: <StackedLineChartIcon />, label: 'Thống kê' },
        { icon: <MarkUnreadChatAltIcon />, label: 'Tin nhắn' },
        { icon: <LocationOnIcon />, label: 'Chi nhánh' },
    ]
    return <Box
        // className={`navbar ${isOpenNavbar ? "open" : "closed"}`}
        sx={{
            backgroundColor: navbarAdminColor, display: 'flex', flexDirection: 'column',
            width: isOpenNavbar ? '200px' : '80px',
            transition: 'width 0.5s',
        }}>
        <Box className={`navbar ${isOpenNavbar ? "open" : "closed"}`}
            sx={{ mt: 1 }}>
            <img src={logo} alt="Logo" className="logo-shop-item" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 5,  }}>
            {buttonIcon.map((item, index) => {
                return isOpenNavbar ?
                    (
                        <Box key={index} sx={{
                            display: 'flex', alignItems: 'center', width: '100%', mt: 4,
                            ':hover': {
                                background: navbarHover,
                                color: 'white'
                            },
                            justifyContent: 'space-around',
                
                        }}>
                            <Typography>{item.label}</Typography>
                            <IconButtonGradient >
                                {item.icon}
                            </IconButtonGradient>
                        </Box>
                    ) : (
                        <IconButtonGradient sx={{mt:4}}> 
                            {item.icon}
                        </IconButtonGradient>
                    )
            })}
        </Box>
    </Box>
}
export default Navbar;