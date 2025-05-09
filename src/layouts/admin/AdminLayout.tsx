import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
    children?: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    const [isOpenNavbar, setIsOpenNavbar] = useState(true);
    const handleOpenNavbar = () => {
        setIsOpenNavbar(!isOpenNavbar);
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' }}>
                    <Navbar isOpenNavbar={isOpenNavbar}></Navbar>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, borderLeft: '1px solid #e4e4e4', }}>
                    <Box sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <Header handleOpenNavbar={handleOpenNavbar}></Header>
                    </Box>

                    <Box sx={{ flex: 1 }}>{children}</Box>
                    <Footer></Footer>
                </Box>
            </Box>
            {/* <Footer></Footer> */}
        </Box>
    );
}
export default AdminLayout;