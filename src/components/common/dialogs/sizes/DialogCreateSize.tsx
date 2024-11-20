import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import { ResponseSuccess } from "../../../../dtos/responses/response.success.ts";
import { SizeModel } from "../../../../models/size.model.ts";
import { createSize } from "../../../../services/size.service.ts";
import { SizeType } from '../../../../models/enum/size-type.enum';
import { SizeDto } from "../../../../dtos/requests/admin/size.dto.ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    addSize: (size: SizeModel) => void;
    showAlert: (status: string, message: string) => void
}

const DialogCreateSize = ({ open, handleClose, addSize, showAlert }: Props) => {
    const [sizeName, setSizeName] = useState('');
    const [errorText, setErrorText] = useState('');
    const [sizeType, setSizeType] = useState(SizeType.NUMBER || SizeType.TEXT);


    const handleSubmit = async () => {
        if (sizeName === '') {
            setErrorText('Vui lòng điền vào trường này');
        } else {
            try {
                const value : SizeDto = {
                    sizeType: sizeType,
                    numberSize: 0,
                    textSize: sizeName
                }

                const response: ResponseSuccess<SizeModel> = await createSize(value);
                addSize(response.data);
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
            <DialogTitle>Thêm kích thước</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel component="legend">Loại kích thước</FormLabel>
                    <RadioGroup
                        row
                        aria-label="sizeType"
                        name="sizeType"
                        value={sizeType}
                        onChange={(e) => setSizeType(e.target.value as SizeType)}
                    >
                        <FormControlLabel value="number" control={<Radio />} label="Số" />
                        <FormControlLabel value="text" control={<Radio />} label="Chữ" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="size_name"
                    name="size_name"
                    label="Tên kích thước"
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
                        setSizeName(e.target.value);
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
export default DialogCreateSize;
