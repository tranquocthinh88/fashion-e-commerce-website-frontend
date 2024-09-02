import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { primaryGradient } from "../../../theme";
import Slide from "../../../components/Slide";
import ProductCard from "../../../components/user/product/ProductCard";


const productSales = [
    {
        product: {
            id: 1,
            name: 'Product A',
            price: 100,
        },
        quantitySold: 50,
    },
    {
        product: {
            id: 2,
            name: 'Product B',
            price: 150,
        },
        quantitySold: 30,
    },
    {
        product: {
            id: 3,
            name: 'Product C',
            price: 200,
        },
        quantitySold: 20,
    },
    {
        product: {
            id: 4,
            name: 'Product D',
            price: 250,
        },
        quantitySold: 60,
    },
    {
        product: {
            id: 5,
            name: 'Product E',
            price: 300,
        },
        quantitySold: 40,
    },
];



const Home = () => {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Slide />
            <Box sx={{
                width: "100%",
                background: "white",
                pt: 2,
                pb: 2,
            }}>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm khuyến mãi</Typography>

                    <Container>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                            {productSales.map((product) => (
                                <Box key={product.product.id}>
                                    <ProductCard product={product.product} quantitySold={product.quantitySold} />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                            <Button sx={{
                                width: '200px',
                                margin: 2,
                                ':hover': {
                                    background: primaryGradient,
                                    color: 'white',
                                }
                            }}>Xem thêm</Button>
                        </Box>
                    </Container>
                </Box>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm bán chạy</Typography>
                    <Container>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                            {productSales.map((product) => (
                                <Box key={product.product.id}>
                                    <ProductCard product={product.product} quantitySold={product.quantitySold} />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                            <Button sx={{
                                width: '200px',
                                margin: 2,
                                ':hover': {
                                    background: primaryGradient,
                                    color: 'white',
                                }
                            }}>Xem thêm</Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box >
    );
}
export default Home;