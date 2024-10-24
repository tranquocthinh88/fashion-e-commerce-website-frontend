import { Box, Button, Container, Typography } from "@mui/material"
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import { useEffect, useState } from "react";
import { CartItemModel } from "../../../models/cart.model";
import CartItem from "./CartItem";
import { ConvertPrice } from "../../../utils/convert.price";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.priceFinal?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);

    return (
        <Container>
            {cart.length > 0 ? <>
                <Box>
                    <Typography variant="h5" sx={{mb: 2}}>Giỏ hàng của bạn</Typography>
                    {cart.map((cartItem: CartItemModel, index: number) => (
                        <CartItem key={index} item={cartItem} />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontWeight: 600, mr: '30px', color: 'red' }}>Tổng thanh toán: {ConvertPrice(totalMoney)}</Typography>
                    <Button color="success" variant="contained" onClick={()=> {navigate("/payment")}}>Thanh toán</Button>
                </Box>
            </> : <CartEmpty />}
            <Box>
            </Box>
        </Container>
    )
}

export default Cart;