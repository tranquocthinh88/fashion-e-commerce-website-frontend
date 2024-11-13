import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { useState } from "react";
import { ResponseSuccess } from "../../../../dtos/responses/response.success.ts";
import { updateProvider as updateProviderAPI } from "../../../../services/provider.service.ts";
import { Status } from "../../../../models/enum/status.enum.ts";
import { ProviderModel } from "../../../../models/provider.model.ts";
type Props = {
    open: boolean;
    handleClose: () => void;
    provider?: ProviderModel;
    updateProvider: (provider: ProviderModel) => void;
    showAlert: (status: string, message: string) => void
}
const DialogUpdateProvider = ({ open, handleClose, provider, updateProvider, showAlert }: Props) => {
    const [providerName, setProviderName] = useState(provider?.providerName);
    const [errorText, setErrorText] = useState('');
    const [status, setStatus] = useState(provider?.status?.toString()
        ?? Status.ACTIVE.toString());
    const handleSubmit = async () => {
        let newStatus: Status = Status.INACTIVE;
        if (status === 'ACTIVE') {
            newStatus = Status.ACTIVE;
        }
        if (provider?.providerName !== providerName || provider?.status !== newStatus) {
            try {
                const response: ResponseSuccess<ProviderModel> = await updateProviderAPI(provider?.id, {
                    providerName,
                    // phoneNumber,
                    // email,
                    // address,
                    status: newStatus
                });
                updateProvider(response.data);
                showAlert('success', 'Cập nhật thành công');
                handleClose();
            } catch (error) {
                showAlert('error', 'Cập nhật thất bại');
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
            <DialogTitle>Cập nhật nhà cung cấp</DialogTitle>
            <DialogContent>
                <TextField
                    disabled={true}
                    label="ID"
                    value={provider?.id}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
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
                    value={providerName}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setProviderName(e.target.value);
                        setErrorText('');
                    }}
                />
            </DialogContent>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="status">Trạng thái</InputLabel>
                    <Select
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}
                        labelId="status"
                        id="status"
                        value={status}
                        label="Trạng thái"
                    >
                        <MenuItem value={Status.ACTIVE.toString()}>Hoạt động</MenuItem>
                        <MenuItem value={Status.INACTIVE.toString()}>Ngưng hoạt động</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit}>Cập nhật</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogUpdateProvider;