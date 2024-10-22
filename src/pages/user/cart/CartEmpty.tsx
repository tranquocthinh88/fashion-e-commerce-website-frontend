import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmptyCartImage from "../../../assets/images/empty-cart.png";

const CartEmpty = () => {
    const navigate = useNavigate();
    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        textAlign: 'center',
    }}>
        <img src={EmptyCartImage} alt="empty-cart"
            style={{
                width: '400px',
            }}
        />
        <Typography variant="h4">Chưa có sản phẩm nào trong giỏ hàng</Typography>
        <Button variant="contained" onClick={() => { navigate('/') }} >Về trang chủ</Button>
    </Box>
}

export default CartEmpty;