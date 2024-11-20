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
import { SizeModel } from "../../../models/size.model.ts";
import { getAllSizes } from "../../../services/size.service.ts";
import DialogCreateSize from "../../../components/common/dialogs/sizes/DialogCreateSize.tsx";
import DialogDeleteSize from "../../../components/common/dialogs/sizes/DialogDeleteSize.tsx";

const Size = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [size, setSize] = useState<SizeModel>({});
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
                const response: ResponseSuccess<SizeModel[]> = await getAllSizes();
                setSizes(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const addSize = (size: SizeModel) => {
        setSizes(prev => [...prev, size]);
    }
    const deleteSize = (size: SizeModel) => {
        setSizes(prev => prev.filter((item) => item.id !== size.id));
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
                <Typography component="span" sx={{ flexGrow: 1 }}>Các kích thước</Typography>
                <IconButtonGradient size="small" sx={{
                    background: pinkGradient,
                    color: "#fff",
                    fontSize: 10
                }} onClick={() => setOpen(true)}>Thêm kích thước<AddIcon /> </IconButtonGradient>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleBackClick}
                sx={{ mt: 2 }}
            >
                Trở Lại
            </Button>
            {openDelete && <DialogDeleteSize showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} size={size} deleteSize={deleteSize} />}
            {open && <DialogCreateSize showAlert={showAlert} addSize={addSize} open={open} handleClose={handleClose} />}
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}
            <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Id</TableCell>
                            <TableCell >Tên loại</TableCell>
                            <TableCell >Tên kích thước</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sizes.map((size: SizeModel) => (
                            <TableRow key={size.id} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{size.id}</TableCell>
                                <TableCell >{size.sizeType}</TableCell>
                                <TableCell >{size.numberSize || size.textSize}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                        setSize(size);
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
export default Size;