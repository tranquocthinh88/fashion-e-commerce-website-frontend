import { Box } from "@mui/material";
import { bodyAdminColor, newOrderGradient, saleGradient, newUserGradient } from "../../theme";
import newOrder from '../../assets/neworder.png';
import newUser from '../../assets/newuser.png';
import sale from '../../assets/sales.png';
import '../admin/Body.scss'
import ColumnChartCustom from "../../components/admin/chart/ColumnChartCustom";
import CircleChartCustom from "../../components/admin/chart/CircleChartCustom";
import { useEffect, useState } from "react";
import { OrderModel } from "../../models/order.model";
import { getOrdersForAdmin } from "../../services/order.service";
import { ResponseSuccess } from "../../dtos/responses/response.success";
import { PageResponse } from "../../dtos/responses/page.response";
import { OrderStatus } from "../../models/enum/order.status";
import { ConvertPrice } from "../../utils/convert.price";

const Body = () => {

    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalBuyers, setTotalBuyers] = useState<number>(0);

    useEffect(() => {
        document.title = "Trang chủ - Admin";
    }, []);

    useEffect(() => {
        const fetchUsers = 
        async () => {
            const searchParams: Array<{ field: string; operator: string; value: string }> = [];
            const startOfDay = new Date();

            searchParams.push({
                field: 'orderDate',
                operator: '>=',
                value: startOfDay.toISOString().slice(0, 10),
            });

            const response: ResponseSuccess<PageResponse<OrderModel[]>> =
                await getOrdersForAdmin(1, 100, searchParams, []);
            setOrders(response.data.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET))
            const filteredOrders = response.data.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET);
            setTotalPrice(response.data.data.reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0));

            const uniqueBuyers = new Set(filteredOrders.map(order => order.user.email));
            const totalBuyers = uniqueBuyers.size;
            setTotalBuyers(totalBuyers);
            console.log(response.data.data);
        };

        fetchUsers();


    }, []);

    return <Box sx={{ background: bodyAdminColor, pt: 1, pb: 2, pl: 1, height: '100%', width: '100%' }}>
        <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Trang chủ !</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 3 }}>
            <Box sx={{
                background: saleGradient, width: "25%", height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>{ConvertPrice(totalPrice)}</Box>
                    <Box sx={{ fontSize: 20, fontWeight: '20px', }}>Doanh thu hôm nay</Box>
                </Box>
                <img src={sale} alt="Sales" className="sales-item" />
            </Box>
            <Box sx={{
                background: newOrderGradient, width: "25%", height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>{orders.length}</Box>
                    <Box sx={{ fontSize: 20, fontWeight: '20px', }}>Hóa đơn hôm nay</Box>
                </Box>
                <img src={newOrder} alt="New Order" className="new-order-item" />
            </Box>
            <Box sx={{
                background: newUserGradient, width: "25%", height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>{totalBuyers}</Box>
                    <Box sx={{ fontSize: 20, fontWeight: '20px', }}>Người mua hôm nay</Box>
                </Box>
                <img src={newUser} alt="New User" className="new-user-item" />
            </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '80%' }}>
                <ColumnChartCustom />
            </Box>
            <Box sx={{ width: '40%' }}>
                <CircleChartCustom />
            </Box>
        </Box>
    </Box>
}
export default Body;