import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { ResponseSuccess } from "../../../../dtos/responses/response.success.ts";
import { ProviderModel } from "../../../../models/provider.model.ts";
import { create } from "../../../../services/provider.service.ts";
import { Status } from "../../../../models/enum/status.enum.ts";
import { ProviderDto } from "../../../../dtos/requests/admin/provider.dto.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    addProvider: (provider: ProviderModel) => void;
    showAlert: (status: string, message: string) => void

}
const DialogCreateProvider = ({ open, handleClose, addProvider, showAlert }: Props) => {
    const [providerName, setProviderName] = useState('');
    const [errorText, setErrorText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    // const [addressId, setAddressId] = useState<number | null>(null);
    const [address, setAddress] = useState<string>('');
    const handleSubmit = async () => {
        if (providerName === '') {
            setErrorText('Vui lòng điền vào trường này');
        } else if (email === '' || phoneNumber === '') {
            setErrorText('Vui lòng nhập email và số điện thoại');
        }
        else {
            try {
                const value: ProviderDto = {
                    providerName: providerName,
                    phoneNumber: phoneNumber,
                    email: email,
                    // addressId: addressId,
                    address: address,
                    status: Status.ACTIVE
                }
                const response: ResponseSuccess<ProviderModel> = await create(value);
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
                    id="address"
                    name="address"
                    label="Địa chỉ"
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
                        setAddress(e.target.value);
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