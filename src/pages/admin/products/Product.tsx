import { Box, Button, Select, TextField } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import ProductCardAdmin from "../../../components/admin/cards/ProductCardAdmin";

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
    createData('002', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('003', 'Eclair', 262, 16.0, 24, 6.0),
    createData('004', 'Cupcake', 305, 3.7, 67, 4.3),
    createData('005', 'Gingerbread', 356, 16.0, 49, 3.9),
    createData('005', 'Gingerbread', 356, 16.0, 49, 3.9),
    createData('005', 'Gingerbread', 356, 16.0, 49, 3.9),
    createData('005', 'Gingerbread', 356, 16.0, 49, 3.9),
];

const Product = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Product !</Box>
            <Box sx={{
                width: 170,
                mt: 2, mb: 2, transition: "transform 0.3s ease-in-out", '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Button variant="contained" sx={{ backgroundColor: '#c0fd05', color: '#f511cc' }}
                    onClick={() => navigate("/admin/products/createProducts")}>
                    Thêm sản phẩm
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 0.5 }}>Lọc sản phẩm</Box>
                    <Select sx={{ width: 100, height: 38, ml: 1 }}>
                        <option value="Red">Red</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Green">Black</option>
                    </Select>
                </Box>
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
            <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center'}}>
                {rows.map(() => (
                    <Box sx={{width: '320px'}}>
                        <ProductCardAdmin />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
export default Product;