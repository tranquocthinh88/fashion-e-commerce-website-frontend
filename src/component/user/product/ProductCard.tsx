import { Box, Button, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = () => {
    return (
        <Card sx={{
            maxWidth: 250,
            border: '2px solid #fafafa',
            transition: 'border-color 0.2s ease-in-out',
            position: 'relative',
            ':hover': {
                borderColor: 'red',
                cursor: 'pointer'
            }
        }}>
            <CardMedia
                component="img"
                alt="product"
                sx={{ height: 220, resizeMode: 'contain' }}
                image="https://zeanus.vn/upload/product/zn-0009/ao-khoac-gio-nam-den-day-dan-atd-208.jpg"
            />
            <CardContent sx={{ background: "white" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 12 }}>Đã bán: 50</Typography>
                    <Rating sx={{ pb: "3px" }} size="small" name="rating-read" value={5} readOnly />
                </Box>
                <Typography gutterBottom
                    sx={{
                        fontWeight: '500',
                        minHeight: '32px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        fontSize: 14
                    }}
                >
                    Áo Khoác Gió Nam 3C 2 Lớp Thể Thao Phối Lưng Năng động, Phong cách
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center" }}>
                    <Typography gutterBottom
                        sx={{ color: 'red', fontSize: 14 }}>
                        149000đ
                    </Typography>
                    <Typography gutterBottom
                        sx={{ color: 'gray', textDecoration: 'line-through', pl: 1, fontSize: 16 }}>
                        199000đ
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Button sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        ':hover': {
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            color: 'white',
                        },
                    }}>Thêm vào giỏ<AddShoppingCartIcon sx={{ ml: 1 }} /></Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard;