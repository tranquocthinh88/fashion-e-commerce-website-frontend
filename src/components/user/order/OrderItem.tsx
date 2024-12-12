import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConvertPrice } from "../../../utils/convert.price";
import { OrderModel } from "../../../models/order.model";
import { OrderStatus } from "../../../models/enum/order.status";
import { updateStatusCancel, updateStatusReceived } from "../../../services/order.service";

type Props = {
    item: OrderModel,
    onRefresh: () => void;
}


const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.PROCESSING]: "Đã xác nhận đơn hàng", // ~ Đã xác nhận
    [OrderStatus.SHIPPING]: "Đang vận chuyển",
    [OrderStatus.DELIVERED]: "Đã giao",
    [OrderStatus.RECEIVED]: "Đã nhận",
    [OrderStatus.CANCELLED]: "Đã hủy"
};
const OrderItem = ({ item, onRefresh}: Props) => {
    const navigate = useNavigate();

    const isCancelDisabled = (() => {
        const orderDate = new Date(item.orderDate);
        const now = new Date();
        const hoursDifference = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
        return hoursDifference > 2 || item.status !== OrderStatus.PENDING;
    })();

    const isReceivedDisabled = (() => {
        return item.status !== OrderStatus.DELIVERED;
    })();

    const handleCancel = async () => {
        const response = await updateStatusCancel(item.id as string);
        if (response.status == 201) { 
          onRefresh(); 
        }
      };
    
      const handleReceived = async () => {
        const response = await updateStatusReceived(item.id as string);
        if (response.status == 201) { 
          onRefresh(); 
        }
      };

    return (
        <>
            <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{new Date(item.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{orderStatusMap[item.status as OrderStatus]}</TableCell>
                <TableCell>{item.paymentMethod == "CC" ? "Thanh toán VNPay" : "Thanh toán tiền mặt"}</TableCell>
                <TableCell>{ConvertPrice(Number(item.discountPrice) ?? 0)}</TableCell>
                <TableCell>{new Date(item.estimatedDeliveryDate).toLocaleDateString()}</TableCell>
                <TableCell colSpan={2}>
                    <Button sx={{ textTransform: 'none'}} color="error" variant="contained"
                        disabled={isCancelDisabled}
                        onClick={handleCancel}>Hủy đơn</Button>
                    <Button sx={{ ml: 1, textTransform: 'none' }} color="warning" variant="contained"
                        disabled={isReceivedDisabled}
                        onClick={handleReceived}>Xác nhận</Button>
                    <Button sx={{ ml: 1, textTransform: 'none' }} color="success" variant="contained" onClick={() => {
                         navigate(`/order-details/${item.id}`) 
                        //  setSelectedOrder(item);
                        //                 setOpenOrderDialog(true);
                         }}>Chi tiết</Button>
                </TableCell>
            </TableRow>
            {/* {openOrderDialog && selectedOrder && (
                            <DialogOrderDetails
                                open={openOrderDialog}
                                onClose={() => setOpenOrderDialog(false)}
                                order={selectedOrder}
                            />
                        )} */}
        </>
    )
}

export default OrderItem;
