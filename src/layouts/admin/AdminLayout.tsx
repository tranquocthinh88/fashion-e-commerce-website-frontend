import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
    children?: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const handleOpenNavbar = () => {
        setIsOpenNavbar(!isOpenNavbar);
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: "flex" }}>
                <Navbar isOpenNavbar={isOpenNavbar}></Navbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, borderLeft: '1px solid #e4e4e4', }}>
                    <Header handleOpenNavbar={handleOpenNavbar}></Header>
                    <Box sx={{ flex: 1 }}>{children}</Box>
                </Box>
            </Box>
            <Footer></Footer>
        </Box>
    );
}
export default AdminLayout;