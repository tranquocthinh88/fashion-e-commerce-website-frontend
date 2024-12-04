import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CartItemModel } from "../../../models/cart.model";
import QuantityProduct from "../../../components/user/product/QuantityProduct";
import Grid from '@mui/material/Grid2';
import { ConvertPrice } from "../../../utils/convert.price";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart.reducer";
import { removeProductFromCart } from "../../../utils/cart.handle";
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
    item: CartItemModel,
}

const CartItem = ({ item }: Props) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:600px)');

    const setQuantityProp = (quantity: number) => {
        setQuantity(quantity);
    }
    const handleDeleleProductOutCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Để tránh kích hoạt điều hướng khi nhấn nút "Xóa"
        removeProductFromCart(item);
        dispatch(updateCartState());
    };

    return (
        <Box sx={{
            cursor: 'pointer',
            border: '1px solid #f0f0f0',
            mb: 1,
            minHeight: '98px',
            borderRadius: '4px',
            ":hover": {
                backgroundColor: '#f0f0f0',
            }
        }} onClick={() => (navigate("/products/" + item.productDetail.product?.id))}>
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    flexDirection: isMobile ? 'column' : 'row',
                    padding: isMobile ? 2 : 0,
                }}
            >
                <Grid size={isMobile ? 12 : 1} sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 2 : 0 }}>
                    <img
                        src={item.productDetail.product?.thumbnail ?? ""}
                        alt={item.productDetail.product?.productName ?? ""}
                        width={isMobile ? "80%" : "100%"}
                        height={isMobile ? "auto" : "100%"}
                        style={{ objectFit: 'contain', borderRadius: '4px' }}
                    />
                </Grid>
                <Grid size={isMobile ? 12 : 3} sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 2 : 0 }}>
                    <Typography sx={{
                        minHeight: '48px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        pl: 1, pr: 1
                    }}>{item.productDetail.product?.productName}</Typography>
                </Grid>
                <Grid size={isMobile ? 12 : 2} sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 2 : 0 }}>
                    <Box>
                        <Typography>Màu sắc: {item.productDetail.color.colorName}</Typography>
                    </Box>
                    <Box>
                        <Typography>Kích thước: {item.productDetail.size.numberSize ?? item.productDetail.size.textSize}</Typography>
                    </Box>
                </Grid>
                <Grid size={isMobile ? 12 : 1} sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 2 : 0 }}>
                    <Typography>{ConvertPrice(item.priceFinal)}</Typography>
                </Grid>
                <Grid size={isMobile ? 12 : 2} sx={{ textAlign: 'center', mb: isMobile ? 2 : 0 }}>
                    <QuantityProduct cartItem={item} quantity={quantity} setQuantity={setQuantityProp} maxValue={item.productDetail?.quantity ?? 0} />
                </Grid>
                <Grid size={isMobile ? 12 : 2} sx={{ textAlign: 'center', mb: isMobile ? 2 : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography>{ConvertPrice((item.priceFinal ?? 0) * (item.quantity ?? 0))}</Typography>
                    </Box>
                </Grid>
                <Grid size={isMobile ? 12 : 1} sx={{ textAlign: 'center' }}>
                    <Button variant="contained" color="warning" onClick={handleDeleleProductOutCart} >Xóa</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItem;