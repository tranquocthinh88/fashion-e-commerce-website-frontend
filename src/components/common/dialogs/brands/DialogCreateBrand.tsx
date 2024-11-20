import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {ResponseSuccess} from "../../../../dtos/responses/response.success.ts";
import { BrandModel } from "../../../../models/brand.model.ts";
import { createBrand } from "../../../../services/brand.service.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    addBrand: (brand: BrandModel) => void;
    showAlert: (status: string, message: string) => void
}

const DialogCreateBrand = ({open, handleClose, addBrand, showAlert}: Props) => {
    const [brandName, setBrandName] = useState('');
    const [errorText, setErrorText] = useState('');
    const handleSubmit = async () => {
        if (brandName === '') {
            setErrorText('Vui lòng điền vào trường này');
        } else {
            try {
                const response: ResponseSuccess<BrandModel> = await createBrand({brandName});
                addBrand(response.data);
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
            <DialogTitle>Thêm màu sắc</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="brand_name"
                    name="brand_name"
                    label="Tên thương hiệu"
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
                        setBrandName(e.target.value);
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
export default DialogCreateBrand;