import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import { ProviderModel } from "../../../../models/provider.model.ts";
import {deleteProvider as deleteProviderAPI} from "../../../../services/provider.service.ts";
type Props = {
    open: boolean;
    handleClose: () => void;
    deleteProvider: (provider: ProviderModel) => void;
    provider: ProviderModel;
    showAlert: (status: string, message: string) => void
}
const DialogDeleteProvider = ({open, handleClose, deleteProvider, provider, showAlert} : Props) => {
    const handleDelete = async () => {
        try {
            const response = await deleteProviderAPI(provider.id);
            console.log(response);
            deleteProvider(provider);
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
export default DialogDeleteProvider;