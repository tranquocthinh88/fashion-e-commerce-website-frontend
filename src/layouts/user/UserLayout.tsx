import { Box, Typography } from "@mui/material"
import Footer from "../admin/Footer"
import { ReactNode } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

type UserLayoutProps = {
    children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
    const location = useLocation();
    return (
        <Box>
            <Header></Header>
            <Typography> {"Trang chủ" + location.pathname}</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Box sx={{ flexGrow: 1, padding: 2 }}>{children}</Box>
                <Box sx={{ width: "100%"}}>
                    <Footer />
                </Box>
            </Box>
        </Box>
    )
}

export default UserLayout;