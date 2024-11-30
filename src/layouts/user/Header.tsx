// import { Avatar, Badge, Box, Button, Container, IconButton, ListItemButton, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
// import logo from '../../assets/logo.png';
// import '../admin/Header.scss';
// import { UserMenu } from "../common/Menu";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { secondaryGradient, thirdGradient } from "../../theme";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import MailIcon from '@mui/icons-material/Mail';
// import { Notifications } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import RoomChat from "../../pages/user/chat/RoomChat";
// import ProtectRouter from "../../routes/ProtectRoutes";
// import { Role, UserModel } from "../../models/user.model";
// import { getUserFromLocalStorage, isLoginAccount } from "../../services/user.service";
// import { LoginResponse } from "../../dtos/responses/login.response";
// import { getToken } from "../../services/token.service";
// import { logout, removeLocalStorage } from "../../services/auth.service";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/stores/store";
// import NotificationView from "../../components/common/NotificationView";
// import { getProductsForUser } from "../../services/product.service";
// import { ProductUserResponse } from "../../dtos/responses/products/productUser-response";
// import { ResponseSuccess } from "../../dtos/responses/response.success";
// import { PageResponse } from "../../dtos/responses/page.response";
// import { ConvertPrice } from "../../utils/convert.price";
// const Header = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const login: boolean = isLoginAccount();
//     const user: UserModel | null = getUserFromLocalStorage();
//     const cart = useSelector((state: RootState) => state.cart.items);
//     const notifications = useSelector((state: RootState) => state.notification.items);

//     const [isChatOpen, setIsChatOpen] = useState(false);

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const toggleChat = () => {
//         setIsChatOpen(!isChatOpen);
//     }
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
//     const openMenu = Boolean(anchorEl);
//     const openMenu2 = Boolean(anchorE2);

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleClose2 = () => {
//         setAnchorE2(null);
//     };
//     const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClickNotify = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorE2(event.currentTarget);
//     };
//     const handleLogout = async () => {
//         const token: LoginResponse | null = getToken();
//         if (token) {
//             try {
//                 await logout(token.refreshToken);
//                 removeLocalStorage();
//                 navigate("/");
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }

//     const randomColor = user?.avatarUrl ? 'transparent' : getRandomColor();

//     const [search, setSearch] = useState<string>('');
//     const [searchResult, setSearchResult] = useState<ProductUserResponse[]>([]);


//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response: ResponseSuccess<PageResponse<ProductUserResponse[]>> = await getProductsForUser(1, 10, [{
//                     field: "productName",
//                     operator: ":",
//                     value: search
//                 }], []);
//                 console.log(response.data.data);

//                 setSearchResult(response.data.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if (search.trim() !== "") {
//             fetchProducts();
//         } else {
//             setSearchResult([]);
//         }
//     }, [search]);
//     const handleClick = () => {
//         setSearch('');
//         setSearchResult([]);
//     }
//     return (
//         <Box>
//             <Box>
//                 <Box sx={{
//                     backgroundColor: "white",
//                     display: "flex",
//                     flexDirection: "row", // Luôn là row để logo và thanh tìm kiếm nằm ngang
//                     justifyContent: isMobile ? "space-between" : "space-between",
//                     alignItems: "center",
//                     pt: isMobile ? 1 : 2,
//                     px: isMobile ? 1 : 5,
//                     flexWrap: isMobile ? 'wrap' : 'nowrap', // Cho phép chuyển xuống dòng khi không đủ chỗ
//                 }}>
//                     {/* Logo và Search */}
//                     <Box sx={{ display: "flex", alignItems: "center", width: isMobile ? "100%" : "60%", gap: 2 }}>
//                         <Box sx={{ display: "flex", justifyContent: "center" }}>
//                             <img style={{ width: isMobile ? '40px' : '80px', height: isMobile ? '40px' : '80px' }} src={logo} alt="Logo" className="logo_shop-item" />
//                         </Box>
//                         <Box sx={{ flex: 1 }}>
//                             <TextField
//                                 id="search"
//                                 label="Nhập sản phẩm cần tìm..."
//                                 sx={{ width: "100%" }}
//                                 value={search}
//                                 onChange={e => setSearch(e.target.value)}
//                             />
//                             {searchResult.length > 0 && (
//                                 <Box
//                                     sx={{
//                                         position: 'absolute',
//                                         width: isMobile ? '90%' : '60%',
//                                         top: '100%',
//                                         left: 0,
//                                         right: 0,
//                                         backgroundColor: 'white',
//                                         border: '1px solid #ccc',
//                                         zIndex: 10,
//                                         overflowY: 'auto',
//                                     }}
//                                 >
//                                     {searchResult.map((product: ProductUserResponse) => (
//                                         <Box
//                                             key={product.product.id}
//                                             sx={{
//                                                 display: "flex",
//                                                 gap: 2,
//                                                 alignItems: "center",
//                                                 borderBottom: '1px solid #eee',
//                                                 pointerEvents: 'all',
//                                                 transition: 'transform 0.3s ease, background 0.3s ease',
//                                                 ':hover': {
//                                                     background: '#eee',
//                                                     cursor: 'pointer',
//                                                     transform: 'scale(0.95)',
//                                                 },
//                                             }}
//                                             onClick={() => { handleClick(); window.location.href = `/products/${product.product.id}`; }}
//                                         >
//                                             <img src={product.product.thumbnail} alt={product.product.productName} style={{ width: "50px", height: "50px" }} />
//                                             <Typography sx={{ width: '78%', maxHeight: '40px' }}>{product.product.productName}</Typography>
//                                             <Typography sx={{ color: 'red' }}>{ConvertPrice(product.priceFinal)}</Typography>
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             )}
//                         </Box>
//                     </Box>

//                     {/* Icons và Tài khoản */}
//                     <Box sx={{
//                         display: "flex",
//                         gap: 2,
//                         justifyContent: isMobile ? "center" : "flex-end",
//                         alignItems: "center",
//                         width: isMobile ? "100%" : "auto",
//                         pt: isMobile ? 1 : 0,
//                     }}>
//                         <Tooltip title="tin nhắn">
//                             <IconButton onClick={toggleChat}>
//                                 <Badge badgeContent={4} color="primary">
//                                     <MailIcon />
//                                 </Badge>
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="giỏ hàng" onClick={() => { navigate("/cart") }}>
//                             <IconButton>
//                                 <Badge badgeContent={cart.length} color="primary">
//                                     <ShoppingCartIcon />
//                                 </Badge>
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="thông báo">
//                             <IconButton onClick={handleClickNotify}>
//                                 <Badge badgeContent={notifications.length} color="primary">
//                                     <Notifications fontSize="small" />
//                                 </Badge>
//                             </IconButton>
//                         </Tooltip>
//                         <Menu
//                             id="basic-menu"
//                             anchorEl={anchorE2}
//                             open={openMenu2}
//                             onClose={handleClose2}
//                             MenuListProps={{
//                                 'aria-labelledby': 'basic-button',
//                             }}
//                             sx={{ maxHeight: "50%" }}
//                         >
//                             {notifications.map((notification) => (
//                                 <NotificationView key={notification.id} notification={notification} />
//                             ))}
//                         </Menu>
//                         {login ? (
//                             <>
//                                 <Tooltip title={user ? user.username : "tài khoản"}>
//                                     <IconButton onClick={handleClickAvatar}>
//                                         <Avatar alt={user?.username} src={user?.avatarUrl}
//                                             sx={{
//                                                 width: 24,
//                                                 height: 24,
//                                                 backgroundColor: randomColor,
//                                             }}>  {user?.avatarUrl ? null : user?.username?.charAt(0).toUpperCase()}</Avatar>
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Menu
//                                     id="basic-menu"
//                                     anchorEl={anchorEl}
//                                     open={openMenu}
//                                     onClose={handleClose}
//                                     MenuListProps={{
//                                         'aria-labelledby': 'basic-button',
//                                     }}
//                                 >
//                                     <MenuItem onClick={() => {
//                                         window.location.href = `/user/${user?.email}`;
//                                     }}>Quản lý tài khoản</MenuItem>
//                                     <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
//                                 </Menu>
//                             </>
//                         ) : (
//                             <Button variant="contained" sx={{ textTransform: 'none' }}
//                                 onClick={() => {
//                                     localStorage.setItem("historyPath", location.pathname);
//                                     navigate('/login', { state: { from: location.pathname } });
//                                 }}
//                             >Đăng nhập</Button>
//                         )}
//                     </Box>
//                 </Box>
//             </Box>
//             <Container>
//                 {/* <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: isMobile ? 'column' : 'row', // Chuyển sang column khi màn hình nhỏ
//                         justifyContent: isMobile ? 'center' : 'center',
//                         alignItems: 'center',
//                         backgroundColor: thirdGradient,
//                         backdropFilter: 'blur(15px)',
//                         width: isMobile ? '95%' : '60%', // Điều chỉnh kích thước phù hợp với màn hình nhỏ
//                         position: isMobile ? 'relative' : 'fixed', // Sử dụng position relative cho mobile để không đè lên header
//                         left: isMobile ? '0%' : '20%',
//                         borderRadius: '12px',
//                         zIndex: 2,
//                         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//                         padding: isMobile ? '5px' : '10px',
//                         gap: isMobile ? '8px' : '12px', // Giảm khoảng cách giữa các phần tử khi ở chế độ di động
//                         top: isMobile ? '0' : 'auto', // Điều chỉnh vị trí khi ở màn hình nhỏ
//                         marginTop: isMobile ? '70px' : '0', // Đặt margin-top cho màn hình nhỏ để không đè lên header
//                     }}
//                 >
//                     {UserMenu.map((item: any, index: number) => (
//                         <ListItemButton
//                             key={index}
//                             component={Link}
//                             to={item.href}
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: 'center',
//                                 width: isMobile ? '100%' : 'auto', // Đặt full chiều rộng khi màn hình nhỏ
//                                 borderRadius: '8px',
//                                 textDecoration: 'none',
//                                 transition: 'all 0.3s ease',
//                                 color: location.pathname.startsWith(item.href) ? 'black' : '#666',
//                                 background: location.pathname.startsWith(item.href) ? secondaryGradient : 'transparent',
//                                 boxShadow: location.pathname.startsWith(item.href)
//                                     ? '0 4px 8px rgba(0, 0, 0, 0.2)'
//                                     : 'none',
//                                 ':hover': {
//                                     background: thirdGradient,
//                                     color: 'white',
//                                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                                 },
//                             }}
//                         >
//                             <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                                 {item.title}
//                             </Typography>
//                         </ListItemButton>
//                     ))}
//                 </Box> */}
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'space-around',
//                         alignItems: 'center',
//                         backgroundColor: thirdGradient,
//                         width: '100%',
//                         maxWidth: '100%',
//                         position: 'relative',
//                         borderRadius: '8px',
//                         zIndex: 1,
//                         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
//                         padding: '10px',
//                         marginTop: '10px',
//                     }}
//                 >
//                     {UserMenu.map((item: any, index: number) => (
//                         <ListItemButton
//                             key={index}
//                             component={Link}
//                             to={item.href}
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: 'center',
//                                 width: 'auto',
//                                 borderRadius: '8px',
//                                 textDecoration: 'none',
//                                 transition: 'all 0.3s ease',
//                                 color: location.pathname.startsWith(item.href) ? 'black' : '#666',
//                                 background: location.pathname.startsWith(item.href) ? secondaryGradient : 'transparent',
//                                 boxShadow: location.pathname.startsWith(item.href)
//                                     ? '0 4px 8px rgba(0, 0, 0, 0.2)'
//                                     : 'none',
//                                 ':hover': {
//                                     background: thirdGradient,
//                                     color: 'white',
//                                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                                 },
//                             }}
//                         >
//                             <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                                 {item.title}
//                             </Typography>
//                         </ListItemButton>
//                     ))}
//                 </Box>
//             </Container>
//             {isChatOpen &&
//                 <ProtectRouter role={Role.ROLE_USER}> <RoomChat /></ProtectRouter>

//             }
//         </Box>
//     )
// }
// export default Header;
import { Avatar, Badge, Box, Button, Container, IconButton, ListItemButton, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import logo from '../../assets/logo.png';
import '../admin/Header.scss';
import { UserMenu } from "../common/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { secondaryGradient, thirdGradient } from "../../theme";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailIcon from '@mui/icons-material/Mail';
import { Notifications } from "@mui/icons-material";
import { useEffect, useState } from "react";
import RoomChat from "../../pages/user/chat/RoomChat";
import ProtectRouter from "../../routes/ProtectRoutes";
import { Role, UserModel } from "../../models/user.model";
import { getUserFromLocalStorage, isLoginAccount } from "../../services/user.service";
import { LoginResponse } from "../../dtos/responses/login.response";
import { getToken } from "../../services/token.service";
import { logout, removeLocalStorage } from "../../services/auth.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/store";
import NotificationView from "../../components/common/NotificationView";
import { getProductsForUser } from "../../services/product.service";
import { ProductUserResponse } from "../../dtos/responses/products/productUser-response";
import { ResponseSuccess } from "../../dtos/responses/response.success";
import { PageResponse } from "../../dtos/responses/page.response";
import { ConvertPrice } from "../../utils/convert.price";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const login: boolean = isLoginAccount();
    const user: UserModel | null = getUserFromLocalStorage();
    const cart = useSelector((state: RootState) => state.cart.items);
    const notifications = useSelector((state: RootState) => state.notification.items);

    const [isChatOpen, setIsChatOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const openMenu2 = Boolean(anchorE2);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorE2(null);
    };
    const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickNotify = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorE2(event.currentTarget);
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

    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<ProductUserResponse[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response: ResponseSuccess<PageResponse<ProductUserResponse[]>> = await getProductsForUser(1, 10, [{
                    field: "productName",
                    operator: ":",
                    value: search
                }], []);
                console.log(response.data.data);

                setSearchResult(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (search.trim() !== "") {
            fetchProducts();
        } else {
            setSearchResult([]);
        }
    }, [search]);

    const handleClick = () => {
        setSearch('');
        setSearchResult([]);
    }

    return (
        <Box>
            <Box>
                <Box sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: isMobile ? "space-between" : "space-between",
                    alignItems: "center",
                    pt: isMobile ? 1 : 2,
                    px: isMobile ? 1 : 5,
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                }}>
                    {/* Logo và Search */}
                    <Box sx={{ display: "flex", alignItems: "center", width: isMobile ? "100%" : "60%", gap: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <img style={{ width: isMobile ? '40px' : '80px', height: isMobile ? '40px' : '80px' }} src={logo} alt="Logo" className="logo_shop-item" />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                id="search"
                                label="Nhập sản phẩm cần tìm..."
                                sx={{ width: "100%" }}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {searchResult.length > 0 && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        width: isMobile ? '90%' : '60%',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        zIndex: 10,
                                        overflowY: 'auto',
                                    }}
                                >
                                    {searchResult.map((product: ProductUserResponse) => (
                                        <Box
                                            key={product.product.id}
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                alignItems: "center",
                                                borderBottom: '1px solid #eee',
                                                pointerEvents: 'all',
                                                transition: 'transform 0.3s ease, background 0.3s ease',
                                                ':hover': {
                                                    background: '#eee',
                                                    cursor: 'pointer',
                                                    transform: 'scale(0.95)',
                                                },
                                            }}
                                            onClick={() => { handleClick(); window.location.href = `/products/${product.product.id}`; }}
                                        >
                                            <img src={product.product.thumbnail} alt={product.product.productName} style={{ width: "50px", height: "50px" }} />
                                            <Typography sx={{ width: '78%', maxHeight: '40px' }}>{product.product.productName}</Typography>
                                            <Typography sx={{ color: 'red' }}>{ConvertPrice(product.priceFinal)}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {/* Icons và Tài khoản */}
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: isMobile ? "center" : "flex-end",
                        alignItems: "center",
                        width: isMobile ? "100%" : "auto",
                        pt: isMobile ? 1 : 0,
                    }}>
                        <Tooltip title="tin nhắn">
                            <IconButton onClick={toggleChat}>
                                <Badge badgeContent={4} color="primary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="giỏ hàng" onClick={() => { navigate("/cart") }}>
                            <IconButton>
                                <Badge badgeContent={cart.length} color="primary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="thông báo">
                            <IconButton onClick={handleClickNotify}>
                                <Badge badgeContent={notifications.length} color="primary">
                                    <Notifications fontSize="small" />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorE2}
                            open={openMenu2}
                            onClose={handleClose2}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ maxHeight: "50%" }}
                        >
                            {notifications.map((notification) => (
                                <NotificationView key={notification.id} notification={notification} />
                            ))}
                        </Menu>
                        {login ? (
                            <>
                                <Tooltip title={user ? user.username : "tài khoản"}>
                                    <IconButton onClick={handleClickAvatar}>
                                        <Avatar alt={user?.username} src={user?.avatarUrl}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: randomColor,
                                            }}>  {user?.avatarUrl ? null : user?.username?.charAt(0).toUpperCase()}</Avatar>
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
                                    <MenuItem onClick={() => {
                                        window.location.href = `/user/${user?.email}`;
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

                {/* User Menu */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: thirdGradient,
                        width: '100%',
                        maxWidth: '100%',
                        position: 'relative',
                        borderRadius: '8px',
                        zIndex: 1,
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        padding: '5px', // Giảm padding để thu nhỏ khung
                        marginTop: '10px',
                        gap: '4px', // Giảm khoảng cách giữa các mục menu
                    }}
                >
                    {UserMenu.map((item: any, index: number) => (
                        <ListItemButton
                            key={index}
                            component={Link}
                            to={item.href}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: 'auto',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                color: location.pathname.startsWith(item.href) ? 'black' : '#666',
                                background: location.pathname.startsWith(item.href) ? secondaryGradient : 'transparent',
                                boxShadow: location.pathname.startsWith(item.href)
                                    ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                                    : 'none',
                                fontSize: isMobile ? '0.8rem' : '1rem', // Thu nhỏ kích thước chữ trên mobile
                                ':hover': {
                                    background: thirdGradient,
                                    color: 'white',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 500, fontSize: isMobile ? '0.75rem' : '1rem' }}>
                                {item.title}
                            </Typography>
                        </ListItemButton>
                    ))}
                </Box>
                {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center', // Căn giữa thanh UserMenu
                        alignItems: 'center',
                        backgroundColor: thirdGradient,
                        width: isMobile ? '100%' : '60%',
                        maxWidth: '100%',
                        position: 'relative',
                        borderRadius: '8px',
                        zIndex: 1,
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        padding: '5px',
                        marginTop: '10px',
                        gap: '4px',

                    }}
                >
                    {UserMenu.map((item: any, index: number) => (
                        <ListItemButton
                            key={index}
                            component={Link}
                            to={item.href}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center',
                                width: 'auto',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                color: location.pathname.startsWith(item.href) ? 'black' : '#666',
                                background: location.pathname.startsWith(item.href) ? secondaryGradient : 'transparent',
                                boxShadow: location.pathname.startsWith(item.href)
                                    ? '0 4px 8px rgba(0, 0, 0, 0.2)'
                                    : 'none',
                                fontSize: isMobile ? '0.8rem' : '1rem',
                                ':hover': {
                                    background: thirdGradient,
                                    color: 'white',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 500, fontSize: isMobile ? '0.75rem' : '1rem' }}>
                                {item.title}
                            </Typography>
                        </ListItemButton>
                    ))}
                </Box> */}
            </Box>

            {isChatOpen &&
                <ProtectRouter role={Role.ROLE_USER}> <RoomChat /></ProtectRouter>
            }
        </Box>
    )
}
export default Header;