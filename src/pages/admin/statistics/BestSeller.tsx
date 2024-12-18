import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography, } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getOrderDetailsByOrderId, getOrdersForAdmin } from '../../../services/order.service';
import { OrderModel } from '../../../models/order.model';
import { OrderStatus } from '../../../models/enum/order.status';
import { ProductModel } from '../../../models/product.model';
import ExcelJS from 'exceljs';

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
    { field: 'revenue', headerName: 'Tổng doanh thu', type: 'number', width: 150 },
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


    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const searchParams = [];
    //             if (selectedStartDate) {
    //                 searchParams.push({
    //                     field: 'orderDate',
    //                     operator: '>=',
    //                     value: selectedStartDate.format('YYYY-MM-DD'),
    //                 });
    //             }
    //             if (selectedEndDate) {
    //                 searchParams.push({
    //                     field: 'orderDate',
    //                     operator: '<=',
    //                     value: selectedEndDate.format('YYYY-MM-DD'),
    //                 });
    //             }

    //             // Gọi API lấy đơn hàng theo khoảng thời gian
    //             const responseOrders = await getOrdersForAdmin(1, 1000, searchParams, []);
    //             const orders = responseOrders.data.data.filter(
    //                 (order: OrderModel) =>
    //                     order.status !== OrderStatus.NOT_PROCESSED_YET && order.status !== OrderStatus.CANCELLED
    //             );

    //             // Tổng hợp số lượng bán của từng sản phẩm
    //             const productSales: { [key: string]: { product: ProductModel; quantity: number, revenue: number } } = {};

    //             for (const order of orders) {
    //                 const responseOrderDetails = await getOrderDetailsByOrderId(order.id as string);
    //                 responseOrderDetails.data.forEach((detail) => {
    //                     const fullProductId = detail.productDetail?.id;
    //                     if (fullProductId) {
    //                         // Gộp ID bằng cách lấy tiền tố `PD_<id>` trừ đi thông tin chi tiết sau `_`
    //                         const productPrefixMatch = fullProductId.match(/^PD_\d+/); // Trích tiền tố chung từ ID
    //                         if (productPrefixMatch) {
    //                             const productPrefix = productPrefixMatch[0];

    //                             const quantity = detail.quantity ?? 0;
    //                             const priceAtCreateOrder = detail.priceAtCreateOrder ?? 0;

    //                             // Kiểm tra và gộp theo tiền tố ID
    //                             if (productSales[productPrefix]) {
    //                                 productSales[productPrefix].quantity += quantity;
    //                                 productSales[productPrefix].revenue += priceAtCreateOrder * quantity;
    //                             } else {
    //                                 productSales[productPrefix] = {
    //                                     product: {
    //                                         id: productPrefix,
    //                                         productName: detail.productDetail?.product?.productName,
    //                                         thumbnail: detail.productDetail?.product?.thumbnail,
    //                                         productStatus: detail.productDetail?.product?.productStatus || ''
    //                                     },
    //                                     quantity,
    //                                     revenue: priceAtCreateOrder * quantity,
    //                                 };
    //                             }
    //                         }
    //                     }
    //                 });
    //             }

    //             const sortedProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);

    //             const topProducts = sortedProducts.slice(0, 10).map((item) => ({
    //                 id: item.product.id,
    //                 productName: item.product.productName,
    //                 thumbnail: item.product.thumbnail,
    //                 sold: item.quantity,
    //                 revenue: item.revenue,
    //             }));

    //             setProducts(topProducts);
    //             setPieData(generatePieData(topProducts));

    //         } catch (error) {
    //             console.log('Error:', error);
    //         }
    //     };

    //     fetchProducts();
    // }, [selectedStartDate, selectedEndDate]);

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
                        order.status !== OrderStatus.NOT_PROCESSED_YET &&
                        order.status !== OrderStatus.CANCELLED
                );
    
                // Tổng hợp số lượng bán của từng sản phẩm
                const productSales: {
                    [key: string]: { product: ProductModel; quantity: number; revenue: number };
                } = {};
    
                for (const order of orders) {
                    const responseOrderDetails = await getOrderDetailsByOrderId(order.id as string);
                    responseOrderDetails.data.forEach((detail) => {
                        const fullProductId = detail.productDetail?.id;
                        if (fullProductId) {
                            const productPrefixMatch = fullProductId.match(/^PD_\d+/);
                            if (productPrefixMatch) {
                                const productPrefix = productPrefixMatch[0];
                                const quantity = detail.quantity ?? 0;
                                const priceAtCreateOrder = detail.priceAtCreateOrder ?? 0;
    
                                if (productSales[productPrefix]) {
                                    productSales[productPrefix].quantity += quantity;
                                    productSales[productPrefix].revenue += priceAtCreateOrder * quantity;
                                } else {
                                    productSales[productPrefix] = {
                                        product: {
                                            id: productPrefix,
                                            productName: detail.productDetail?.product?.productName,
                                            thumbnail: detail.productDetail?.product?.thumbnail,
                                            productStatus:
                                                detail.productDetail?.product?.productStatus || '',
                                        },
                                        quantity,
                                        revenue: priceAtCreateOrder * quantity,
                                    };
                                }
                            }
                        }
                    });
                }
    
                const sortedProducts = Object.values(productSales).sort(
                    (a, b) => b.quantity - a.quantity
                );
    
                const topProducts = sortedProducts.slice(0, 10).map((item) => ({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStartDate, selectedEndDate]); // Chỉ phụ thuộc vào các biến cần thiết
    

    const generatePieData = (products: Product[]) => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6633', '#FF33FF', '#33FF99', '#33CCFF'];
        return products.map((product, index) => ({
            value: product.revenue, // Doanh thu của sản phẩm
            name: product.productName || `Sản phẩm ${index + 1}`, // Tên sản phẩm
            color: colors[index % colors.length], // Màu sắc
        }));
    };


    const handleExportToExcel = async () => {
        const dataToExport = products.map((item) => ({
            "Mã sản phẩm": item.id,
            "Tên sản phẩm": item.productName,
            "Số lượng bán": item.sold,
            "Tổng doanh thu": item.revenue,
        }));

        const totalRows = dataToExport.length;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Danh sách sản phẩm bán chạy');

        // Thêm tiêu đề và ngày xuất
        worksheet.mergeCells('A1:H1');
        worksheet.getCell('A1').value = "Báo cáo danh sách sản phẩm bán chạy từ ngày " + selectedStartDate?.format('DD/MM/YYYY') + " đến ngày " + selectedEndDate?.format('DD/MM/YYYY');
        worksheet.getCell('A1').font = { bold: true, size: 14 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:H2');
        worksheet.getCell('A2').value = `Ngày xuất: ${new Date().toLocaleDateString("vi-VN")} - ${new Date().toLocaleTimeString("vi-VN")}`;
        worksheet.getCell('A2').font = { italic: true, size: 12 };
        worksheet.getCell('A2').alignment = { horizontal: 'center' };

        // Thêm header cho các cột
        const headerRow = [
            "Mã sản phẩm",
            "Tên sản phẩm",
            "Số lượng bán",
            "Tổng doanh thu",
        ];
        worksheet.addRow(headerRow);

        const header = worksheet.getRow(3);
        header.font = { bold: true };
        header.alignment = { horizontal: 'center' };

        // Thêm dữ liệu từ `dataToExport`
        dataToExport.forEach((data) => {
            worksheet.addRow([
                data["Mã sản phẩm"],
                data["Tên sản phẩm"],
                data["Số lượng bán"],
                data["Tổng doanh thu"],
            ]);
        });

        // Thêm tổng số dòng ở cuối dữ liệu
        worksheet.addRow([]);
        worksheet.addRow([`Tổng số mẫu sản phẩm bán chạy: ${totalRows}`]);
        const totalRow = worksheet.getRow(worksheet.lastRow?.number ?? 0);
        totalRow.font = { bold: true };

        // Xuất file Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'danh-sach-san-pham-ban-chay.xlsx';
        link.click();
    };

    useEffect(() => {
        document.title = "Thống kê sản phẩm bán chạy - Admin";
    }, []);

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
                    <DataGrid rows={products} columns={columns} autoHeight
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                    />
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
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={handleExportToExcel}>
                    Xuất Excel (Danh sách sản phẩm)
                </Button>
            </Box>
        </Box>
    );
};

export default BestSeller;