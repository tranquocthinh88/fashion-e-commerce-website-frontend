import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConvertPrice } from "../../../utils/convert.price";
import { OrderModel } from "../../../models/order.model";
import { OrderStatus } from "../../../models/enum/order.status";
import { updateStatusCancel } from "../../../services/order.service";

type Props = {
    item: OrderModel,
}


const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.PROCESSING]: "Đã xác nhận đơn hàng", // ~ Đã xác nhận
    [OrderStatus.SHIPPING]: "Đang vận chuyển",
    [OrderStatus.DELIVERED]: "Đã giao",
    [OrderStatus.CANCELLED]: "Đã hủy"
};
const OrderItem = ({ item }: Props) => {
    const navigate = useNavigate();

    const isCancelDisabled = (() => {
        const orderDate = new Date(item.orderDate);
        const now = new Date();
        const hoursDifference = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
        return hoursDifference > 2 || item.status !== OrderStatus.PENDING;
    })();

    const handleCancel = async () => {
        const response = await updateStatusCancel(item.id as string);
        console.log("Cancel response: ", response);
    }

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
                    <Button color="error" variant="contained"
                        disabled={isCancelDisabled}
                        onClick={handleCancel}>Hủy đơn</Button>
                    <Button sx={{ ml: 2 }} color="success" variant="contained" onClick={() => { navigate(`/order-details/${item.id}`) }}>Chi tiết</Button>
                </TableCell>
            </TableRow>
        </>


        //  onClick={() => { navigate(`/user/${item.user.email}/orders/${item.id}`) }}>Hủy đơn</Button>

    )
}

export default OrderItem;
