import { Box, Container, Typography } from "@mui/material";

const Introduce = () => {
    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Giới thiệu về Shop Thời Trang
                </Typography>
                <Typography variant="body1" paragraph>
                    Chào mừng bạn đến với shop thời trang của chúng tôi! Chúng tôi là địa chỉ tin cậy để bạn có thể tìm kiếm những trang phục thời trang phù hợp với phong cách cá nhân. Tại đây, chúng tôi không chỉ cung cấp những sản phẩm chất lượng mà còn mang đến sự tự tin và phong cách cho bạn.
                </Typography>
                <Typography variant="body1" paragraph>
                    Chúng tôi tự hào về bộ sưu tập độc đáo và đầy đủ các loại trang phục từ trang phục hàng ngày, đến trang phục dự tiệc và trang phục công sở. Bất kỳ bạn đang tìm kiếm phong cách năng động, quyến rũ hay thanh lịch, chúng tôi luôn có những gợi phép phù hợp.
                </Typography>
                <Typography variant="body1" paragraph>
                    Chất lượng sản phẩm và sự hài lòng của khách hàng là mục tiêu hàng đầu của chúng tôi. Với đội ngũ nhân viên nhiệt tình và sẵn sàng hỗ trợ, chúng tôi mong muốn mỗi khách hàng đến với shop đều có một trải nghiệm mua sắm thú vị và dễ chịu.
                </Typography>
                <Typography variant="body1" paragraph>
                    Với phương châm hoạt động “Tất cả vì Khách Hàng”, chúng tôi luôn không ngừng nỗ lực nâng cao chất lượng dịch vụ và sản phẩm, từ đó mang đến trải nghiệm mua sắm trọn vẹn cho Khách Hàng Việt Nam, cùng cam kết cung cấp hàng chính hãng với chính sách hoàn tiền 100% nếu phát hiện hàng giả, hàng nhái.
                </Typography>
                <Typography variant="body1" paragraph>
                    <a href="/polices">Chính sách của cửa hàng</a>
                </Typography>
                <Typography variant="body1" paragraph>
                    Hãy đến và cùng chúng tôi khám phá thời trang, thể hiện cá tính và phong cách của bạn một cách tự tin nhất!
                </Typography>
                <Typography variant="body1" paragraph>
                    <a href="/register">Đăng ký ngay</a>
                </Typography>

                <Typography variant="h5" gutterBottom mt={4}>
                    Thông tin về cửa hàng
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{
                        '& strong': {
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                            color: '#ff5722',
                        },
                        '& span': {
                            fontSize: '1.5em',
                            color: '#ff5722',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        }
                    }}
                >
                    <strong>Tên shop:</strong> <span>Total Trendsetter</span>
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Địa chỉ:</strong> 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TPHCM
                </Typography>
                <Typography variant="body1" paragraph>
                    Quý khách có nhu cầu liên lạc, trao đổi hoặc đóng góp ý kiến, vui lòng tham khảo các thông tin sau:
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Liên lạc qua điện thoại:</strong> 1900 6750
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Liên lạc qua Email:</strong> tranthinh88zz@gmail.com  <strong>hoặc</strong>  trungthinh2k2@gmail.com
                </Typography>
            </Box>
        </Container>
    );
}
export default Introduce;