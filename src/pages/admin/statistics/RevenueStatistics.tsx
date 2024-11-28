import { Box, Grid, IconButton, MenuItem, Paper, Select, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { OrderModel } from "../../../models/order.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { PageResponse } from "../../../dtos/responses/page.response";
import { getOrdersForAdmin } from "../../../services/order.service";
import { OrderStatus } from "../../../models/enum/order.status";
import { ConvertPrice } from "../../../utils/convert.price";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueStatistics = () => {
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
    const [filterOption, setFilterOption] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [todayRevenue, setTodayRevenue] = useState<number>(0);
    const [yesterdayRevenue, setYesterdayRevenue] = useState<number>(0);
    const [revenueDifference, setRevenueDifference] = useState<number>(0);
    const [currentMonthRevenue, setCurrentMonthRevenue] = useState<number>(0);
    const [previousMonthRevenue, setPreviousMonthRevenue] = useState<number>(0);
    const [revenueMonthDifference, setRevenueMonthDifference] = useState<number>(0);

    const handleSelectChange = (event: any) => {
        setFilterOption(event.target.value); // Cập nhật state khi chọn option
    };

    const handleMonthChange = (event: any) => {
        setSelectedMonth(event.target.value); // Cập nhật state khi chọn tháng
    };

    const handleYearChange = (event: any) => {
        setSelectedYear(event.target.value); // Cập nhật state khi chọn năm
    };

    const groupedByDay = orders
        .filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED)
        .reduce((acc: { [key: string]: number }, order: OrderModel) => {
            const orderDate = dayjs(order.orderDate).format('D'); // Lấy ngày (1-31)
            acc[orderDate] = (acc[orderDate] || 0) + Number(order.discountPrice);
            return acc;
        }, {});

    const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const dailySalesData = {
        labels: daysInMonth,
        datasets: [
            {
                label: 'Doanh thu',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                borderWidth: 1,
                hoverBackgroundColor: '#64B5F6',
                hoverBorderColor: '#0D47A1',
                data: daysInMonth.map(day => groupedByDay[day] || 0),
            },
        ],
    };

    useEffect(() => {
        document.title = "Thống kê doanh thu - Admin";
    }, []);

    useEffect(() => {
        const fetchUsers =
            async () => {
                const searchParams: Array<{ field: string; operator: string; value: string }> = [];
                const searchParamsDefault: Array<{ field: string; operator: string; value: string }> = [];

                if (filterOption) {
                    if (filterOption === "RevenueStatisticsDay") {
                        if (selectedStartDate && selectedEndDate) {
                            searchParams.push({
                                field: 'orderDate',
                                operator: '>=',
                                value: selectedStartDate.format('YYYY-MM-DD'),
                            });
                            searchParams.push({
                                field: 'orderDate',
                                operator: '<=',
                                value: selectedEndDate.endOf('day').format('YYYY-MM-DD'),
                            });
                            const response: ResponseSuccess<PageResponse<OrderModel[]>> =
                                await getOrdersForAdmin(1, 100, searchParams, []);
                            setOrders(response.data.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET));
                            setTotalPrice(response.data.data
                                .filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED)
                                .reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0));
                        }
                    } else if (filterOption === "RevenueStatisticsMonth") {
                        if (!selectedYear || !selectedMonth) {
                            console.warn("Chưa chọn tháng hoặc năm!");
                            return;
                        }
                        searchParams.push({
                            field: 'orderDate',
                            operator: '>=',
                            value: `${selectedYear}-${selectedMonth}-01`,
                        });
                        searchParams.push({
                            field: 'orderDate',
                            operator: '<=',
                            value: `${selectedYear}-${selectedMonth}-31`,
                        });
                        const response: ResponseSuccess<PageResponse<OrderModel[]>> =
                            await getOrdersForAdmin(1, 100, searchParams, []);
                        if (response.status === 200) {
                            setOrders(response.data.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET));
                            setTotalPrice(response.data.data
                                .filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED)
                                .reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0));
                        } else {
                            setOrders([]);
                            setTotalPrice(0);
                        }

                    } else if (filterOption === "RevenueStatisticsYear") {

                        searchParams.push({
                            field: 'orderDate',
                            operator: '>=',
                            value: `${selectedYear}-01-01`,
                        });
                        searchParams.push({
                            field: 'orderDate',
                            operator: '<=',
                            value: `${selectedYear}-12-31`,
                        });
                        const response: ResponseSuccess<PageResponse<OrderModel[]>> =
                            await getOrdersForAdmin(1, 100, searchParams, []);
                        setOrders(response.data.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET));
                        setTotalPrice(response.data.data
                            .filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED)
                            .reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0));
                    }
                } else {

                    const startOfDay = new Date();

                    searchParamsDefault.push({
                        field: 'orderDate',
                        operator: '>=',
                        value: startOfDay.toISOString().slice(0, 10),
                    });

                    const response: ResponseSuccess<PageResponse<OrderModel[]>> =
                        await getOrdersForAdmin(1, 100, searchParamsDefault, []);
                    setOrders(response.data.data.filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET));
                    setTotalPrice(response.data.data
                        .filter(order => order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED)
                        .reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0));
                    console.log(response.data.data);
                };
            }

        fetchUsers();

    }, [selectedYear, selectedMonth, selectedStartDate, selectedEndDate]);

    useEffect(() => {
        const fetchRevenueComparison = async () => {
            try {
                const today = new Date();
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                const searchParamsToday = [
                    { field: 'orderDate', operator: '>=', value: today.toISOString().slice(0, 10), },
                ];

                const searchParamsYesterday = [
                    { field: 'orderDate', operator: '>=', value: yesterday.toISOString().slice(0, 10) },
                    { field: 'orderDate', operator: '<=', value: today.toISOString().slice(0, 10) },
                ];

                // Lấy đơn hàng hôm nay
                const responseToday = await getOrdersForAdmin(1, 1000, searchParamsToday, []);
                const ordersToday = responseToday.data.data.filter(
                    (order: OrderModel) =>
                        order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED
                );
                const totalRevenueToday = ordersToday.reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0);
                setTodayRevenue(totalRevenueToday);

                // Lấy đơn hàng hôm qua
                const responseYesterday = await getOrdersForAdmin(1, 1000, searchParamsYesterday, []);
                const ordersYesterday = responseYesterday.data.data.filter(
                    (order: OrderModel) =>
                        order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED
                );
                const totalRevenueYesterday = ordersYesterday.reduce((sum: number, order: OrderModel) => sum + Number(order.discountPrice), 0);
                setYesterdayRevenue(totalRevenueYesterday);

                // Tính phần trăm chênh lệch
                if (totalRevenueYesterday > 0) {
                    const difference = ((totalRevenueToday - totalRevenueYesterday) / totalRevenueYesterday) * 100;
                    setRevenueDifference(difference);
                } else {
                    setRevenueDifference(0);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        console.log("Today Revenue: ", todayRevenue);
        console.log("Yesterday Revenue: ", yesterdayRevenue);
        fetchRevenueComparison();
    }, []);

    useEffect(() => {
        const fetchRevenueMonthComparison = async () => {
            try {
                const now = dayjs();
                const currentMonthStart = now.startOf('month').format('YYYY-MM-DD');
                const currentMonthEnd = now.endOf('month').format('YYYY-MM-DD');

                const previousMonth = now.subtract(1, 'month');
                const previousMonthStart = previousMonth.startOf('month').format('YYYY-MM-DD');
                const previousMonthEnd = previousMonth.endOf('month').format('YYYY-MM-DD');

                const searchParamsCurrentMonth = [
                    { field: 'orderDate', operator: '>=', value: currentMonthStart },
                    { field: 'orderDate', operator: '<=', value: currentMonthEnd },
                ];

                const searchParamsPreviousMonth = [
                    { field: 'orderDate', operator: '>=', value: previousMonthStart },
                    { field: 'orderDate', operator: '<=', value: previousMonthEnd },
                ];

                // Lấy đơn hàng tháng hiện tại
                const responseCurrentMonth = await getOrdersForAdmin(1, 1000, searchParamsCurrentMonth, []);
                const ordersCurrentMonth = responseCurrentMonth.data.data.filter(
                    (order: OrderModel) =>
                        order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED
                );
                const totalRevenueCurrentMonth = ordersCurrentMonth.reduce(
                    (sum: number, order: OrderModel) => sum + Number(order.discountPrice),
                    0
                );
                setCurrentMonthRevenue(totalRevenueCurrentMonth);

                // Lấy đơn hàng tháng trước
                const responsePreviousMonth = await getOrdersForAdmin(1, 1000, searchParamsPreviousMonth, []);
                const ordersPreviousMonth = responsePreviousMonth.data.data.filter(
                    (order: OrderModel) =>
                        order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED
                );
                const totalRevenuePreviousMonth = ordersPreviousMonth.reduce(
                    (sum: number, order: OrderModel) => sum + Number(order.discountPrice),
                    0
                );
                setPreviousMonthRevenue(totalRevenuePreviousMonth);

                // Tính phần trăm chênh lệch
                if (totalRevenuePreviousMonth > 0) {
                    const difference = ((totalRevenueCurrentMonth - totalRevenuePreviousMonth) / totalRevenuePreviousMonth) * 100;
                    setRevenueMonthDifference(difference);
                } else {
                    setRevenueMonthDifference(0);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        console.log("Current Month Revenue: ", currentMonthRevenue);
        console.log("Previous Month Revenue: ", previousMonthRevenue);
        fetchRevenueMonthComparison();
    }, []);

    return (
        <Box sx={{ backgroundColor: "white", width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', ml: 2 }}>Doanh Thu</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2, mt: 2, justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1 }}>Lọc doanh thu</Box>
                    <Select
                        value={filterOption || "RevenueStatisticsDay"} // Giá trị của Select
                        onChange={handleSelectChange} // Hàm xử lý khi chọn
                        sx={{ width: 250, height: 38, ml: 1 }}
                    >
                        <MenuItem value="RevenueStatisticsDay">Doanh thu theo ngày</MenuItem>
                        <MenuItem value="RevenueStatisticsMonth">Doanh thu theo tháng</MenuItem>
                        <MenuItem value="RevenueStatisticsYear">Doanh thu theo năm</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1, mr: 1 }}>Chọn tháng</Box>
                    <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        sx={{ width: 150, height: 38 }}
                        // disabled={filterOption !== "RevenueStatisticsMonth"}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 30 * 5, // Giới hạn độ cao, 48px là chiều cao mỗi item
                                    width: 150,
                                },
                            },
                        }}
                    >
                        <MenuItem value="01">Tháng 1</MenuItem>
                        <MenuItem value="02">Tháng 2</MenuItem>
                        <MenuItem value="03">Tháng 3</MenuItem>
                        <MenuItem value="04">Tháng 4</MenuItem>
                        <MenuItem value="05">Tháng 5</MenuItem>
                        <MenuItem value="06">Tháng 6</MenuItem>
                        <MenuItem value="07">Tháng 7</MenuItem>
                        <MenuItem value="08">Tháng 8</MenuItem>
                        <MenuItem value="09">Tháng 9</MenuItem>
                        <MenuItem value="10">Tháng 10</MenuItem>
                        <MenuItem value="11">Tháng 11</MenuItem>
                        <MenuItem value="12">Tháng 12</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1, mr: 1 }}>Chọn năm</Box>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        sx={{ width: 150, height: 38 }}
                    // disabled={filterOption !== "RevenueStatisticsYear"}
                    >
                        <MenuItem value="2022">2022</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Ngày bắt đầu</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedStartDate}
                            onChange={(newValue) => setSelectedStartDate(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                            disabled={filterOption !== "RevenueStatisticsDay"}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Ngày kết thúc</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedEndDate}
                            onChange={(newValue) => setSelectedEndDate(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                            disabled={filterOption !== "RevenueStatisticsDay"}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Grid container spacing={3} justifyContent="center" alignItems="center" marginTop={2}>
                {/* Summary Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6">Tổng doanh thu</Typography>
                        <Typography variant="h4" color="primary">
                            {ConvertPrice(totalPrice)}
                        </Typography>
                        <Typography variant="subtitle1">{orders.length} hóa đơn</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6">Đơn hàng hủy</Typography>
                        <Typography variant="h4" color="error">
                            {orders.filter(order => order.status === OrderStatus.CANCELLED).length}
                        </Typography>
                        <Typography variant="subtitle1">Tỉ lệ: {(orders.filter(order => order.status === OrderStatus.CANCELLED).length / orders.length) * 100} %</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color={revenueDifference >= 0 ? 'success' : 'error'}>
                                    {revenueDifference >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                                </IconButton>
                                <Box ml={1} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">So với hôm qua</Typography>
                                    <Typography variant="h4" color={revenueDifference >= 0 ? 'success' : 'error'}>
                                        {revenueDifference >= 0 ? '+' : ''}
                                        {revenueDifference.toFixed(2)}%
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color={revenueMonthDifference >= 0 ? 'success' : 'error'}>
                                    {revenueMonthDifference >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                                </IconButton>
                                <Box ml={1} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">So với tháng trước</Typography>
                                    <Typography variant="h4" color={revenueMonthDifference >= 0 ? 'success' : 'error'}>
                                        {revenueMonthDifference >= 0 ? '+' : ''}
                                        {revenueMonthDifference.toFixed(2)}%
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Revenue Chart Section */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Doanh thu từng ngày của tháng {selectedMonth}/{selectedYear}
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 1000, height: 'auto' }}>
                            <Bar
                                data={dailySalesData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'bottom',
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default RevenueStatistics;