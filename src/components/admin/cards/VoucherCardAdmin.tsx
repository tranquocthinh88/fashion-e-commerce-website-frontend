import { Card, CardContent, CardMedia, Tooltip, Typography, useMediaQuery } from "@mui/material";

const VoucherCardAdmin = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <>
            <Card sx={{maxWidth: 345}}>
                <CardMedia
                    component="img"
                    height={isMobile ? '150px' : '200px'}
                    // image={thumbnail}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography sx={{ fontSize: '13px' }}>
                        Tổng số Voucher
                    </Typography>
                    <Tooltip title= '' arrow>
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
                            Tên voucher
                        </Typography>
                    </Tooltip>
                    <Typography variant="body2" color="text.secondary">
                        Giá nhập: 
                    </Typography>
                    {/* <Box sx={{ display: 'flex', gap: "25px" }}>
                        {
                            productPrice == productPriceFinal ?
                                <>
                                    <Typography variant="body1" sx={{ color: 'red', fontWeight: '700', }}>{formattedPrice}</Typography>
                                </>
                                : <>
                                    <Typography variant="body1" sx={{ color: 'red', fontWeight: '700', }}>{productPriceFinal.toLocaleString('vi-VN')}đ</Typography>
                                    <Typography variant="body1"
                                        sx={{ color: 'gray', fontWeight: '400', textDecoration: 'line-through' }}>
                                        {formattedPrice}
                                    </Typography>
                                </>
                        }
                    </Box> */}
                </CardContent>
            </Card >
        </>
    )
}
export default VoucherCardAdmin;