import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { pinkGradient } from "../../../theme";
import { useNavigate } from "react-router-dom";
import DialogCreateProvider from "../../../components/common/dialogs/providers/DialogCreateProvider";
import { ProviderModel } from "../../../models/provider.model";
// import { Status } from "../../../models/enum/status.enum";
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getAllProviders } from "../../../services/provider.service";
import AlertCustom from "../../../components/common/AlertCustom";
import DialogDeleteProvider from "../../../components/common/dialogs/providers/DialogDeleteProvider";
import DialogUpdateProvider from "../../../components/common/dialogs/providers/DialogUpdateProvider";


const Provider = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [provider, setProvider] = useState<ProviderModel>({});
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const handleBackClick = () => {
        navigate('/admin/products/createProducts');
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }

    const addProvider = (provider: ProviderModel) => {
        setProviders(prev => [...prev, provider]);
    }
    const deleteProvider = (provider: ProviderModel) => {
        setProviders(prev => prev.filter((item) => item.id !== provider.id));
    }
    const updateProvider = (provider: ProviderModel) => {
        setProviders(prev => {
            const oldProvider = prev.filter((item) => provider.id === item.id);
            const index = prev.indexOf(oldProvider[0]);
            prev[index] = provider;
            return prev;
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProviderModel[]> = await getAllProviders();
                setProviders(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBackClick}
                    sx={{ mt: 2 }}
                >
                    Trở Lại
                </Button>
                <Button sx={{ background: pinkGradient }} onClick={() => setOpen(true)}>Thêm nhà cung cấp</Button>
            </Box>
            {open && <DialogCreateProvider showAlert={showAlert} open={open} handleClose={handleClose} addProvider={addProvider} />}
            {openDelete && <DialogDeleteProvider showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} provider={provider} deleteProvider={deleteProvider} />}
            {openUpdate && <DialogUpdateProvider showAlert={showAlert} updateProvider={updateProvider} open={openUpdate} handleClose={handleCloseUpdate} provider={provider} />}
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}
            <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Tên nhà cung cấp</TableCell>
                            {/* <TableCell>Trạng thái</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {providers.map((provider: ProviderModel) => (
                            <TableRow key={provider.id} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{provider.id}</TableCell>
                                <TableCell >{provider.providerName}</TableCell>
                                {/* <TableCell >
                                    {provider.status === Status.ACTIVE ?
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center', gap: '5px'
                                        }}><FiberManualRecordIcon fontSize="small" color="success" />Hoạt động</Box> :
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center', gap: '5px'
                                        }}><FiberManualRecordIcon fontSize="small" color="error" />Ngưng hoạt động</Box>}</TableCell> */}
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '80px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} color={'success'} variant="contained" onClick={() => {
                                        setProvider(provider);
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
                                        setProvider(provider);
                                        setOpenDelete(true);
                                    }} >Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default Provider;