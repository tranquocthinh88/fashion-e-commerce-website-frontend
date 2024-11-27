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
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../../dtos/responses/response.success.ts";
import { updateProvider as updateProviderAPI } from "../../../../services/provider.service.ts";
import { Status } from "../../../../models/enum/status.enum.ts";
import { ProviderModel } from "../../../../models/provider.model.ts";
import { ProviderDto } from "../../../../dtos/requests/admin/provider.dto.ts";
type Props = {
    open: boolean;
    handleClose: () => void;
    provider?: ProviderModel;
    updateProvider: (provider: ProviderModel) => void;
    showAlert: (status: string, message: string) => void
}
const DialogUpdateProvider = ({ open, handleClose, provider, updateProvider, showAlert }: Props) => {
    const [providerName, setProviderName] = useState(provider?.providerName || '');
    const [errorText, setErrorText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(provider?.phoneNumber || '');
    const [email, setEmail] = useState(provider?.email || '');
    const [addressId, setAddressId] = useState<number | null>(provider?.address?.id ?? null);
    const [status, setStatus] = useState(provider?.status?.toString()
        ?? Status.ACTIVE.toString());
    const handleSubmit = async () => {
        let newStatus: Status = Status.INACTIVE;
        if (status === 'ACTIVE') {
            newStatus = Status.ACTIVE;
        }
        if (provider?.providerName !== providerName || provider?.status !== newStatus) {
            try {
                const value: ProviderDto = {
                    providerName: providerName,
                    phoneNumber: phoneNumber,
                    email: email,
                    addressId: addressId ?? 0,
                    status: Status.ACTIVE
                }
                const response: ResponseSuccess<ProviderModel> = await updateProviderAPI(provider?.id, value);
                updateProvider(response.data);
                showAlert('success', 'Cập nhật thành công');
                handleClose();
            } catch (error) {
                showAlert('error', 'Cập nhật thất bại');
                handleClose();
            }
        }
    }
    
    useEffect(() => {
        if (provider) {
            setProviderName(provider.providerName || '');
            setPhoneNumber(provider.phoneNumber || '');
            setEmail(provider.email || '');
            setAddressId(addressId ?? null);
            setStatus(provider.status?.toString() ?? Status.ACTIVE.toString());
        }
    }, [provider]);

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
                <TextField
                    autoFocus
                    margin="dense"
                    id="number_phone"
                    name="number_phone"
                    label="Số điện thoại"
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    value={phoneNumber}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setErrorText('');
                    }}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    value={email}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorText('');
                    }}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="address_id"
                    name="address_id"
                    label="address_id"
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    value={addressId}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setAddressId(Number(e.target.value));
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