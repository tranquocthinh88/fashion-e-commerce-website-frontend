import { Box , Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { UserModel } from "../../../models/user.model";
import { getUserByEmail } from "../../../services/user.service";
import { getOrdersByUser } from "../../../services/order.service";
import { OrderModel } from "../../../models/order.model";
import { ConvertPrice } from "../../../utils/convert.price";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { OrderStatus } from "../../../models/enum/order.status";
import DialogOrderDetails from "../../../components/user/dialogs/DialogOrderDetails";


const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.PROCESSING]: "Đã xác nhận đơn hàng", // ~ Đã xác nhận
    [OrderStatus.SHIPPING]: "Đang vận chuyển",
    [OrderStatus.DELIVERED]: "Đã giao",
    [OrderStatus.RECEIVED]: "Đã nhận",
    [OrderStatus.CANCELLED]: "Đã hủy"
};

const UserDetails = () => {
    const email = useParams<{ email: string }>().email;
    const [user, setUser] = useState<UserModel | null>(null);
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [ordersValid, setordersValid] = useState<OrderModel[]>([]);
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    const indexOfLastOrder = currentPage * pageSize;
    const indexOfFirstOrder = indexOfLastOrder - pageSize;
    const currentOrders = ordersValid.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(ordersValid.length / pageSize);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
        if (newPage < 1) {
            setCurrentPage(1);
        }
        if (newPage > totalPages) {
            setCurrentPage(totalPages);
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const reponse: ResponseSuccess<UserModel> = await getUserByEmail(email ?? '');
                setUser(reponse.data);

                const responseOrdersForUser = await getOrdersByUser(email ?? '');
                setOrders(responseOrdersForUser.data);
                setordersValid(responseOrdersForUser.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET));

            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <Box sx={{ p: 2 }}>
                {/* Thông tin khách hàng */}
                <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 2, background: "#f9f9f9" }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}>
                        <PersonIcon style={{ marginRight: 8 }}></PersonIcon>
                        Thông tin khách hàng:
                    </Typography>
                    {user ? (
                        <Box sx={{ lineHeight: 1.8 }}>
                            <Typography>
                                <strong>Email:</strong> {user.email}
                            </Typography>
                            <Typography>
                                <strong>Tên khách hàng:</strong> {user.username}
                            </Typography>
                            <Typography>
                                <strong>Ngày tạo tài khoản:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography>
                                <strong>Địa chỉ:</strong>{" "}
                                {user.address
                                    ? `${user.address.street}, ${user.address.district}, ${user.address.city}`
                                    : "Không có thông tin"}
                            </Typography>
                            <Typography>
                                <strong>Số điện thoại:</strong> {user.phone || "Chưa cập nhật"}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography color="textSecondary">Không tìm thấy thông tin khách hàng</Typography>
                    )}
                </Box>

                {/* Đơn hàng của khách hàng */}
                <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2, background: "#e8f5e9" }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#e1810b" }}>
                        <ShoppingCartIcon /> Đơn hàng của khách hàng:
                    </Typography>
                    {orders && orders.length > 0 ? (
                        <Box>
                            <Box sx={{ display: 'flex', width: '45%' }}>
                                <Typography sx={{ width: '45%', }}>
                                    <strong>Tổng số hóa đơn đã tạo:</strong> {orders.length}
                                </Typography>
                                <Typography>
                                    <strong>Tổng số tiền đã mua:</strong>{" "}
                                    <span style={{ color: "#f44336", fontWeight: "bold" }}>
                                        {ConvertPrice(
                                            orders.reduce(
                                                (sum: number, order: OrderModel) => sum + Number(order.discountPrice),
                                                0
                                            )
                                        )}
                                    </span>
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', width: '45%' }}>
                                <Typography sx={{ width: '45%', }}>
                                    <strong>Tổng số hóa đơn hợp lệ: </strong> {ordersValid.length}
                                </Typography>
                                <Typography>
                                    <strong>Tổng số tiền đã mua:</strong>{" "}
                                    <span style={{ color: "#f44336", fontWeight: "bold" }}>
                                        {ConvertPrice(
                                            ordersValid.reduce(
                                                (sum: number, order: OrderModel) => sum + Number(order.discountPrice),
                                                0
                                            )
                                        )}
                                    </span>
                                </Typography>
                            </Box>

                        </Box>
                    ) : (
                        <Typography color="textSecondary">Khách hàng chưa có hóa đơn nào.</Typography>
                    )}
                </Box>
                {ordersValid.length > 0 && (
                    <Box sx={{ mt: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 2, background: "#e8f5e9" }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#4caf50" }}>
                            <AddShoppingCartIcon /> Chi tiết đơn hàng:
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            {currentOrders.map((order, index) => (
                                <Box key={index}
                                    sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2, background: "#4caf5073", mt: 2, width: '30%', }}
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setOpenOrderDialog(true);
                                    }}
                                >
                                    <Typography>
                                        <strong>Mã đơn hàng:</strong> {order.id}
                                    </Typography>
                                    <Typography>
                                        <strong>Ngày tạo:</strong> {new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Trạng thái:</strong> {orderStatusMap[order.status as OrderStatus]}
                                    </Typography>
                                    <Typography>
                                        <strong>Phương thức thanh toán:</strong> {order.paymentMethod == 'CC' ? 'Thanh toán VNPay' : 'Thanh toán tiền mặt'}
                                    </Typography>
                                    <Typography>
                                        <strong>Thành tiền:</strong> {ConvertPrice(Number(order.discountPrice) ?? 0)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        {openOrderDialog && selectedOrder && (
                            <DialogOrderDetails
                                open={openOrderDialog}
                                onClose={() => setOpenOrderDialog(false)}
                                order={selectedOrder}
                            />
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                            <Stack spacing={2}>
                                <Pagination
                                    count={totalPages}
                                    color="primary"
                                    page={currentPage}
                                    onChange={(_, page) => handlePageChange(page)}
                                />
                            </Stack>
                        </Box>
                    </Box>)}
            </Box>

        </>
    );
}

export default UserDetails;