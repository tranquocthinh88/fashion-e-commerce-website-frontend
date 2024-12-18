import { useLocation, useNavigate } from 'react-router-dom';
import { getPaymentSuccess } from '../../../services/payment.service';
import { useEffect, useState } from 'react';
import { revokeQuantityByOrderId, updateOrderStatusPending } from '../../../services/order.service';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from 'react-redux';
import { updateCartState } from '../../../redux/reducers/cart.reducer';
import { UserModel } from '../../../models/user.model';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { CartItemModel } from '../../../models/cart.model';

const PaymentSuccess = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user: UserModel | null = getUserFromLocalStorage();

    useEffect(() => {
        const queryParams: Record<string, string> = {};
        new URLSearchParams(location.search).forEach((value, key) => {
            queryParams[key] = value;
        });

        const fetchPaymentStatus = async () => {
            try {
                const result = await getPaymentSuccess(queryParams);
                if (result.status === 200 && result.data !== 'Payment failed with code: 24') {
                    setPaymentStatus("thành công"); // Đặt trạng thái thành công
                    await updateOrderStatusPending(queryParams.orderId);
                    const currentCart: CartItemModel[] = JSON.parse(localStorage.getItem(`cart_` + user?.id) || '[]');
                    const updatedCart = currentCart.filter(item => item.productDetail.id !== queryParams.productId);
                    localStorage.setItem(`cart_` + user?.id, JSON.stringify(updatedCart));
                    dispatch(updateCartState(user?.id));
                } else {
                    console.warn("Thanh toán không thành công: ", result.data);
                    await revokeQuantityByOrderId(queryParams.orderId);
                    setPaymentStatus(`thất bại: ${result.message}`);
                }
            } catch (error) {
                console.error("Có lỗi xảy ra trong quá trình thanh toán:", error);
            } finally {
                setLoading(false); // Kết thúc quá trình loading
            }
        };

        fetchPaymentStatus();
    }, [location.search]);

    if (loading) {
        return <div>Đang kiểm tra trạng thái thanh toán...</div>;
    }

    const handelSuccess = () => {
        navigate(`/user/${user?.email}/orders`);
    }

    const handleFail = () => {
        navigate(`/cart`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 4, maxWidth: 400, margin: 'auto', textAlign: 'center' }}
        >
            {paymentStatus.includes("thành công") ? (
                <>
                    <IconButton color="success" sx={{ fontSize: 60 }}>
                        <CheckCircleIcon fontSize="inherit" />
                    </IconButton>
                    <Typography variant="h5" color="success.main" gutterBottom>
                        Thanh toán thành công
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Đơn hàng của quý khách đã thanh toán thành công. Cảm ơn bạn đã mua hàng.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handelSuccess}>
                        Đóng
                    </Button>
                </>
            ) : (
                <>
                    <IconButton color="error" sx={{ fontSize: 60 }}>
                        <CheckCircleIcon fontSize="inherit" />
                    </IconButton>
                    <Typography variant="h5" color="error.main" gutterBottom>
                        Thanh toán thất bại
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Đã có vấn đề xảy ra với thanh toán của bạn. Vui lòng thử lại.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleFail}>
                        Đóng
                    </Button>
                </>
            )}
        </Box>
    );
};

export default PaymentSuccess;
