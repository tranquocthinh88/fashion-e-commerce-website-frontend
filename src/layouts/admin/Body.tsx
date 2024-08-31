import { Box } from "@mui/material";
import { bodyAdminColor, dailyVisitGradient, newOrderGradient, saleGradient, newUserGradient } from "../../theme";
import dailyVisit from '../../assets/dailyvisit.png';
import newOrder from '../../assets/neworder.png';
import newUser from '../../assets/newuser.png';
import sale from '../../assets/sales.png';
import saleDiagram from '../../assets/sale_diagram.png';
import '../admin/Body.scss'

const Body = () => {
    return <Box sx={{ background: bodyAdminColor, pt: 1, pb: 2 }}>
        <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Dashboard !</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 3 }}>
            <Box sx={{
                background: dailyVisitGradient, width: 300, height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>200</Box>
                    <Box sx={{ fontSize: 30, fontWeight: '20px', }}>Daily Visits</Box>
                </Box>
                <img src={dailyVisit} alt="Daily" className="daily-item" />
            </Box>
            <Box sx={{
                background: saleGradient, width: 300, height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>11536</Box>
                    <Box sx={{ fontSize: 30, fontWeight: '20px', }}>Sales</Box>
                </Box>
                <img src={sale} alt="Sales" className="sales-item" />
            </Box>
            <Box sx={{
                background: newOrderGradient, width: 300, height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>5238</Box>
                    <Box sx={{ fontSize: 30, fontWeight: '20px', }}>New Order</Box>
                </Box>
                <img src={newOrder} alt="New Order" className="new-order-item" />
            </Box>
            <Box sx={{
                background: newUserGradient, width: 300, height: 150, display: 'flex', transition: "transform 0.5s ease-in-out",
                '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Box sx={{ marginTop: 3.5, marginLeft: 2 }}>
                    <Box sx={{ fontSize: 35, fontWeight: 'bold' }}>200</Box>
                    <Box sx={{ fontSize: 30, fontWeight: '20px', }}>Daily Visits</Box>
                </Box>
                <img src={newUser} alt="New User" className="new-user-item" />
            </Box>
        </Box>
        <Box sx={{ justifyContent: 'center', display: 'flex', marginTop: 5 }}>
            <img src={saleDiagram} alt="Sale Diagram" className="sale-diagram" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', marginLeft: 55 }}>2021</Box>
            <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>2022</Box>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', marginRight: 50 }}>2023</Box>
        </Box>
    </Box>
}
export default Body;