import { Box, Typography, Link, useMediaQuery } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const FooterUser = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-around',
                    textAlign: isMobile ? 'center' : 'left'
                }}
            >
                <Box>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        color="red"
                        gutterBottom
                        style={{
                            fontFamily: 'cursive',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        Total Trendsetter
                    </Typography>

                    <Typography variant={isMobile ? "body1" : "h6"}>
                        Cửa hàng thời trang uy tín hàng đầu Việt Nam
                    </Typography>
                </Box>
                <Box>
                    <Typography variant={isMobile ? "body1" : "h6"} color="textPrimary" gutterBottom>
                        Bạn cần hỗ trợ
                    </Typography>
                    <Typography variant="body2">
                        1900 6750
                    </Typography>
                    <Typography variant="body2">
                        Địa chỉ: 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TPHCM
                    </Typography>
                    <Typography variant="body2">
                        Email: tranthinh88zz@gmail.com
                    </Typography>
                    <Typography variant="body2">
                        Email: trungthinh2k2@gmail.com
                    </Typography>
                    <FacebookOutlinedIcon sx={{ color: '#1976D2', fontSize: isMobile ? 'medium' : 'large' }} />
                    <GoogleIcon sx={{ color: '#DB4437', fontSize: isMobile ? 'medium' : 'large' }} />
                </Box>
                <Box>
                    <Typography variant={isMobile ? "body1" : "h6"} color="textPrimary" gutterBottom>
                        Hướng dẫn mua hàng
                    </Typography>
                    <Link href="/home" color="inherit" variant="body2" display="block">
                        Trang chủ
                    </Link>
                    <Link href="/introduces" color="inherit" variant="body2" display="block">
                        Giới thiệu
                    </Link>
                    <Link href="/products" color="inherit" variant="body2" display="block">
                        Danh mục sản phẩm
                    </Link>
                    <Link href="/introduces" color="inherit" variant="body2" display="block">
                        Liên hệ
                    </Link>
                    <Link href="/instructs" color="inherit" variant="body2" display="block">
                        Hướng dẫn mua hàng
                    </Link>
                    <Link href="/polices" color="inherit" variant="body2" display="block">
                        Chính sách của cửa hàng
                    </Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: isMobile ? '20px' : '10px' }}>
                <Typography variant="body2">
                    © Bản quyền thuộc về Total Trendsetter
                </Typography>
            </Box>
        </Box>
    );
};
export default FooterUser;