import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.success.ts";
import IconButtonGradient from "../../../components/common/IconButtonGradient.tsx";
import { pinkGradient } from "../../../theme.tsx";
import AddIcon from '@mui/icons-material/Add';
import AlertCustom from "../../../components/common/AlertCustom.tsx";
import { useNavigate } from "react-router-dom";
import { ColorModel } from "../../../models/color.model.ts";
import { getAllColors } from '../../../services/color.service';
import DialogDeleteColor from "../../../components/common/dialogs/colors/DialogDeleteColor.tsx";
import DialogCreateColor from "../../../components/common/dialogs/colors/DialogCreateColor.tsx";

const Color = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [color, setColor] = useState<ColorModel>({});
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ColorModel[]> = await getAllColors();
                setColors(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const addColor = (color: ColorModel) => {
        setColors(prev => [...prev, color]);
    }
    const deleteColor = (color: ColorModel) => {
        setColors(prev => prev.filter((item) => item.id !== color.id));
    }
    const showAlert = (status: string, message: string) => {
        setOpenAlert(
            {
                show: true,
                status: status,
                message: message
            }
        )
    }
    const colseAlert = () => {
        setOpenAlert(
            {
                show: false,
                status: '',
                message: ''
            }
        )
    }

    const handleBackClick = () => {
        navigate('/admin/products/createProducts');
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mb: 2 }}>
                <Typography component="span" sx={{ flexGrow: 1 }}>Các màu sắc</Typography>
                <IconButtonGradient size="small" sx={{
                    background: pinkGradient,
                    color: "#fff",
                    fontSize: 10
                }} onClick={() => setOpen(true)}>Thêm màu sắc <AddIcon /> </IconButtonGradient>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleBackClick}
                sx={{ mt: 2 }}
            >
                Trở Lại
            </Button>
            {openDelete && <DialogDeleteColor showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} color={color} deleteColor={deleteColor} />}
            {open && <DialogCreateColor showAlert={showAlert} addColor={addColor} open={open} handleClose={handleClose} />}
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Id</TableCell>
                            <TableCell >Tên màu sắc</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {colors.map((color: ColorModel) => (
                            <TableRow key={color.id} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{color.id}</TableCell>
                                <TableCell >{color.colorName}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                        setColor(color);
                                        setOpenDelete(true);
                                    }} >Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default Color;