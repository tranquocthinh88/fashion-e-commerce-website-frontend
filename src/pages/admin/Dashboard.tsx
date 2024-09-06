import Header from "../../layouts/admin/Header";
import Body from '../../layouts/admin/Body';
import Footer from '../../layouts/admin/Footer';
import Navbar from "../../layouts/admin/Navbar";
import { Box } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const handleOpenNavbar = () => {
        setIsOpenNavbar(!isOpenNavbar);
    }
    return <Box sx={{ display: 'flex' }}>
        <Navbar isOpenNavbar={isOpenNavbar}></Navbar>
        <Box sx={{flex: 1}}>
            <Header handleOpenNavbar={handleOpenNavbar}></Header>
            <Body></Body>
            <Footer></Footer>
        </Box>
    </Box>
}
export default Dashboard;