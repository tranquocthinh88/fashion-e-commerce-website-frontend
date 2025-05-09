import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {deleteColor as deleteColorAPI} from "../../../../services/color.service.ts";
import { ColorModel } from "../../../../models/color.model.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    deleteColor: (color: ColorModel) => void;
    color: ColorModel;
    showAlert: (status: string, message: string) => void
}

const DialogDeleteColor = ({open, handleClose, deleteColor, color, showAlert} : Props) => {
    const handleDelete = async () => {
        try {
            const response = await deleteColorAPI(color.id);
            console.log(response);
            deleteColor(color);
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
export default DialogDeleteColor;