import React from 'react';
// import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, TextField } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@mui/styles';

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

const data = [
    { id: 1, imageUrl: 'owl.jpg', productCode: 'HTD1008KI', productName: 'Bánh cá mận', sold: 24, revenue: 2781816 },
    { id: 2, imageUrl: 'cat.jpg', productCode: 'xoay-3-vong', productName: 'SP Xoay 3 vòng', sold: 21, revenue: 3103500 },
    { id: 3, imageUrl: 'boots.jpg', productCode: 'M89-38', productName: 'Giày Boot Nam Cao Cổ Khẩu Đế Màu Đen Da Sần M89-38', sold: 20, revenue: 5960000 },
    { id: 4, imageUrl: 'construction.jpg', productCode: 'testtonkho-gianhap', productName: 'Công trình liên quan tồn kho và giá nhập', sold: 13, revenue: 3887000 },
    { id: 5, imageUrl: 'durian.jpg', productCode: 'HTD1008KT', productName: 'Bánh sầu riêng', sold: 10, revenue: 3500000 },
    { id: 6, imageUrl: 'boots2.jpg', productCode: 'M89-39', productName: 'Giày Boot Nam Cao Cổ Khẩu Đế Màu Đen Da Sần M89-39', sold: 9, revenue: 2682000 },
    { id: 7, imageUrl: 'fashion.jpg', productCode: 'VAYNU-003', productName: 'Váy nữ thời trang 003', sold: 5, revenue: 3250000 },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 70 },
    {
        field: 'imageUrl',
        headerName: 'Hình ảnh',
        width: 100,
        renderCell: (params) => <img src={params.value} alt="" style={{ width: 60, height: 60 }} />,
    },
    { field: 'productCode', headerName: 'Mã sản phẩm', width: 150 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 250 },
    { field: 'sold', headerName: 'Số lượng bán', type: 'number', width: 150 },
    { field: 'revenue', headerName: 'Tiền hàng', type: 'number', width: 150 },
];

const pieData = [
    { value: 2781816, color: '#FF6384' },
    { value: 3103500, color: '#36A2EB' },
    { value: 5960000, color: '#FFCE56' },
    {  value: 3887000, color: '#4BC0C0' },
    {  value: 3500000, color: '#9966FF' },
    {  value: 2682000, color: '#FF9F40' },
    {  value: 3250000, color: '#FF6D00' },
];

const BestSeller: React.FC = () => {
    const classes = useStyles();

    return (
        <Box sx={{width: '100%', ml: 1}}>
            <Box mt={4} mb={2}>
                <Typography variant="h5" gutterBottom>
                    SẢN PHẨM BÁN CHẠY
                </Typography>
            </Box>
            <Box mb={4} display="flex" justifyContent="space-evenly">
                <TextField
                    label="Từ ngày"
                    type="date"
                    defaultValue="2018-09-01"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Đến ngày"
                    type="date"
                    defaultValue="2018-11-14"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box className={classes.container}>
                <Box className={classes.dataGridBox}>
                    <DataGrid rows={data} columns={columns} autoHeight />
                </Box>
                <Box className={classes.chartBox}>
                    <Typography variant="h6" gutterBottom>
                        TOP 10 sản phẩm bán chạy:
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default BestSeller;