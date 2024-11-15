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
import { BrandModel } from "../../../models/brand.model.ts";
import { getAllBrands } from "../../../services/brand.service.ts";
import DialogUpdateBrand from "../../../components/common/dialogs/brands/DialogUpdateBrand.tsx";
import DialogDeleteBrand from "../../../components/common/dialogs/brands/DialogDeleteBrand.tsx";
import DialogCreateBrand from "../../../components/common/dialogs/brands/DialogCreateBrand.tsx";

const Brand = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [brand, setBrand] = useState<BrandModel>({ id: '', brandName: '' });
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
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }
    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<BrandModel[]> = await getAllBrands();
                setBrands(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const addBrand = (brand: BrandModel) => {
        setBrands(prev => [...prev, brand]);
    }
    const updateBrand = (brand: BrandModel) => {
        setBrands(prev => {
            const oldBrand = prev.filter((item) => brand.id === item.id);
            const index = prev.indexOf(oldBrand[0]);
            prev[index] = brand;
            return prev;
        });
    }
    const deleteBrand = (brand: BrandModel) => {
        setBrands(prev => prev.filter((item) => item.id !== brand.id));
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
                <Typography component="span" sx={{ flexGrow: 1 }}>Danh sách thương hiệu</Typography>
                <IconButtonGradient size="small" sx={{
                    background: pinkGradient,
                    color: "#fff",
                    fontSize: 10
                }} onClick={() => setOpen(true)}>Thêm thương hiệu<AddIcon /> </IconButtonGradient>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleBackClick}
                sx={{ mt: 2 }}
            >
                Trở Lại
            </Button>
            {openUpdate && <DialogUpdateBrand showAlert={showAlert} updateBrand={updateBrand} open={openUpdate} handleClose={handleCloseUpdate} brand={brand} />}
            {openDelete && <DialogDeleteBrand showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} brand={brand} deleteBrand={deleteBrand} />}
            {open && <DialogCreateBrand showAlert={showAlert} addBrand={addBrand} open={open} handleClose={handleClose} />}
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}
            <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Id</TableCell>
                            <TableCell >Tên thương hiệu</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.map((brand: BrandModel) => (
                            <TableRow key={brand.id} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{brand.id}</TableCell>
                                <TableCell >{brand.brandName}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '80px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} color={'success'} variant="contained" onClick={() => {
                                        setBrand(brand);
                                        setOpenUpdate(true);
                                    }}>Cập nhật</Button>
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                        setBrand(brand);
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
export default Brand;