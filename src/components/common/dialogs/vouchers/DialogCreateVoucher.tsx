import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { VoucherModel, Scope, VoucherType } from "../../../../models/voucher.model";
import { ResponseSuccess } from "../../../../dtos/responses/response.success";
import { createVoucher } from "../../../../services/voucher.service";
import { voucherDto } from "../../../../dtos/requests/orders/voucher.dto";

type Props = {
    open: boolean;
    handleClose: () => void;
    addVoucher: (voucher: VoucherModel) => void;
    showAlert: (status: string, message: string) => void
}

const DialogCreateVoucher = ({ open, handleClose, addVoucher, showAlert }: Props) => {

    const [voucherName, setVoucherName] = useState('');
    const [note, setNote] = useState('');
    const [discount, setDiscount] = useState(0);
    const [voucherType, setVoucherType] = useState<VoucherType>(VoucherType.FOR_PRODUCT);
    const [scope, setScope] = useState<Scope>(Scope.ALL);
    const [startDate, setStartDate] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [maxDiscountAmount, setMaxDiscountAmount] = useState(0);
    const [minOrderAmount, setMinOrderAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [errorText, setErrorText] = useState('');

    const handleSubmit = async () => {
        if (voucherName === '') {
            setErrorText('Vui lòng điền vào trường tên voucher');
        } else if (note === '') {
            setErrorText('Vui lòng điền vào trường ghi chú');
        } else if (discount <= 0) {
            setErrorText('Vui lòng nhập mức giảm giá hợp lệ');
            // } else if (voucherType === undefined) {
            //     setErrorText ('Vui lòng chọn loại voucher');
            // } else if (scope === undefined) {
            //     setErrorText ('Vui lòng chọn phạm vi áp dụng');
        } else if (startDate === '') {
            setErrorText('Vui lòng chọn ngày bắt đầu');
        } else if (expiredDate === '') {
            setErrorText('Vui lòng chọn ngày hết hạn');
        } else if (maxDiscountAmount <= 0) {
            setErrorText('Vui lòng nhập mức giảm giá tối đa hợp lệ');
        } else if (minOrderAmount <= 0) {
            setErrorText('Vui lòng nhập số tiền đơn hàng tối thiểu hợp lệ');
        } else if (quantity <= 0) {
            setErrorText('Vui lòng nhập số lượng hợp lệ');
        } else {
            try {
                // Format lại startDate và expiredDate thành chuẩn ISO
                const formattedStartDate = `${startDate}T00:00:00`;;
                const formattedExpiredDate = `${expiredDate}T23:59:59`;

                const value: voucherDto = {
                    voucherName: voucherName,
                    note: note,
                    discount: discount,
                    voucherType: voucherType,
                    scope: scope,
                    startDate: formattedStartDate,
                    expiredDate: formattedExpiredDate,
                    maxDiscountAmount: maxDiscountAmount,
                    minOrderAmount: minOrderAmount,
                    quantity: quantity
                }
                const response: ResponseSuccess<VoucherModel> = await createVoucher(value);
                addVoucher(response.data);
                showAlert('success', 'Thêm thành công');
                handleClose();
                resetForm();
            } catch (error) {
                showAlert('error', 'Thêm thất bại');
                handleClose();
            }
        }
    }

    const resetForm = () => {
        setVoucherName('');
        setNote('');
        setDiscount(0);
        setVoucherType(VoucherType.FOR_PRODUCT);
        setScope(Scope.ALL);
        setStartDate('');
        setExpiredDate('');
        setMaxDiscountAmount(0);
        setMinOrderAmount(0);
        setQuantity(0);
        setErrorText('');
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
            }}
        >
            <DialogTitle>Thêm voucher</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="voucher_name"
                    name="voucher_name"
                    label="Tên voucher"
                    value={voucherName}
                    onChange={(e) => setVoucherName(e.target.value)}
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="voucher_type"
                    name="voucher_type"
                    label="Loại voucher"
                    select
                    value={voucherType}
                    onChange={(e) => setVoucherType(e.target.value as VoucherType)}
                    fullWidth
                    variant="standard"
                >
                    <MenuItem value={VoucherType.FOR_PRODUCT}>Giảm cho sản phẩm</MenuItem>
                    <MenuItem value={VoucherType.FOR_DELIVERY}>Giảm cho vận chuyển</MenuItem>
                </TextField>
                <TextField
                    margin="dense"
                    id="start_date"
                    name="start_date"
                    label="Ngày bắt đầu"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="end_date"
                    name="end_date"
                    label="Ngày kết thúc"
                    type="date"
                    value={expiredDate}
                    onChange={(e) => setExpiredDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="scope"
                    name="scope"
                    label="Scope"
                    select
                    value={scope}
                    onChange={(e) => setScope(e.target.value as Scope)}
                    fullWidth
                    variant="standard"
                >
                    <MenuItem value={Scope.ALL}>Tất cả</MenuItem>
                    <MenuItem value={Scope.FOR_USER}>Người dùng</MenuItem>
                </TextField>
                <TextField
                    margin="dense"
                    id="discount_percentage"
                    name="discount_percentage"
                    label="Phần trăm giảm giá"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseInt(e.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="max_discount_amount"
                    name="max_discount_amount"
                    label="Tiền giảm tối đa"
                    type="number"
                    value={maxDiscountAmount}
                    onChange={(e) => setMaxDiscountAmount(parseInt(e.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="min_order_amount"
                    name="min_order_amount"
                    label="Đơn hàng tối thiểu"
                    type="number"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(parseInt(e.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="voucher_quantity"
                    name="voucher_quantity"
                    label="Số lượng voucher"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="note"
                    name="note"
                    label="Ghi chú"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCreateVoucher;