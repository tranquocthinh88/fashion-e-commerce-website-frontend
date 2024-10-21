import { Box, Button, MenuItem, Pagination, Select, Stack, TextField, useMediaQuery } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import ProductCardAdmin from "../../../components/admin/cards/ProductCardAdmin";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getAllProducts } from "../../../services/product.service";
import { ProductModel } from "../../../models/product.model";



const Product = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const fNavigate = (id: number) => {
        navigate('update/' + id);
    }
    const [filterOption, setFilterOption] = useState(); // State cho Select

    const handleSelectChange = (event: any) => {
        setFilterOption(event.target.value); // Cập nhật state khi chọn option
    };
    const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductModel[]> = await getAllProducts();
                setProducts(response.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);
    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Sản phẩm !</Box>
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
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 0.5, ml: 2, whiteSpace: 'nowrap' }}>Lọc sản phẩm</Box>
                    <Select
                        value={filterOption} // Giá trị của Select
                        onChange={handleSelectChange} // Hàm xử lý khi chọn
                        sx={{ width: 150, height: 38, ml: 2 }}
                    >
                        <MenuItem value="Shirt" sx={{ color: 'red' }}>Áo</MenuItem>
                        <MenuItem value="Pants" sx={{ color: 'red' }}>Quần</MenuItem>
                        <MenuItem value="Hat" sx={{ color: 'red' }}>Nón</MenuItem>
                        <MenuItem value="Shoes" sx={{ color: 'red' }}>Giày</MenuItem>
                        <MenuItem value="Handbag" sx={{ color: 'red' }}>Túi xách</MenuItem>
                        <MenuItem value="Belt" sx={{ color: 'red' }}>Thắt lưng</MenuItem>
                        <MenuItem value="Wallet" sx={{ color: 'red' }}>Ví</MenuItem>
                        <MenuItem value="Sandal" sx={{ color: 'red' }}>Dép</MenuItem>
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
            <Box sx={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 0.5
        }}>
            {products.map((item: ProductModel, index: number) => (
                <Box sx={{width: '270px'}} key={index}>
                    <Box sx={{width: isMobile ? '150px' : '270px'}} key={index}>
                        <ProductCardAdmin
                            productId={Number(item.id) ?? 0}
                            productName={item.productName ?? ''}
                            productPrice={item.price ?? 0}
                            fNavigate={fNavigate}
                            thumbnail={item.thumbnail ?? ''}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
        <Box sx={{
            display: 'flex', alignItems: 'center',
            width: '100%', justifyContent: 'flex-end',
            mt: 2
        }}>
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" color={"primary"}/>
            </Stack>
        </Box>
    </Box>
    )
}
export default Product;