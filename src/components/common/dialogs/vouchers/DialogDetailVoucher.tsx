import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Box, Button } from '@mui/material';
import { VoucherModel } from '../../../../models/voucher.model';

interface VoucherDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    voucher: VoucherModel | null;
    setVoucher: React.Dispatch<React.SetStateAction<VoucherModel | null>>;
    handleUpdate: (updatedVoucher: VoucherModel) => void;
    handleDelete: (id: number) => void;
}

const VoucherDetailsDialog = ({
    open,
    onClose,
    voucher,
    setVoucher,
    handleUpdate,
    handleDelete
}: VoucherDetailsDialogProps) => {

    const voucherTypeToVietnamese = (type: string): string => {
        const map: { [key: string]: string } = {
            FOR_PRODUCT: "Giảm giá cho hóa đơn",
            FOR_DELIVERY: "Giảm giá cho vận chuyển",
        };
        return map[type] || "Không xác định"; // Trả về "Không xác định" nếu không tìm thấy
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Chi tiết Voucher</DialogTitle>
            <DialogContent>
                {voucher && (
                    <Box component="form">
                        {/* Mã voucher */}
                        <TextField
                            label="Mã voucher"
                            fullWidth
                            margin="dense"
                            value={voucher.id}
                            InputProps={{ readOnly: true }}
                        />

                        {/* Tên voucher */}
                        <TextField
                            label="Tên voucher"
                            fullWidth
                            margin="dense"
                            value={voucher.name}
                            onChange={(e) =>
                                setVoucher({ ...voucher, name: e.target.value })
                            }
                        />

                        {/* Loại voucher */}
                        <TextField
                            label="Loại voucher"
                            fullWidth
                            margin="dense"
                            value={voucherTypeToVietnamese(voucher.voucherType)}
                            InputProps={{ readOnly: true }}
                        />

                        <TextField
                            label="Ngày bắt đầu"
                            fullWidth
                            margin="dense"
                            type="date"
                            value={voucher.startDate ? (typeof voucher.startDate === 'string' ? voucher.startDate.split(' ')[0] : '') : ''}
                            onChange={(e) => {
                                const newStartDate = e.target.value;
                                setVoucher({
                                    ...voucher,
                                    startDate: newStartDate + ' 00:00:00'
                                });
                            }}
                        />

                        {/* Ngày kết thúc */}
                        <TextField
                            label="Ngày kết thúc"
                            fullWidth
                            margin="dense"
                            type="date"
                            value={voucher.expiredDate ? (typeof voucher.expiredDate === 'string' ? voucher.expiredDate.split(' ')[0] : '') : ''}
                            onChange={(e) => {
                                const newExpiredDate = e.target.value;
                                setVoucher({
                                    ...voucher,
                                    expiredDate: newExpiredDate + ' 23:59:59'
                                });
                            }}
                        />

                        {/* Số lượng */}
                        <TextField
                            label="Số lượng"
                            fullWidth
                            margin="dense"
                            type="number"
                            value={voucher.quantity}
                            onChange={(e) =>
                                setVoucher({ ...voucher, quantity: parseInt(e.target.value) || 0 })
                            }
                        />

                        {/* Phần trăm giảm */}
                        <TextField
                            label="Phần trăm giảm"
                            fullWidth
                            margin="dense"
                            type="number"
                            value={voucher.discount}
                            onChange={(e) =>
                                setVoucher({ ...voucher, discount: parseInt(e.target.value) || 0 })
                            }
                        />

                        {/* Tiền giảm tối đa */}
                        <TextField
                            label="Tiền giảm tối đa"
                            fullWidth
                            margin="dense"
                            type="number"
                            value={voucher.maxDiscountAmount}
                            onChange={(e) =>
                                setVoucher({ ...voucher, maxDiscountAmount: parseInt(e.target.value) || 0 })
                            }
                        />

                        {/* Hóa đơn tối thiểu*/}
                        <TextField
                            label="Giảm cho hóa đơn tối thiểu"
                            fullWidth
                            margin="dense"
                            type="number"
                            value={voucher.minOrderAmount}
                            onChange={(e) =>
                                setVoucher({ ...voucher, minOrderAmount: parseInt(e.target.value) || 0 })
                            }
                        />

                        {/* Ghi chú */}
                        <TextField
                            label="Ghi chú"
                            fullWidth
                            margin="dense"
                            multiline
                            rows={2}
                            value={voucher.note}
                            onChange={(e) =>
                                setVoucher({ ...voucher, note: e.target.value })
                            }
                        />
                    </Box>
                )}

                {/* Nút cập nhật và xóa */}
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            if (voucher) {
                                handleUpdate(voucher);
                                onClose();
                            }
                        }}
                    >
                        Cập nhật
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            if (voucher) {
                                handleDelete(voucher.id);
                                onClose();
                            }
                        }}
                    >
                        Xóa
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default VoucherDetailsDialog;
