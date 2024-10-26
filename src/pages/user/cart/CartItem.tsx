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

type Props = {
    item: CartItemModel,
}

const CartItem = ({ item }: Props) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const dispatch = useDispatch();

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
            maxHeight: '98px',
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
                }}
            >
                <Grid size={1} >
                    <img
                        src={item.productDetail.product?.thumbnail ?? ""}
                        alt={item.productDetail.product?.productName ?? ""}
                        width={"100%"}
                        height={"100%"}
                        style={{ objectFit: 'contain', borderRadius: '4px' }}
                    />
                </Grid>
                <Grid size={3} >
                    <Box>

                    </Box>
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
                <Grid size={2} >
                    <Box>
                        <Typography>Màu sắc: {item.productDetail.color.colorName}</Typography>
                    </Box>
                    <Box>
                        <Typography>Kích thước: {item.productDetail.size.numberSize ?? item.productDetail.size.textSize}</Typography>
                    </Box>
                </Grid>
                <Grid size={1} >
                    <Typography>{ConvertPrice(item.priceFinal)}</Typography>
                </Grid>
                <Grid size={2} >
                    <QuantityProduct cartItem={item} quantity={quantity} setQuantity={setQuantityProp} maxValue={item.productDetail?.quantity ?? 0} />
                </Grid>
                <Grid size={2} >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography>{ConvertPrice((item.priceFinal ?? 0) * (item.quantity ?? 0))}</Typography>
                    </Box>
                </Grid>
                <Grid size={1} >
                    <Button variant="contained" color="warning" onClick={handleDeleleProductOutCart} >Xóa</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItem;