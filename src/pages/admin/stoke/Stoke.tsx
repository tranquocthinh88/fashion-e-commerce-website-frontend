import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchInput from "../../../components/common/search/SearchInput";

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
    { field: 'issueDate', headerName: 'Ngày nhập', type: 'date', width: 120 },
    { field: 'inputRevenue', headerName: 'Số lượng nhập', type: 'number', width: 120 },
    { field: 'sold', headerName: 'Số lượng bán', type: 'number', width: 120 },
    { field: 'revenue', headerName: 'Giá nhập', type: 'number', width: 150 },
    {
        field: 'action',
        headerName: 'Thao tác',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="success"
            >
                Edit
            </Button>
        ),
    },
];

const useStyles = makeStyles({
    dataGridBox: {
        width: '93%',
    },
});

const Stoke = () => {
    const classes = useStyles();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 1 , width: '100%'}}>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h5" gutterBottom>
                    Quản lý kho
                </Typography>
            </Box>
            <Box sx={{ width: "25%", mt: 2, mb: 2 }}>
                <SearchInput placeHolder={"Nhập tên sản phẩm"} />
            </Box>
            <Box className={classes.dataGridBox}>
                <DataGrid rows={data} columns={columns} autoHeight />
            </Box>
        </Box>

    );
}
export default Stoke;