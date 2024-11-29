import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getOrderDetailsByOrderId, getOrdersForAdmin } from '../../../services/order.service';
import { OrderModel } from '../../../models/order.model';
import { OrderStatus } from '../../../models/enum/order.status';
import { ProductModel } from '../../../models/product.model';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    dataGridBox: {
        width: '65%',
        marginRight: '20px',
    },
    chartBox: {
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

const columns: GridColDef[] = [
    {
        field: 'thumbnail',
        headerName: 'Hình ảnh',
        width: 100,
        renderCell: (params) => <img src={params.value} alt="" style={{ width: 60, height: 60 }} />,
    },
    { field: 'id', headerName: 'Mã sản phẩm', width: 150 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 250 },
    { field: 'sold', headerName: 'Số lượng bán', type: 'number', width: 150 },
    { field: 'revenue', headerName: 'Tiền hàng', type: 'number', width: 150 },
];

const BestSeller: React.FC = () => {
    const classes = useStyles();
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
    const [pieData, setPieData] = useState<{ value: number; name: string; color: string }[]>([]);
    interface Product {
        id: string;
        productName?: string;
        thumbnail?: string;
        sold: number;
        revenue: number;
    }

    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const searchParams = [];
                if (selectedStartDate) {
                    searchParams.push({
                        field: 'orderDate',
                        operator: '>=',
                        value: selectedStartDate.format('YYYY-MM-DD'),
                    });
                }
                if (selectedEndDate) {
                    searchParams.push({
                        field: 'orderDate',
                        operator: '<=',
                        value: selectedEndDate.format('YYYY-MM-DD'),
                    });
                }

                // Gọi API lấy đơn hàng theo khoảng thời gian
                const responseOrders = await getOrdersForAdmin(1, 1000, searchParams, []);
                const orders = responseOrders.data.data.filter(
                    (order: OrderModel) =>
                        order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED
                );

                // Tổng hợp số lượng bán của từng sản phẩm
                const productSales: { [key: string]: { product: ProductModel; quantity: number, revenue: number } } = {};

                for (const order of orders) {
                    const responseOrderDetails = await getOrderDetailsByOrderId(order.id as string);
                    console.log(`Chi tiết đơn hàng ${order.id}:`, responseOrderDetails.data);
                    responseOrderDetails.data.forEach((detail) => {
                        const productId = detail.productDetail?.id;
                        if (productId) {
                            const quantity = detail.quantity ?? 0;
                            const priceAtCreateOrder = detail.priceAtCreateOrder ?? 0;

                            if (productSales[productId]) {
                                productSales[productId].quantity += quantity;
                                productSales[productId].revenue += priceAtCreateOrder * quantity; 
                            } else {
                                productSales[productId] = {
                                    product: detail.productDetail?.product as ProductModel,
                                    quantity,
                                    revenue: priceAtCreateOrder * quantity, 
                                };
                            }
                        }
                    });
                }

                console.log('Tổng hợp số lượng bán của từng sản phẩm:', productSales);
                const sortedProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);

                const topProducts = sortedProducts.slice(0, 6).map((item) => ({
                    id: item.product.id,
                    productName: item.product.productName,
                    thumbnail: item.product.thumbnail,
                    sold: item.quantity,
                    revenue: item.revenue, 
                }));

                setProducts(topProducts);
                setPieData(generatePieData(topProducts));

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchProducts();
    }, [selectedStartDate, selectedEndDate]);

    const generatePieData = (products: Product[]) => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        return products.map((product, index) => ({
            value: product.revenue, // Doanh thu của sản phẩm
            name: product.productName || `Sản phẩm ${index + 1}`, // Tên sản phẩm
            color: colors[index % colors.length], // Màu sắc
        }));
    };

    return (
        <Box sx={{ width: '100%', ml: 1 }}>
            <Box mt={4} mb={2}>
                <Typography variant="h5" gutterBottom>
                    SẢN PHẨM BÁN CHẠY
                </Typography>
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
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box className={classes.container}>
                <Box className={classes.dataGridBox}>
                    <DataGrid rows={products} columns={columns} autoHeight />
                </Box>
                <Box className={classes.chartBox}>
                    <Typography variant="h6" gutterBottom>
                        TOP 10 sản phẩm bán chạy:
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default BestSeller;