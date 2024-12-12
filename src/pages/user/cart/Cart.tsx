import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material"
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import { useEffect, useState } from "react";
import { CartItemModel } from "../../../models/cart.model";
import CartItem from "./CartItem";
import { ConvertPrice } from "../../../utils/convert.price";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoginAccount } from "../../../services/user.service";

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const navigate = useNavigate();
    const login: boolean = isLoginAccount();
    const location = useLocation();
    const [selectedItems, setSelectedItems] = useState<CartItemModel[]>([]);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            if (cartItem.productDetail.product && cartItem.productDetail.product.id && selectedItems.some(item => item.productDetail.product?.id === cartItem.productDetail.product?.id)) { // Tính tổng tiền chỉ với sản phẩm được chọn
                total += (cartItem.priceFinal ?? 0) * (cartItem.quantity ?? 0);
            }
        });
        setTotalMoney(total);
    }, [cart, selectedItems]);

    const handleCheckout = () => {
        if (login) {
            navigate('/payment', { state: { selectedItems } }); 
        } else {
            navigate('/login', { state: { from: location.pathname } });
        }
    };
    const handleSelectItem = (cartItem: CartItemModel, isSelected: boolean) => {
        setSelectedItems((prev) =>
            isSelected
                ? [...prev, cartItem] // Thêm sản phẩm nếu được chọn
                : prev.filter((item) => item.productDetail.product?.id !== cartItem.productDetail.product?.id) // Bỏ sản phẩm nếu bị hủy chọn
        );
    };

    useEffect(() => {
        document.title = "Total Trendsetter - Giỏ hàng";
    }, []);

    return (
        <Container>
            {cart.length > 0 ? <>
                <Box sx={{mt: isMobile ? 4 : 1}}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Giỏ hàng của bạn</Typography>
                     {cart.map((cartItem: CartItemModel, index: number) => (
                        <CartItem
                            key={index}
                            item={cartItem}
                            isSelected={selectedItems.some(item => item.productDetail.product?.id === cartItem.productDetail.product?.id)}
                            onSelect={handleSelectItem}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontWeight: 600, mr: '30px', color: 'red', fontSize: isMobile ? '12px' : '18px' }}>Tổng thanh toán: {ConvertPrice(totalMoney)}</Typography>
                    <Button color="success" variant="contained"
                        onClick={handleCheckout} sx={{fontSize: isMobile ? '9px' : '16px', width: isMobile ? '40%' : '15%'}}>
                        Thanh toán
                    </Button>
                </Box>
            </> : <CartEmpty />}
            <Box>
            </Box>
        </Container>
    )
}

export default Cart;