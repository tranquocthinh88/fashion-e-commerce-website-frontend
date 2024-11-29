import { Box, Container, Typography } from "@mui/material";

const Police = () => {
    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Chính sách của Total Trendsetter
                </Typography>
                <Typography variant="h6" paragraph>
                    Chính sách mua hàng
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chính sách đổi trả:</strong> Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên tem, nhãn mác và chưa qua sử dụng.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chính sách giao hàng:</strong> Chúng tôi cung cấp dịch vụ giao hàng toàn quốc. Thời gian giao hàng từ 3-5 ngày làm việc đối với khu vực nội thành và từ 5-7 ngày đối với các khu vực khác.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chính sách bảo mật:</strong> Mọi thông tin cá nhân của khách hàng sẽ được bảo mật tuyệt đối và chỉ sử dụng cho mục đích xử lý đơn hàng.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Hỗ trợ khách hàng:</strong> Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn từ 9h00 đến 18h00 hàng ngày. Bạn có thể liên hệ với chúng tôi qua hotline hoặc email để được giải đáp mọi thắc mắc.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chính sách bảo hành:</strong> Chúng tôi cung cấp chính sách bảo hành cho các sản phẩm bị lỗi do nhà sản xuất trong vòng 30 ngày kể từ ngày mua hàng.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chính sách tích điểm:</strong> Mỗi lần mua sắm, bạn sẽ được tích điểm vào tài khoản khách hàng. Điểm tích lũy có thể sử dụng để giảm giá cho các lần mua sắm sau.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chính sách ưu đãi thành viên:</strong> Khách hàng thành viên sẽ được hưởng các ưu đãi đặc biệt và nhận thông tin khuyến mãi sớm nhất.
                </Typography>
                <Typography variant="body1" paragraph>
                    Hãy đến với cửa hàng của chúng tôi để có được nhưng sản phẩm chất lượng và nhận được nhiều ưu đãi bất ngờ nhé!
                </Typography>
                <Typography variant="body1" paragraph>
                    <a href="/register">Đăng ký ngay</a>
                </Typography>
                <Typography variant="h6" paragraph>
                    Điều khoản cấm
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Điều khoản cấm:</strong> Khách hàng không được phép sử dụng sản phẩm cho các mục đích trái pháp luật, lừa đảo hoặc gây hại cho người khác. Bất kỳ hành vi vi phạm nào đều có thể dẫn đến việc tài khoản của khách hàng bị khóa và các biện pháp xử lý pháp lý.
                </Typography>
            </Box>
        </Container>
    );
}
export default Police;