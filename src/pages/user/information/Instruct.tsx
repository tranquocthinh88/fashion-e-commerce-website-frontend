import { Box, Container, Typography } from "@mui/material";

const Instruct = () => {
    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Hướng dẫn mua hàng
                </Typography>
                <Typography variant="h6" paragraph>
                    Để có thể đặt hàng trên website của chúng tôi, bạn cần thực hiện các bước sau:
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Bước 1:</strong> Bạn chọn sản phẩm mà bạn muốn mua bằng cách nhấn vào nút "Thêm vào giỏ hàng" trên sau mỗi sản phẩm, chọn kích thước, màu sắc và số lượng bạn mong muốn.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Bước 2:</strong> Sau khi chọn xong sản phẩm, bạn nhấn vào biểu tượng giỏ hàng ở góc trên bên phải.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Bước 3:</strong> Sau khi đã kiểm tra kỹ thông tin sản phẩm, bạn nhấn vào nút "Thanh toán" để tiến hành thanh toán.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Bước 4:</strong> Bạn cần nhập địa chỉ nhận hàng, chọn phương thức vận chuyển, chọn phương thức thanh toán (áp dụng mã giảm giá nếu có) và hoàn tất đơn hàng.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Bước 5:</strong> Sau khi hoàn tất đơn hàng, bạn sẽ chuyển đến giao diện "Danh sách đơn hàng" mà bạn đã đặt. Bạn sẽ có 2 nút:
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Chi tiết:</strong> Khi chọn nút này, bạn sẽ xem được thông tin chi tiết về đơn hàng của mình. Bao gồm: ngày đặt hàng, địa chỉ nhận hàng, phương thức thanh toán, ngày nhận hàng dự kiến, trạng thái đơn hàng, phí vận chuyển, tổng tiền thanh toán.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>- Hủy đơn:</strong> Nếu có gì sai sót hoặc chưa đúng ý bạn, bạn có thể hủy đơn hàng bằng cách chọn nút này.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Lưu ý:</strong> Bạn chỉ có thể hủy đơn hàng trong vòng 1 tiếng kể từ khi đặt hoặc chưa được shop xác nhận. Sau khi shop xác nhận thì bạn sẽ không thể hủy được nữa.
                </Typography>
                <Typography variant="body1" paragraph>
                    Hãy đến với cửa hàng của chúng tôi để có được những trải nghiệm tuyệt vời nhé ! <a href="/home">Trang chủ</a>
                </Typography>
                <Typography variant="body1" paragraph>
                    Nếu có thắc mắc xin hãy liên hệ ngay với chúng tôi hoặc có thể nhắn tin trực tiếp để được tư vấn ! <a href="/introduces">Liên hệ</a>
                </Typography>
            </Box>
        </Container>
    )
}
export default Instruct;