import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { OrderModel } from '../../../models/order.model';
import { useEffect, useState } from 'react';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { getOrdersByUser } from '../../../services/order.service';
import OrderItem from '../order/OrderItem';

const OrderManagementTab = () => {

    const [orders, setOrders] = useState<OrderModel[]>([]);
    const user: UserModel | null = getUserFromLocalStorage();

    useEffect(() => {
        (async () => {
            const response = await getOrdersByUser(user?.email ?? '');
            setOrders(response.data);
            console.log("Orders: ", response.data);
        })();
    }, []);

    return (
        <>
            <Typography variant='h6'>Danh sách đơn hàng</Typography>
            <Box>
                <TableContainer>
                    <Table>
                        {/* Tiêu đề bảng */}
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Phương thức thanh toán</TableCell>
                                <TableCell>Thành tiền</TableCell>
                                <TableCell colSpan={2}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Hiển thị các đơn hàng */}
                            {orders.map(order => (
                                <OrderItem key={order.id as React.Key} item={order} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {orders.map((order, index) => (
                    <OrderItem key={index} item={order} />
                ))} */}
            </Box>
        </>
    );
};

export default OrderManagementTab;
