import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConvertPrice } from "../../../utils/convert.price";
import { OrderModel } from "../../../models/order.model";
import { OrderStatus } from "../../../models/enum/order.status";

type Props = {
    item: OrderModel,
}


const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
    [OrderStatus.PENDING]: "Người bán đang chuẩn bị",
    [OrderStatus.PROCESSING]: "Đang xử lý",
    [OrderStatus.SHIPPING]: "Đang vận chuyển",
    [OrderStatus.DELIVERED]: "Đã giao",
    [OrderStatus.CANCELLED]: "Đã hủy"
};
const OrderItem = ({ item }: Props) => {
    const navigate = useNavigate();

    const isCancelDisabled = (() => {
        const orderDate = new Date(item.orderDate); // Ngày tạo đơn hàng
        const now = new Date(); // Thời gian hiện tại
        const hoursDifference = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60); // Tính khoảng cách giờ
        return hoursDifference > 2; // Trả về true nếu đã quá 2 tiếng
    })();

    return (
        <>
            <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{new Date(item.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{orderStatusMap[item.status as OrderStatus]}</TableCell>
                <TableCell>{item.paymentMethod == "CC" ? "Thanh toán VNPay" : "Thanh toán tiền mặt"}</TableCell>
                <TableCell>{ConvertPrice(Number(item.discountPrice) ?? 0)}</TableCell>
                <TableCell colSpan={2}>
                    <Button color="error" variant="contained"
                        disabled={isCancelDisabled}
                        onClick={() => { navigate(`/user/${item.user.email}/orders/${item.id}`) }}>Hủy đơn</Button>
                    <Button sx={{ ml: 2 }} color="success" variant="contained" onClick={() => { navigate(`/order-details/${item.id}`) }}>Chi tiết</Button>
                </TableCell>
            </TableRow>
        </>



    )
}

export default OrderItem;
