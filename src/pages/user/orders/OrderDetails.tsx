import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderDetailsModel } from "../../../models/order.details.model";
import { getOrderById, getOrderDetailsByOrderId } from "../../../services/order.service";
import { CartItemModel } from "../../../models/cart.model";
import { OrderModel } from "../../../models/order.model";
import { ConvertPrice } from "../../../utils/convert.price";
import OrderItemCard from "./OrderItemCard";
import { OrderStatus } from "../../../models/enum/order.status";


const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.PROCESSING]: "Đã xác nhận đơn hàng", // ~ Đã xác nhận
    [OrderStatus.SHIPPING]: "Đang vận chuyển",
    [OrderStatus.DELIVERED]: "Đã giao",
    [OrderStatus.CANCELLED]: "Đã hủy"
};

const OrderDetails = () => {

    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState<OrderDetailsModel[]>([]);
    const [order, setOrder] = useState<OrderModel>();

    useEffect(() => {
        if (id) {
            (async () => {
                const response = await getOrderDetailsByOrderId(id);
                setOrderDetails(response.data);
                const response2 = await getOrderById(id);
                setOrder(response2.data);

            })();
        }
    }, [id]);

    useEffect(() => {
    }, [orderDetails, order]);

    return (
        <Box>
            <Typography variant="h4">Thông tin hóa đơn</Typography>
            <Box>
                <Typography>Ngày tạo: {new Date(order?.orderDate ?? "").toLocaleDateString()}</Typography>
                <Typography>Phương thức thanh toán: {order?.paymentMethod == "CC" ? "Thanh toán VNPay" : "Thanh toán tiền mặt"}</Typography>
                <Typography>Trạng thái: {orderStatusMap[order?.status as OrderStatus]}</Typography>
                <Typography>Ngày giao dự kiến: {new Date(order?.estimatedDeliveryDate ?? "").toLocaleDateString()}</Typography>

            </Box>
            <Box>
                {orderDetails.map((detail, index) => {
                    const cartItem: CartItemModel = {
                        productDetail: detail.productDetail!,
                        quantity: detail.quantity ?? 0,
                        priceFinal: detail.priceAtCreateOrder ?? 0
                    }
                    return <OrderItemCard key={index} item={cartItem} status={order?.status ?? ''} />
                })}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column'}}>
                    <Typography>Tiền hóa đơn gốc: {ConvertPrice(Number(order?.originalAmount))}</Typography>
                    <Typography>Phí vận chuyển: {ConvertPrice(Number(order?.deliveryFee))}</Typography>
                    <Typography>Tổng tiền hóa đơn: {ConvertPrice(Number(order?.discountPrice))}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderDetails;
