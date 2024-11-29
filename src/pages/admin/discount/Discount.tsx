import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import AlertCustom from "../../../components/common/AlertCustom";
import DialogCreateVoucher from "../../../components/common/dialogs/vouchers/DialogCreateVoucher";
import { VoucherModel } from "../../../models/voucher.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getAllVouchers } from "../../../services/voucher.service";

const data = [
    { id: 1, productCode: 'HTD1008KI', productName: 'Bánh cá mận', sold: 24, revenue: 2781816 },
    { id: 2, productCode: 'xoay-3-vong', productName: 'SP Xoay 3 vòng', sold: 21, revenue: 3103500 },
    { id: 3, productCode: 'M89-38', productName: 'Giày Boot Nam Cao Cổ Khẩu Đế Màu Đen Da Sần M89-38', sold: 20, revenue: 5960000 },
    { id: 4, productCode: 'testtonkho-gianhap', productName: 'Công trình liên quan tồn kho và giá nhập', sold: 13, revenue: 3887000 },
    { id: 5, productCode: 'HTD1008KT', productName: 'Bánh sầu riêng', sold: 10, revenue: 3500000 },
    { id: 6, productCode: 'M89-39', productName: 'Giày Boot Nam Cao Cổ Khẩu Đế Màu Đen Da Sần M89-39', sold: 9, revenue: 2682000 },
    { id: 7, productCode: 'VAYNU-003', productName: 'Váy nữ thời trang 003', sold: 5, revenue: 3250000 },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 30 },
    { field: 'productCode', headerName: 'Mã voucher', width: 150 },
    { field: 'productName', headerName: 'Tên voucher', width: 150 },
    { field: 'issueDate', headerName: 'Ngày bắt đầu', type: 'date', width: 120 },
    { field: 'expiredDate', headerName: 'Ngày kết thúc', type: 'date', width: 120 },
    { field: 'voucherType', headerName: 'Loại voucher', type: 'singleSelect', width: 100 },
    { field: 'quantity', headerName: 'Số lượng', type: 'number', width: 80 },
    { field: 'discount', headerName: 'Phần trăm', type: 'number', width: 100 },
    { field: 'maxDiscount', headerName: 'Tiền giảm tối đa', type: 'singleSelect', width: 130 },
    { field: 'minOrder', headerName: 'Hóa đơn tối thiểu', type: 'singleSelect', width: 130 },
    { field: 'note', headerName: 'Ghi chú', type: 'string', width: 150 },
];

const useStyles = makeStyles({
    dataGridBox: {
        width: '93%',
    },
});

const Discount = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [vouchers, setVouchers] = useState<VoucherModel[]>([]);
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const showAlert = (status: string, message: string) => {
        setOpenAlert(
            {
                show: true,
                status: status,
                message: message
            }
        )
    }
    const colseAlert = () => {
        setOpenAlert(
            {
                show: false,
                status: '',
                message: ''
            }
        )
    }
    const handleClose = () => {
        setOpen(false);
    }
    const addVoucher = (voucher: VoucherModel) => {
        setVouchers(prev => [...prev, voucher]);
    }
    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<VoucherModel[]> = await getAllVouchers();
                setVouchers(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <Box sx={{ backgroundColor: 'white', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Voucher !</Box>
            <Box sx={{
                width: 170,
                mt: 2, mb: 2, transition: "transform 0.3s ease-in-out", '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Button variant="contained" sx={{ backgroundColor: '#c0fd05', color: '#f511cc' }}
                    onClick={() => setOpen(true)}
                >
                    Thêm voucher
                </Button>
            </Box>
            {open && <DialogCreateVoucher showAlert={showAlert} open={open} handleClose={handleClose} addVoucher={addVoucher} />}
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}
            <Box sx={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                p: 0.5
            }}>
                <Box sx={{ width: '100%' }}>
                    <Box className={classes.dataGridBox}>
                        <DataGrid rows={vouchers} columns={columns} autoHeight />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};
export default Discount;