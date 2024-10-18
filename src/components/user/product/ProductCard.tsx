import { Box, Button, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DiaLogAddToCart from "../dialogs/DialogAddToCart";
import { useState } from "react";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";

type Props = {
    product: ProductUserResponse;
}

const ProductCard = ({ product }: Props) => {

    const [openDialogAddToCart, setOpenDialogAddToCart] = useState(false);

    const handleCloseDialogAddToCart = () => {
        setOpenDialogAddToCart(false);
    }

    return (
        <Card sx={{
            maxWidth: 220,
            border: '2px solid #fafafa',
            transition: 'border-color 0.2s ease-in-out',
            position: 'relative',
            ':hover': {
                borderColor: 'red',
                cursor: 'pointer'
            }
        }}
            onClick={() => {
                if (!openDialogAddToCart) {
                    window.location.href = `/products/${product.product.id}`;
                }
            }}
        >
            {product.priceFinal != product.product.price  &&
                <Box sx={{
                    position: 'absolute',
                    top: 0, p: 1,
                    borderRadius: '0px 0px 5px 0px',
                    background: 'red',
                }}> <Typography sx={{
                    color: '#fff',
                    fontSize: '10px'
                }}>Sale off {product.discount}%</Typography></Box>}
            <CardMedia
                sx={{ height: 220, resizeMode: 'contain' }}
                image={product?.product?.thumbnail ?? ''}
                component="img"
            />
            <CardContent sx={{ background: "white" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 12 }}>Đã bán: {product.product?.buyQuantity}</Typography>
                    <Rating sx={{ pb: "3px" }} size="small" name="rating-read" value={5} readOnly />
                </Box>
                <Typography gutterBottom
                    sx={{
                        fontWeight: '500',
                        minHeight: '42px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        fontSize: 14
                    }}
                >
                    {product.product?.productName}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center" }}>
                    <Typography gutterBottom
                        sx={{ color: 'red', fontSize: 14 }}>
                        {product.priceFinal}đ
                    </Typography>
                    {product.priceFinal != product.product.price &&
                        <Typography gutterBottom
                            sx={{ color: 'gray', textDecoration: 'line-through', pl: 1, fontSize: 16 }}>
                            {product.product?.price}đ
                        </Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'center' }}>
                    <Button sx={{
                        ':hover': {
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            color: 'white',
                        },
                    }}
                        onMouseDown={(e) => {
                            e.stopPropagation();  // Ngăn sự kiện MouseDown bọt lên thẻ Card
                            setOpenDialogAddToCart(true);
                        }}
                    >Thêm vào giỏ<AddShoppingCartIcon sx={{ ml: 1 }} /></Button>
                    {openDialogAddToCart &&
                        <DiaLogAddToCart
                            open={openDialogAddToCart}
                            handleClose={handleCloseDialogAddToCart}
                            product={product}
                        />}
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard;