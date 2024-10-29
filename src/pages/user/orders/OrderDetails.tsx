import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderDetailsModel } from "../../../models/order.details.model";
import { getOrderById, getOrderDetailsByOrderId } from "../../../services/order.service";
import { CartItemModel } from "../../../models/cart.model";
import { OrderModel } from "../../../models/order.model";
import { ConvertPrice } from "../../../utils/convert.price";
import OrderItemCard from "./OrderItemCard";

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
        console.log("Order detail 2: ", orderDetails);
        console.log("Order detail 3: ", order);
        
    }, [orderDetails, order]);

    return (
        <Box>
            <Typography variant="h4">Thông tin hóa đơn</Typography>
            <Box>
                <Typography>Ngày tạo: {new Date(order?.orderDate ?? "").toLocaleDateString()}</Typography>
                <Typography>Phương thức thanh toán: {order?.paymentMethod}</Typography>
                <Typography>Trạng thái: {order?.status}</Typography>
                <Typography>Tiền hóa đơn gốc: {ConvertPrice(Number(order?.originalAmount))}</Typography>
                <Typography>Phí vận chuyển: {ConvertPrice(Number(order?.deliveryFee))}</Typography>
                <Typography>Tổng tiền hóa đơn: {ConvertPrice(Number(order?.discountPrice))}</Typography>
            </Box>
            <Box>
                {orderDetails.map((detail, index) => {
                    const cartItem: CartItemModel = {
                        productDetail: detail.productDetail!,
                        quantity: detail.quantity ?? 0,
                        priceFinal: detail.priceAtCreateOrder ?? 0
                    }
                    return <OrderItemCard key={index} item={cartItem} />
                })}
            </Box>
        </Box>
    );
};

export default OrderDetails;
