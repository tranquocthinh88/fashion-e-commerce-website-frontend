import { Box } from "@mui/material";
import { bodyAdminColor, newOrderGradient, saleGradient, newUserGradient } from "../../theme";
import newOrder from '../../assets/neworder.png';
import newUser from '../../assets/newuser.png';
import sale from '../../assets/sales.png';
import '../admin/Body.scss'
import ColumnChartCustom from "../../components/admin/chart/ColumnChartCustom";
import CircleChartCustom from "../../components/admin/chart/CircleChartCustom";

const Body = () => {
    return <Box sx={{ background: bodyAdminColor, pt: 1, pb: 2, pl: 1, height: '100%', width: '100%' }}>
        <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Trang chủ !</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 3 }}>
            <Box sx={{
                background: saleGradient, width: "25%", height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>11536</Box>
                    <Box sx={{ fontSize: 20, fontWeight: '20px', }}>Doanh thu hôm nay</Box>
                </Box>
                <img src={sale} alt="Sales" className="sales-item" />
            </Box>
            <Box sx={{
                background: newOrderGradient, width: "25%", height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>5238</Box>
                    <Box sx={{ fontSize: 20, fontWeight: '20px', }}>Hóa đơn hôm nay</Box>
                </Box>
                <img src={newOrder} alt="New Order" className="new-order-item" />
            </Box>
            <Box sx={{
                background: newUserGradient, width: "25%", height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>4023</Box>
                    <Box sx={{ fontSize: 20, fontWeight: '20px', }}>Người mua hôm nay</Box>
                </Box>
                <img src={newUser} alt="New User" className="new-user-item" />
            </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '80%' }}>
                <ColumnChartCustom />
            </Box>
            <Box sx={{ width: '40%' }}>
                <CircleChartCustom />
            </Box>
        </Box>
    </Box>
}
export default Body;