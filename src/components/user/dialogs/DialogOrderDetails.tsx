import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { OrderModel } from '../../../models/order.model';
import { useEffect } from "react";
import { getOrderDetailsByOrderId } from '../../../services/order.service';
import { ResponseSuccess } from '../../../dtos/responses/response.success';
import { OrderDetailsModel } from '../../../models/order.details.model';
import { ConvertPrice } from '../../../utils/convert.price';

type Props = {
    open: boolean;
    onClose: () => void;
    order: OrderModel;
}

export const DialogOrderDetails = ({ open, onClose, order }: Props) => {
    const [orderDetails, setOrderDetails] = React.useState<OrderDetailsModel[]>([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (open) {
                const response: ResponseSuccess<OrderDetailsModel[]> = await getOrderDetailsByOrderId(order.id as string);
                setOrderDetails(response.data);
            }
        };
        fetchOrderDetails();
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: "70%",
                    minHeight: "70%",
                    maxWidth: "80%",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: 3,
                }
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}>Chi tiết đơn hàng</Typography>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Mã hóa đơn: <span style={{ color: "#ff5722" }}>{order.id}</span></Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>Ngày nhận hàng dự kiến: {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</Typography>
                </Box>

                <Grid container spacing={2} sx={{ mt: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Grid item xs={2}><Typography sx={{ fontWeight: 'bold' }}>Hình ảnh</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{ fontWeight: 'bold' }}>Tên sản phẩm</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{ fontWeight: 'bold' }}>Tính chất</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{ fontWeight: 'bold' }}>Đơn giá</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{ fontWeight: 'bold' }}>Số lượng</Typography></Grid>
                    <Grid item xs={2}><Typography sx={{ fontWeight: 'bold' }}>Thành tiền</Typography></Grid>
                </Grid>

                {orderDetails.map((orderDetail, index) => (
                    <Box key={index} sx={{ mt: 1, p: 1, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: 1, display: 'flex', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <img
                                    src={orderDetail.productDetail?.product?.thumbnail ?? ""}
                                    alt={orderDetail.productDetail?.product?.productName ?? ""}
                                    width="80px"
                                    height="80px"
                                    style={{ objectFit: 'contain', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                                    className="hoverImage"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {orderDetail.productDetail?.product?.productName}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Màu sắc: {orderDetail.productDetail?.color.colorName}</Typography>
                                <Typography>Kích thước: {orderDetail.productDetail?.size.numberSize ?? orderDetail.productDetail?.size.textSize}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{ConvertPrice(orderDetail.priceAtCreateOrder ?? 0)}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{orderDetail.quantity}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{ConvertPrice((orderDetail.priceAtCreateOrder ?? 0) * (orderDetail.quantity ?? 0))}</Typography>
                            </Grid>
                           
                        </Grid>
                       
                    </Box>
                ))}

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Typography sx={{ fontWeight: 600 }}>Tiền hóa đơn gốc: {ConvertPrice(Number(order?.originalAmount))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Typography sx={{ fontWeight: 600 }}>Phí vận chuyển: {ConvertPrice(Number(order?.deliveryFee))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Typography sx={{ fontWeight: 600 }}>Giảm giá: -{ConvertPrice(Number(order?.discountAmount))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Typography sx={{ fontWeight: 600, color: '#f44336' }}>Tổng tiền hóa đơn: {ConvertPrice(Number(order?.discountPrice))}</Typography>
                </Box>
            </Box>
        </Dialog>
    );
}

export default DialogOrderDetails;
