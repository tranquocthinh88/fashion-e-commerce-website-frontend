import { Box, Button } from "@mui/material";
import { parse } from 'date-fns';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import AlertCustom from "../../../components/common/AlertCustom";
import DialogCreateVoucher from "../../../components/common/dialogs/vouchers/DialogCreateVoucher";
import { VoucherModel } from "../../../models/voucher.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getAllVouchers } from "../../../services/voucher.service";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Mã voucher' },
    { field: 'name', headerName: 'Tên voucher', type: 'string' },
    {
        field: 'startDate',
        headerName: 'Ngày bắt đầu',
        type: 'date',
        valueGetter: (params: { row: VoucherModel }) => {
            const startDate = params;
            if (!startDate) {
                return new Date(); 
            }
            try {
                return parse(startDate.toString(), 'yyyy-MM-dd HH:mm:ss', new Date());
            } catch (e) {
                console.error("Error parsing startDate: ", startDate);
                return new Date(); 
            }
        }
    },
    {
        field: 'expiredDate',
        headerName: 'Ngày kết thúc',
        type: 'date',
        valueGetter: (params: { row: VoucherModel }) => {
            const startDate = params;
            if (!startDate) {
                return new Date();
            }
            try {
                return parse(startDate.toString(), 'yyyy-MM-dd HH:mm:ss', new Date());
            } catch (e) {
                console.error("Error parsing startDate: ", startDate);
                return new Date();
            }
        }
    },
    { field: 'voucherType', headerName: 'Loại voucher', type: 'string' },
    { field: 'quantity', headerName: 'Số lượng', type: 'number' },
    { field: 'discount', headerName: 'Phần trăm', type: 'number' },
    { field: 'maxDiscountAmount', headerName: 'Tiền giảm tối đa', type: 'number' },
    { field: 'minOrderAmount', headerName: 'Hóa đơn tối thiểu', type: 'number' },
    { field: 'note', headerName: 'Ghi chú', type: 'string' },
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
                
                const filteredVouchers = response.data.filter(voucher => {
                    const expiredDate = new Date(voucher.expiredDate); 
                    return expiredDate > new Date(); 
                });
    
                setVouchers(filteredVouchers); 
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