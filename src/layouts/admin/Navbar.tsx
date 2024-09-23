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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavbarProps = {
    isOpenNavbar: boolean;
}

const Navbar = ({ isOpenNavbar }: NavbarProps) => {
    const location = useLocation();
    const buttonIcon = [
        { icon: <Home />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <ProductionQuantityLimitsIcon />, label: 'Sản phẩm', path: '/admin/products' },
        { icon: <PeopleAltIcon />, label: 'Người dùng', path: '/admin/users' },
        { icon: <ReceiptIcon />, label: 'Hóa đơn', path: '/admin/invoices' },
        { icon: <StackedLineChartIcon />, label: 'Thống kê', path: '/admin/statistics' },
        { icon: <MarkUnreadChatAltIcon />, label: 'Tin nhắn', path: '/admin/messages' },
        { icon: <LocationOnIcon />, label: 'Chi nhánh', path: '/admin/branches' },
    ];

    const [selectedLabel, setSelectedLabel] = useState(() => {
        return localStorage.getItem('selectedLabel') || 'Dashboard';
    })
    useEffect(() => {
        localStorage.setItem('selectedLabel', selectedLabel);
    }, [selectedLabel]);

    const navigate = useNavigate();

    const handleMenuItemClick = (label: string, path: string) => {
        setSelectedLabel(label);
        navigate(path);
    };

    return <Box
        // className={`navbar ${isOpenNavbar ? "open" : "closed"}`}
        sx={{
            backgroundColor: navbarAdminColor, display: 'flex', flexDirection: 'column',
            width: isOpenNavbar ? '200px' : '80px',
            transition: 'width 0.5s',
            minHeight: '100vh',
        }}>
        <Box className={`navbar ${isOpenNavbar ? "open" : "closed"}`}
            sx={{ mt: 1 }}>
            <img src={logo} alt="Logo" className="logo-shop-item" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 5, }}>
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
                            color: location.pathname === item.path ? 'red' : 'inherit',
                            cursor: 'pointer',
                        }} onClick={() => handleMenuItemClick(item.label, item.path)} >
                            <Typography>{item.label}</Typography>
                            <IconButtonGradient >
                                {item.icon}
                                
                            </IconButtonGradient>
                        </Box>
                    ) : (
                        <IconButtonGradient key={index} sx={{
                            mt: 4,
                            color: location.pathname === item.path ? 'red' : 'inherit',
                            cursor: 'pointer',
                        }}
                            onClick={() => handleMenuItemClick(item.label, item.path)}
                        >
                            {item.icon}
                            
                        </IconButtonGradient>
                    )
            })}
        </Box>
    </Box>
}
export default Navbar;