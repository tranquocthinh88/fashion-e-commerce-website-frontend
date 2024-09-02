import { Box, Button, Dialog, DialogContent, Typography, useMediaQuery, } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import React from "react";
import QuantityProduct from "../product/QuantityProduct";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";

type Props = {
    open: boolean;
    handleClose: () => void;
}

const DiaLogAddToCart = ({ open, handleClose }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [buyQuantity, setBuyQuantityProp] = React.useState(1);
    const availableQuantity = 10;
    const colors = ["red", "blue", "green", "red", "blue", "green"];
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: "60%",
                    height: "auto",
                    maxWidth: "60%",
                    background: "white",
                }
            }}
        >
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: "40%", background: "gray", height: 400, resizeMode: 'contain' }}> {/*  Hình ảnh */}
                        <img src="https://zeanus.vn/upload/product/zn-0009/ao-khoac-gio-nam-den-day-dan-atd-208.jpg" alt="product" style={{ width: "100%", height: "100%" }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}> {/* Chi tiết*/}
                        <Typography
                            sx={{
                                fontWeight: '500',
                                minHeight: '32px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                                fontSize: 20
                            }}
                        >Quần Dài Nữ Jeans Suông Thời Trang XQ124J8530</Typography>
                        <Typography
                            sx={{
                                fontSize: 14
                            }}
                        >Thương hiệu: GenZ</Typography>
                        <Box sx={{
                            background: "#e4e4e4",
                            p: 1, display: 'flex',
                            gap: '25px',
                            alignItems: "center",
                            borderRadius: 1,
                        }}>
                            <Typography
                                sx={{
                                    fontSize: 18
                                }}
                            >Giá: </Typography>
                            <Typography variant="h5" sx={{ color: 'red', fontWeight: '600', }}>149000đ</Typography>
                            <Typography variant="h5" sx={{ color: 'gray', fontWeight: '300', textDecoration: 'line-through' }}>199000đ</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", minHeight: "36px", mb: 2, mt: 2 }}> {/* Màu sắc */}
                            <Typography sx={{ width: "100px", mr: 2 }}>Màu sắc: </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ background: "red", width: 50, height: 30 }}></Box>
                                <Box sx={{ background: "blue", width: 50, height: 30 }}></Box>
                                <Box sx={{ background: "green", width: 50, height: 30 }}></Box>
                                <Box sx={{ background: "red", width: 50, height: 30 }}></Box>
                                <Box sx={{ background: "blue", width: 50, height: 30 }}></Box>
                            </Box>
                        </Box>
                        {/* Kích thước */}
                        <Box sx={{ display: "flex", flexDirection: "row", minHeight: "36px", mb: 2 }}>
                            <Typography sx={{ width: "100px", mr: 2 }}>Kích thước: </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ background: "white", width: 50, height: 30, display: "flex", border: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Typography sx={{ color: "black" }}>S</Typography>
                                </Box>
                                <Box sx={{ background: "white", width: 50, height: 30, display: "flex", border: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Typography sx={{ color: "black" }}>M</Typography>
                                </Box>
                                <Box sx={{ background: "white", width: 50, height: 30, display: "flex", border: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Typography sx={{ color: "black" }}>L</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ width: "200px", mr: 2 }}>Số lượng trong kho:  {availableQuantity}</Typography>
                        </Box>
                        <Box > {/* Hành động */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Typography sx={{ width: "100px", mr: 2 }}>Số lượng: </Typography>
                                <QuantityProduct quantity={buyQuantity} setQuantity={setBuyQuantityProp} maxValue={availableQuantity} />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                <Button sx={{
                                    width: "60%",
                                    ':hover': {
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        color: 'white',
                                    },
                                }} variant="contained">Thêm vào giỏ hàng
                                    <AddShoppingCartIcon sx={{ ml: 1 }} />
                                </Button>
                            </Box>
                        </Box>
                        <Link to={""}>Xem chi tiết sản phẩm</Link>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DiaLogAddToCart;