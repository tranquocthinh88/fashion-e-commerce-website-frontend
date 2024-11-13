import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Switch, Tooltip, Typography, useMediaQuery } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { updateProductStatus } from "../../../services/product.service";

type Props = {
    productId: string,
    productName: string,
    productPrice: number,
    fNavigate: (id: string) => void;
    thumbnail: string;
    totalQuantity?: number;
    status?: string;
}

const ProductCardAdmin = ({ productId, productName, productPrice, fNavigate, thumbnail, totalQuantity, status }: Props) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [productStatus, setProductStatus] = useState<string | undefined>(status ? 'ACTIVE' : 'INACTIVE'); // Thêm state để lưu trạng thái sản phẩm

    const formattedPrice = `${productPrice.toLocaleString('vi-VN')}đ`;

    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await updateProductStatus(productId); // Gọi API để cập nhật trạng thái sản phẩm
            // setProductStatus('INACTIVE'); // Cập nhật state để thay đổi giao diện
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Failed to update product status', error);
        }
    };

    return (
        <>
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
                    <Fab variant="extended" size="small" color={"error"} sx={{ fontSize: 10 }} onClick={handleDeleteClick}>
                        <DeleteIcon sx={{
                            fontSize: 10,
                        }} />
                        Delete
                    </Fab>
                </CardActions>
            </Card>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận ngưng hoạt động</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn ngưng hoạt động sản phẩm này?</Typography>
                    <Typography variant="body2" color="text.secondary">Bật công tắc để xác nhận.</Typography>
                    <Switch
                        checked={isSwitchChecked}
                        onChange={(e) => setIsSwitchChecked(e.target.checked)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" disabled={!isSwitchChecked}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ProductCardAdmin;