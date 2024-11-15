import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {ResponseSuccess} from "../../../../dtos/responses/response.success.ts";
import { ColorModel } from "../../../../models/color.model.ts";
import { createColor } from "../../../../services/color.service.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    addColor: (color: ColorModel) => void;
    showAlert: (status: string, message: string) => void
}

const DialogCreateColor = ({open, handleClose, addColor, showAlert}: Props) => {
    const [colorName, setColorName] = useState('');
    const [errorText, setErrorText] = useState('');
    const handleSubmit = async () => {
        if (colorName === '') {
            setErrorText('Vui lòng điền vào trường này');
        } else {
            try {
                const response: ResponseSuccess<ColorModel> = await createColor({colorName});
                addColor(response.data);
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
                    id="color_name"
                    name="color_name"
                    label="Tên màu sắc"
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
                        setColorName(e.target.value);
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
export default DialogCreateColor;