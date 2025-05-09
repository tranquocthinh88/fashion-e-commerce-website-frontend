import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductsDiscount } from "../../../services/product.service";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import ProductCard from "../../../components/user/product/ProductCard";
import { CategoryModel } from "../../../models/category.model";
import { getAllCategories } from "../../../services/category.service";

const Promotion = () => {

    const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);
    const [displayedCount, setDisplayedCount] = useState(10);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const handleShowMore = () => {
        setDisplayedCount((prevCount) => prevCount + 10);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getProductsDiscount(1, 50, [], [])
                setProductSales(response.data.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            try {
                let search = [];
                if (selectedCategory) {
                    search.push({ field: "category.categoryName", operator: ":", value: selectedCategory });
                }
                const response = await getProductsDiscount(1, 50, search, []);
                setProductSales(response.data.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [selectedCategory]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
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
                    <Box sx={{ display: isMobile ? 'block' : 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6" sx={{
                                color: 'red', p: 1,
                                transition: 'opacity 0.5s ease-in-out',
                            }}
                        >Sản phẩm khuyến mãi</Typography>
                        <FormControl sx={{ my: 2, width: isMobile ? '50%' : '20%' }}>
                            <InputLabel id="category-label">Danh mục</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-select"
                                value={selectedCategory}
                                label="Danh mục"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Tất cả</em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.categoryName}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

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
                {/* <Box sx={{
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
                </Box> */}
            </Box>
        </>
    )
}
export default Promotion;