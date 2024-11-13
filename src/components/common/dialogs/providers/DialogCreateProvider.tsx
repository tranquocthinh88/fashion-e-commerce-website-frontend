import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {ResponseSuccess} from "../../../../dtos/responses/response.success.ts";
import { ProviderModel } from "../../../../models/provider.model.ts";
import { create } from "../../../../services/provider.service.ts";
type Props = {
    open: boolean;
    handleClose: () => void;
    addProvider: (provider: ProviderModel) => void;
    showAlert: (status: string, message: string) => void

}
const DialogCreateProvider = ({open, handleClose, addProvider, showAlert}: Props) => {
    const [providerName, setProviderName] = useState('');
    const [errorText, setErrorText] = useState('');
    const handleSubmit = async () => {
        if (providerName === '') {
            setErrorText('Vui lòng điền vào trường này');
        } else {
            try {
                const response: ResponseSuccess<ProviderModel> = await create({providerName});
                addProvider(response.data);
                showAlert('success', 'Thêm thành công');
                handleClose();
            } catch (error) {
                showAlert('error', 'Thêm thất bại');
                handleClose();
            }
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
            }}
        >
            <DialogTitle>Thêm nhà cung cấp</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="provider_name"
                    name="provider_name"
                    label="Tên nhà cung cấp"
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setProviderName(e.target.value);
                        setErrorText('');
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCreateProvider;