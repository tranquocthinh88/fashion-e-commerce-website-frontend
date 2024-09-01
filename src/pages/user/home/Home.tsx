import { Box, Button, Container, Rating, Typography } from "@mui/material";
import Slide from "../../../component/Slide";
import ProductCard from "../../../component/user/product/ProductCard";

const Home = () => {
    return (
        <Box>
            <Slide />
            <Box sx={{
                width: "100%",
                height: 500,
                background: "white",
                pt: 2,
                pb: 2,
            }}>
                <Typography>Sản phẩm khuyến mãi</Typography>
                <Container>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    </Box>
                    
                </Container>
    </Box>
        </Box >
    );
}
export default Home;