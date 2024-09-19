import { Box, Button, Select, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { bodyAdminColor, navbarHover } from "../../../theme";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

function createData(
    id: string,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    status: string = 'active'
) {
    return { id, name, calories, fat, carbs, protein, status };
}

const rows = [
    createData('001', 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('001', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('001', 'Eclair', 262, 16.0, 24, 6.0),
    createData('001', 'Cupcake', 305, 3.7, 67, 4.3),
    createData('001', 'Gingerbread', 356, 16.0, 49, 3.9),
];

const Product = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Product !</Box>
            <Box sx={{ width: 170,
                mt: 2, mb: 2,transition: "transform 0.3s ease-in-out", '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Button variant="contained" sx={{ backgroundColor: '#c0fd05', color: '#f511cc' }}
                onClick={() => navigate("/admin/products/createProducts")}>
                    Thêm sản phẩm
                    </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>

                <Select></Select>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="standard-textarea"
                        label="Tìm kiếm"
                        placeholder="Nhập tên sản phẩm..."
                        multiline
                        variant="standard"
                        sx={{ width: 300 }}
                    />
                    <Button type="button" aria-label="search" sx={{ mt: 2 }}><SearchIcon sx={{ color: 'black' }} /></Button>
                </Box>
            </Box>
            <TableContainer sx={{ backgroundColor: '#c0eec3' }}>
                <Table sx={{ minWidth: 650, border: '1px solid black' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ borderBottom: '2px solid black' }}>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Tên sản phẩm</TableCell>
                            <TableCell align="left">Hình ảnh</TableCell>
                            <TableCell align="left">Nhà cung cấp</TableCell>
                            <TableCell align="left">Thương hiệu</TableCell>
                            <TableCell align="left">Giá&nbsp;(VND)</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '2px solid black',
                                    '&:hover': { background: navbarHover }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.calories}</TableCell>
                                <TableCell align="left">{row.fat}</TableCell>
                                <TableCell align="left">{row.carbs}</TableCell>
                                <TableCell align="left">{row.protein}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Button>update</Button>
                                    <Button>delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default Product;