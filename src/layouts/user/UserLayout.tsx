import { Box, Typography } from "@mui/material"
import Footer from "../admin/Footer"
import { ReactNode } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

type UserLayoutProps = {
    children: ReactNode;
}

const UserLayout = ({ children}: UserLayoutProps) => {
    const location = useLocation();
    return (
        <Box>
            <Header></Header>
            <Typography> {"Trang chủ" + location.pathname}</Typography>
            <Box sx={{ padding: 2 }}>{children}</Box>
            <Footer></Footer>
        </Box>
    )
}

export default UserLayout;