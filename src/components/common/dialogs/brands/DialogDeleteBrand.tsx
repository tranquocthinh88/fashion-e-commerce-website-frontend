import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {deleteBrand as deleteBrandAPI} from "../../../../services/brand.service.ts";
import { BrandModel } from "../../../../models/brand.model.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    deleteBrand: (brand: BrandModel) => void;
    brand: BrandModel;
    showAlert: (status: string, message: string) => void
}

const DialogDeleteBrand = ({open, handleClose, deleteBrand, brand, showAlert} : Props) => {
    const handleDelete = async () => {
        try {
            const response = await deleteBrandAPI(brand.id);
            console.log(response);
            deleteBrand(brand);
            showAlert('success', 'Xóa thành công');
            handleClose();
        } catch (error) {
            showAlert('error', 'Xóa thất bại');
            handleClose();
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Bạn có chắc muốn xóa ?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleDelete} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogDeleteBrand;