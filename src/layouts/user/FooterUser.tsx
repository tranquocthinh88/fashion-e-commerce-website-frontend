import { Box, Typography, Link } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const FooterUser = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Box >
                    <Typography
                        variant="h4"
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

                    <Typography variant="h6">
                        Cửa hàng thời trang uy tín hàng đầu Việt Nam
                    </Typography>
                </Box>
                <Box >
                    <Typography variant="h6" color="textPrimary" gutterBottom>
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
                    <FacebookOutlinedIcon sx={{ color: '#1976D2' }} fontSize="large"/>
                    <GoogleIcon sx={{ color: '#DB4437'}} fontSize="large"/>
                </Box>
                <Box >
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Hướng dẫn mua hàng
                    </Typography>
                    <Link href="#" color="inherit" variant="body2" display="block">
                        Trang chủ
                    </Link>
                    <Link href="#" color="inherit" variant="body2" display="block">
                        Giới thiệu
                    </Link>
                    <Link href="#" color="inherit" variant="body2" display="block">
                        Danh mục
                    </Link>
                    <Link href="#" color="inherit" variant="body2" display="block">
                        Tin tức
                    </Link>
                    <Link href="#" color="inherit" variant="body2" display="block">
                        Liên hệ
                    </Link>
                    <Link href="#" color="inherit" variant="body2" display="block">
                        Hướng dẫn sử dụng
                    </Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2">
                    © Bản quyền thuộc về Total Trendsetter
                </Typography>
            </Box>
        </Box>
    );
};
export default FooterUser;