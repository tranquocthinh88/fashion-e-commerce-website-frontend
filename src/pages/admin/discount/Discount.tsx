import { Box, Button } from "@mui/material";
import { parse } from 'date-fns';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import AlertCustom from "../../../components/common/AlertCustom";
import DialogCreateVoucher from "../../../components/common/dialogs/vouchers/DialogCreateVoucher";
import { VoucherModel } from "../../../models/voucher.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { deleteVoucher, getAllVouchers, updateVoucher } from "../../../services/voucher.service";
import { Status } from "../../../models/enum/status.enum";
import VoucherDetailsDialog from "../../../components/common/dialogs/vouchers/DialogDetailVoucher";

const useStyles = makeStyles({
    dataGridBox: {
        width: '98%',
    },
});

const Discount = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [vouchers, setVouchers] = useState<VoucherModel[]>([]);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<VoucherModel | null>(null);
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

    const fetchVouchers = async () => {
        try {
            const response: ResponseSuccess<VoucherModel[]> = await getAllVouchers();

            const filteredVouchers = response.data.filter(voucher => {
                const expiredDate = new Date(voucher.expiredDate);
                return expiredDate > new Date() && voucher.status === Status.ACTIVE;
            });

            setVouchers(filteredVouchers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
       fetchVouchers();
    }, []);

    const handleRowClick = (params: { row: VoucherModel }) => {
        setSelectedVoucher(params.row);
        setOpenDetails(true);
    };

    const handleUpdate = async (updatedVoucher: VoucherModel) => {
        try {
            const formattedStartDate =
                typeof updatedVoucher.startDate === "string"
                    ? updatedVoucher.startDate.replace(" ", "T") // Thay khoảng trắng bằng "T"
                    : updatedVoucher.startDate;

            const formattedExpiredDate =
                typeof updatedVoucher.expiredDate === "string"
                    ? updatedVoucher.expiredDate.replace(" ", "T") // Thay khoảng trắng bằng "T"
                    : updatedVoucher.expiredDate;

            await updateVoucher(updatedVoucher.id, {
                name: updatedVoucher.name,
                startDate: formattedStartDate,
                expiredDate: formattedExpiredDate,
                quantity: updatedVoucher.quantity,
                discount: updatedVoucher.discount,
                note: updatedVoucher.note,
                maxDiscountAmount: updatedVoucher.maxDiscountAmount,
                minOrderAmount: updatedVoucher.minOrderAmount,
                voucherType: updatedVoucher.voucherType,
                scope: updatedVoucher.scope,
            });
            setOpenAlert(
                {
                    show: true,
                    status: 'success',
                    message: 'Bạn đã cập nhật thành công'
                }
            )
            fetchVouchers();
            
        } catch (error) {
            console.error("Cập nhật thất bại", error);
            setOpenAlert(
                {
                    show: true,
                    status: 'error',
                    message: 'Bạn đã cập nhật thất bại'
                }
            )
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteVoucher(id);
            setVouchers(prev => prev.filter(p => p.id !== id));
            setOpenAlert(
                {
                    show: true,
                    status: 'success',
                    message: 'Bạn đã xóa thành công'
                }
            )
        } catch (error) {
            setOpenAlert(
                {
                    show: true,
                    status: 'error',
                    message: 'Bạn đã xóa thất bại'
                }
            )
            console.log(error);
        }
    }


    const voucherTypeToVietnamese = (type: string): string => {
        const map: { [key: string]: string } = {
            FOR_PRODUCT: "Giảm giá cho hóa đơn",
            FOR_DELIVERY: "Giảm giá cho vận chuyển",
        };
        return map[type] || "Không xác định"; 
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Mã voucher', width: 100 },
        { field: 'name', headerName: 'Tên voucher', type: 'string', width: 150 },
        {
            field: 'startDate',
            headerName: 'Ngày bắt đầu',
            type: 'date', width: 100,
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
            type: 'date', width: 100,
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
            field: 'voucherType', headerName: 'Loại voucher', type: 'string',
            renderCell: (params) => voucherTypeToVietnamese(params.value as string),
            width: 190
        },
        { field: 'quantity', headerName: 'Số lượng', type: 'number', width: 80 },
        { field: 'discount', headerName: 'Phần trăm', type: 'number', width: 100 },
        { field: 'maxDiscountAmount', headerName: 'Tiền giảm tối đa', type: 'number', width: 130 },
        { field: 'minOrderAmount', headerName: 'Hóa đơn tối thiểu', type: 'number', width: 130 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRowClick(params)}
                >
                    Chi tiết
                </Button>
            ),
        },
    ];

    useEffect(() => {
        document.title = "Quản lý Khuyến mãi - Admin";
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
                <VoucherDetailsDialog
                    open={openDetails}
                    onClose={() => setOpenDetails(false)}
                    voucher={selectedVoucher}
                    setVoucher={setSelectedVoucher}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            </Box>
        </Box>
    )
};
export default Discount;