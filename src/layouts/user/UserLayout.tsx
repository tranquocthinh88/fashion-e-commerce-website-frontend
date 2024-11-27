import { Box } from "@mui/material"
import { ReactNode } from "react";
import Header from "./Header";
import FooterUser from "./FooterUser";

type UserLayoutProps = {
    children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 150,
                    zIndex: 1000,
                    backgroundColor: "white", // Đảm bảo nền không bị trong suốt
                }}
            >
                <Header />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingTop: '150px' }}>
                <Box sx={{ flexGrow: 1, paddingTop: '150px', paddingBottom: '150px', padding: 2 }}>
                    {children}
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: "#f0f0f0",
                        zIndex: 1500,
                        position: 'relative',
                    }}
                >
                    <FooterUser/>
                </Box>
            </Box>
        </Box>
    )
}

export default UserLayout;