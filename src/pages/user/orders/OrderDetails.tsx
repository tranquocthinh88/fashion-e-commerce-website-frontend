import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderDetailsModel } from "../../../models/order.details.model";
import { getOrderById, getOrderDetailsByOrderId } from "../../../services/order.service";
import { CartItemModel } from "../../../models/cart.model";
import { OrderModel } from "../../../models/order.model";
import { ConvertPrice } from "../../../utils/convert.price";
import OrderItemCard from "./OrderItemCard";
import { OrderStatus } from "../../../models/enum/order.status";


// const orderStatusMap: Record<OrderStatus, string> = {
//     [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
//     [OrderStatus.PENDING]: "Đang chờ xử lý",
//     [OrderStatus.PROCESSING]: "Đã xác nhận đơn hàng", // ~ Đã xác nhận
//     [OrderStatus.SHIPPING]: "Đang vận chuyển",
//     [OrderStatus.DELIVERED]: "Đã giao",
//     [OrderStatus.RECEIVED]: "Đã nhận",
//     [OrderStatus.CANCELLED]: "Đã hủy"
// };

const orderStatusMap: Record<OrderStatus, { label: string; color: "error" | "warning" | "info" | "primary" | "success" | "default" | "secondary" }> = {
    [OrderStatus.NOT_PROCESSED_YET]: { label: "Giao dịch hủy bỏ", color: "error" },
    [OrderStatus.PENDING]: { label: "Đang chờ xử lý", color: "warning" },
    [OrderStatus.PROCESSING]: { label: "Đã xác nhận đơn hàng", color: "info" },
    [OrderStatus.SHIPPING]: { label: "Đang vận chuyển", color: "primary" },
    [OrderStatus.DELIVERED]: { label: "Đã giao", color: "success" },
    [OrderStatus.RECEIVED]: { label: "Đã nhận", color: "success" },
    [OrderStatus.CANCELLED]: { label: "Đã hủy", color: "error" },
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
            <Box sx={{ mt: 1, p: 1, borderRadius: 2, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                <Typography>Ngày tạo: {new Date(order?.orderDate ?? "").toLocaleDateString()}</Typography>
                <Typography>Phương thức thanh toán: {order?.paymentMethod == "CC" ? "Thanh toán VNPay" : "Thanh toán tiền mặt"}</Typography>
                <Typography>Trạng thái:
                    {/* {orderStatusMap[order?.status as OrderStatus]} */}
                    <Chip
                        label={orderStatusMap[order?.status as OrderStatus]?.label}
                        color={orderStatusMap[order?.status as OrderStatus]?.color}
                    //   size="small"
                    />
                </Typography>
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
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
            </Box>
        </Box>
    );
};

export default OrderDetails;


// import { Box, Typography, Card, CardContent, Grid, Chip, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { OrderDetailsModel } from "../../../models/order.details.model";
// import { getOrderById, getOrderDetailsByOrderId } from "../../../services/order.service";
// import { ConvertPrice } from "../../../utils/convert.price";
// import { OrderStatus } from "../../../models/enum/order.status";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PaymentIcon from "@mui/icons-material/Payment";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { OrderModel } from "../../../models/order.model";

// const orderStatusMap: Record<OrderStatus, { label: string; color: "error" | "warning" | "info" | "primary" | "success" | "default" | "secondary" }> = {
//   [OrderStatus.NOT_PROCESSED_YET]: { label: "Giao dịch hủy bỏ", color: "error" },
//   [OrderStatus.PENDING]: { label: "Đang chờ xử lý", color: "warning" },
//   [OrderStatus.PROCESSING]: { label: "Đã xác nhận đơn hàng", color: "info" },
//   [OrderStatus.SHIPPING]: { label: "Đang vận chuyển", color: "primary" },
//   [OrderStatus.DELIVERED]: { label: "Đã giao", color: "success" },
//   [OrderStatus.RECEIVED]: { label: "Đã nhận", color: "success" },
//   [OrderStatus.CANCELLED]: { label: "Đã hủy", color: "error" },
// };

// const OrderDetails = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState<OrderDetailsModel[]>([]);
//   const [order, setOrder] = useState<OrderModel>();

//   useEffect(() => {
//     if (id) {
//       (async () => {
//         const response = await getOrderDetailsByOrderId(id);
//         setOrderDetails(response.data);
//         const response2 = await getOrderById(id);
//         setOrder(response2.data);
//       })();
//     }
//   }, [id]);

//   return (
//     <Box p={4}>
//       {/* Header */}
//       <Typography variant="h4" gutterBottom>
//         <ShoppingCartIcon /> Thông tin hóa đơn
//       </Typography>

//       {/* Order Summary */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Chi tiết đơn hàng</Typography>
//           <Grid container spacing={2} mt={1}>
//             <Grid item xs={6}>
//               <Typography>Ngày tạo: {new Date(order?.orderDate ?? "").toLocaleDateString()}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography>Ngày giao dự kiến: {new Date(order?.estimatedDeliveryDate ?? "").toLocaleDateString()}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography>
//                 Phương thức thanh toán:{" "}
//                 {order?.paymentMethod === "CC" ? (
//                   <>
//                     <PaymentIcon sx={{ verticalAlign: "middle" }} /> Thanh toán VNPay
//                   </>
//                 ) : (
//                   "Thanh toán tiền mặt"
//                 )}
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography>
//                 Trạng thái:{" "}
//                 <Chip
//                   label={orderStatusMap[order?.status as OrderStatus]?.label}
//                   color={orderStatusMap[order?.status as OrderStatus]?.color}
//                   size="small"
//                 />
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Product Details */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Sản phẩm trong đơn hàng
//           </Typography>
//           <List>
//             {orderDetails.map((detail, index) => (
//               <ListItem key={index}>
//                 <ListItemAvatar>
//                   <Avatar src={detail.productDetail?.product?.thumbnail ?? ""} alt={detail.productDetail?.product?.productName} />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={detail.productDetail?.product?.productName}
//                   secondary={`Số lượng: ${detail.quantity} - Giá: ${ConvertPrice(detail.priceAtCreateOrder ?? 0)}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       {/* Payment Summary */}
//       <Card>
//         <CardContent>
//           <Typography variant="h6">Tổng kết hóa đơn</Typography>
//           <Divider sx={{ my: 1 }} />
//           <Typography>Tiền hóa đơn gốc: {ConvertPrice(Number(order?.originalAmount))}</Typography>
//           <Typography>Phí vận chuyển: {ConvertPrice(Number(order?.deliveryFee))}</Typography>
//           <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
//             Tổng tiền hóa đơn: {ConvertPrice(Number(order?.discountPrice))}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default OrderDetails;
