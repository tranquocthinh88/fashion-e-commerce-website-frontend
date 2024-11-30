import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductsDiscount } from "../../../services/product.service";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import ProductCard from "../../../components/user/product/ProductCard";

const Promotion = () => {

    const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);
    const [displayedCount, setDisplayedCount] = useState(5);

    const handleShowMore = () => {
        setDisplayedCount((prevCount) => prevCount + 5);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getProductsDiscount(1, 40, [], [])
                setProductSales(response.data.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    return (
        <>
            <Box sx={{
                width: "100%",
                background: "white",
                pt: 2,
                pb: 2,
            }}>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                    mb: 2
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm khuyến mãi</Typography>
                    <Container>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        }}>
                            {productSales.slice(0, displayedCount).map((productSale: ProductUserResponse) => (
                                <Box key={productSale.product.id}
                                    sx={{ width: '100%', maxWidth: '250px', flex: '1 1 calc(20% - 20px)', pb: '10px' }}
                                >
                                    <ProductCard product={productSale} />
                                </Box>
                            ))}
                        </Box>
                        {displayedCount < productSales.length && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ textTransform: 'none' }}
                                    onClick={handleShowMore}
                                >
                                    Xem thêm
                                </Button>
                            </Box>
                        )}
                    </Container>
                </Box>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm khuyến mãi</Typography>
                    <Container>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        }}>
                            {productSales.slice(0, displayedCount).map((productSale: ProductUserResponse) => (
                                <Box key={productSale.product.id}
                                    sx={{ width: '100%', maxWidth: '250px', flex: '1 1 calc(20% - 20px)', pb: '10px' }}
                                >
                                    <ProductCard product={productSale} />
                                </Box>
                            ))}
                        </Box>
                        {displayedCount < productSales.length && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ textTransform: 'none' }}
                                    onClick={handleShowMore}
                                >
                                    Xem thêm
                                </Button>
                            </Box>
                        )}
                    </Container>
                </Box>
            </Box>
        </>
    )
}
export default Promotion;