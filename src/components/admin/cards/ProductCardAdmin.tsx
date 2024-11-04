import { Card, CardActions, CardContent, CardMedia, Fab, Tooltip, Typography, useMediaQuery } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    productId: string,
    productName: string,
    productPrice: number,
    fNavigate: (id: string) => void;
    thumbnail: string;
    totalQuantity?: number;
}

const ProductCardAdmin = ({ productId, productName, productPrice, fNavigate, thumbnail, totalQuantity }: Props) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const formattedPrice = `${productPrice.toLocaleString('vi-VN')}đ`;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height={isMobile ? '150px' : '200px'}
                image={thumbnail}
                alt="green iguana"
            />
            <CardContent>
                <Typography sx={{ fontSize: '13px' }}>
                    Tổng số sản phẩm {totalQuantity}
                </Typography>
                <Tooltip title={productName} arrow>
                    <Typography gutterBottom component="div"
                        sx={{
                            fontSize: '16px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: '48px',
                        }}
                    >
                        {productName}
                    </Typography>
                </Tooltip>
                <Typography color="text.secondary">
                    {formattedPrice}
                </Typography>
            </CardContent>
            <CardActions sx={{
                justifyContent: 'flex-end',
            }}>
                <Fab onClick={() => fNavigate(productId)} variant="extended" color={"success"} size="small" sx={{ fontSize: 10 }}>
                    <EditIcon sx={{
                        fontSize: 10,
                    }} />
                    Edit
                </Fab>
                <Fab variant="extended" size="small" color={"error"} sx={{ fontSize: 10 }}>
                    <DeleteIcon sx={{
                        fontSize: 10,
                    }} />
                    Delete
                </Fab>
            </CardActions>
        </Card>
    )
}
export default ProductCardAdmin;