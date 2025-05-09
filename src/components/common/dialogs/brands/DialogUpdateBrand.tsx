import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { useState } from "react";
import { ResponseSuccess } from "../../../../dtos/responses/response.success.ts";
import { updateBrand as updateBrandAPI } from "../../../../services/brand.service.ts";
import { BrandModel } from "../../../../models/brand.model.ts";
type Props = {
    open: boolean;
    handleClose: () => void;
    brand?: BrandModel;
    updateBrand: (brand: BrandModel) => void;
    showAlert: (status: string, message: string) => void
}
const DialogUpdateBrand = ({ open, handleClose, brand, updateBrand, showAlert }: Props) => {
    const [brandName, setBrandName] = useState(brand?.brandName);
    const [errorText, setErrorText] = useState('');
    const handleSubmit = async () => {
        if (brand?.brandName !== brandName) {
            try {
                const response: ResponseSuccess<BrandModel> = await updateBrandAPI(brand?.id ?? '', {
                    brandName
                });
                updateBrand(response.data);
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
            <DialogTitle>Cập nhật thương hiệu</DialogTitle>
            <DialogContent>
                <TextField
                    disabled={true}
                    label="ID"
                    value={brand?.id}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
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
                    value={brandName}
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
                <Button onClick={handleSubmit}>Cập nhật</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogUpdateBrand;