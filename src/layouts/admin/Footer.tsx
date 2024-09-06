import { Box } from '@mui/material';
import { footerAdminColor } from '../../theme';
const Footer = () => {
    return <Box sx={{ backgroundColor: footerAdminColor }}>
        <Box sx={{ display: 'flex', pt: 2, pb: 2, justifyContent: 'space-around' }}>
            <Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>Admin: Trần Quốc Thịnh</Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>Admin: Trần Lâm Trung Thịnh</Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>IUH-Trường đại học Công Nghiệp TPHCM</Box>
            </Box>
            <Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>MSSV: 20067241</Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>MSSV: 20108151</Box>
            </Box>
            <Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>Email: tranthinh88zz@gmail.com</Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>Email: trungthinh2k2@gmail.com</Box>
                <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>Địa chỉ: 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TPHCM</Box>
            </Box>
        </Box>
    </Box>;

}
export default Footer;