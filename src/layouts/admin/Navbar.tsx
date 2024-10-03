import { Box, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { navbarAdminColor, navbarHover } from '../../theme';
import logo from '../../assets/logo.png';
import '../admin/Navbar.scss';
import IconButtonGradient from '../../components/common/IconButtonGradient';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreIcon from '@mui/icons-material/More';

type NavbarProps = {
    isOpenNavbar: boolean;
}

const Navbar = ({ isOpenNavbar }: NavbarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedMainItem, setSelectedMainItem] = useState('Dashboard');
    const [selectedSubItem, setSelectedSubItem] = useState('');
    const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);

    const buttonIcon = [
        { icon: <Home />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <ProductionQuantityLimitsIcon />, label: 'Sản phẩm', path: '/admin/products' },
        { icon: <PeopleAltIcon />, label: 'Người dùng', path: '/admin/users' },
        { icon: <ReceiptIcon />, label: 'Hóa đơn', path: '/admin/invoices' },
        { icon: <StackedLineChartIcon />, label: 'Thống kê' },
        { icon: <MarkUnreadChatAltIcon />, label: 'Tin nhắn', path: '/admin/messages' },
    ];

    useEffect(() => {
        const path = location.pathname;
        const mainItem = buttonIcon.find(item => item.path && path.startsWith(item.path));
        if (mainItem) {
            setSelectedMainItem(mainItem.label);
            if (mainItem.label === 'Thống kê') {
                setIsStatisticsOpen(true);
                if (path.includes('revenue')) {
                    setSelectedSubItem('Thống kê doanh thu');
                } else if (path.includes('best-sellers')) {
                    setSelectedSubItem('Sản phẩm bán chạy');
                }
            } else {
                setSelectedSubItem('');
            }
        }
    }, [location.pathname]);

    const handleMenuItemClick = (label: string, path: string) => {
        setSelectedMainItem(label);
        if (label !== 'Thống kê') {
            setSelectedSubItem('');
            setIsStatisticsOpen(false);
        }
        navigate(path);
    };

    const handleStatisticsClick = () => {
        setSelectedMainItem('Thống kê');
        setIsStatisticsOpen(!isStatisticsOpen);
    };

    const handleSubItemClick = (label: string, path: string) => {
        setSelectedSubItem(label);
        navigate(path);
    };

    const renderMenuItem = (item: any, index: number) => {
        const isSelected = selectedMainItem === item.label;
        const itemColor = isSelected ? 'red' : 'inherit';

        if (item.label === 'Thống kê') {
            return (
                <Box key={index}>
                    <Box
                        sx={{
                            display: 'flex', alignItems: 'center', width: '100%', mt: 4,
                            ':hover': { background: navbarHover, color: 'white' },
                            justifyContent: 'space-around',
                            color: itemColor,
                            cursor: 'pointer',
                        }}
                        onClick={handleStatisticsClick}
                    >
                        {isOpenNavbar && <Typography sx={{ color: itemColor }}>{item.label}</Typography>}
                        <IconButtonGradient sx={{ color: itemColor }}>{item.icon}</IconButtonGradient>
                    </Box>
                    {isOpenNavbar && isStatisticsOpen && (
                        <Box sx={{ pl : 4}}>
                            {[
                                { label: 'Thống kê doanh thu', icon: <AttachMoneyIcon />, path: '/admin/statistics/revenue' },
                                { label: 'Sản phẩm bán chạy', icon: <MoreIcon />, path: '/admin/statistics/best-sellers' }
                            ].map((subItem, subIndex) => (
                                <Box
                                    key={subIndex}
                                    sx={{
                                        display: 'flex', alignItems: 'center', width: '100%', mt: 4,
                                        ':hover': { background: navbarHover, color: 'white' },
                                        justifyContent: 'space-around',
                                        color: selectedSubItem === subItem.label ? 'red' : 'inherit',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSubItemClick(subItem.label, subItem.path)}
                                >
                                    <Typography>{subItem.label}</Typography>
                                    {subItem.icon}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            );
        }

        return isOpenNavbar ? (
            <Box
                key={index}
                sx={{
                    display: 'flex', alignItems: 'center', width: '100%', mt: 4,
                    ':hover': { background: navbarHover, color: 'white' },
                    justifyContent: 'space-around',
                    color: itemColor,
                    cursor: 'pointer',
                }}
                onClick={() => handleMenuItemClick(item.label, item.path)}
            >
                <Typography sx={{ color: itemColor }}>{item.label}</Typography>
                <IconButtonGradient sx={{ color: itemColor}}>{item.icon}</IconButtonGradient>
            </Box>
        ) : (
            <IconButtonGradient
                key={index}
                sx={{
                    mt: 4,
                    color: itemColor,
                    cursor: 'pointer',
                }}
                onClick={() => handleMenuItemClick(item.label, item.path)}
            >
                {item.icon}
            </IconButtonGradient>
        );
    };

    return (
        <Box
            sx={{
                backgroundColor: navbarAdminColor,
                display: 'flex',
                flexDirection: 'column',
                width: isOpenNavbar ? '200px' : '80px',
                transition: 'width 0.5s',
                minHeight: '100vh',
            }}
        >
            <Box className={`navbar ${isOpenNavbar ? "open" : "closed"}`} sx={{ mt: 1 }}>
                <img src={logo} alt="Logo" className="logo-shop-item" />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 5 }}>
                {buttonIcon.map(renderMenuItem)}
            </Box>
        </Box>
    );
};

export default Navbar;