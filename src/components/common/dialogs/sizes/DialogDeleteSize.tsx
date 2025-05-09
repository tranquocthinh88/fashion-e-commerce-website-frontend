import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {deleteSize as deleteSizeAPI} from "../../../../services/size.service.ts";
import { SizeModel } from "../../../../models/size.model.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    deleteSize: (size: SizeModel) => void;
    size: SizeModel;
    showAlert: (status: string, message: string) => void
}

const DialogDeleteSize = ({open, handleClose, deleteSize, size, showAlert} : Props) => {
    const handleDelete = async () => {
        try {
            const response = await deleteSizeAPI(size.id);
            console.log(response);
            deleteSize(size);
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
export default DialogDeleteSize;