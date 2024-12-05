import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import { getProductsForUser } from "../../../services/product.service";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { PageResponse } from "../../../dtos/responses/page.response";
import ProductCard from "../../../components/user/product/ProductCard";
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import { CategoryModel } from "../../../models/category.model";
import { getAllCategories } from "../../../services/category.service";
import { BrandModel } from "../../../models/brand.model";
import { getAllBrands } from "../../../services/brand.service";

const Products = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [products, setProducts] = useState<ProductUserResponse[]>();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageNo, setPageNo] = useState<number>(1)
    const [sort, setSort] = useState<string>("");
    const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
    const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [brand, setBrand] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchCategoriesAndBrands = async () => {
            try {
                const responseCategories: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(responseCategories.data);
                const responseBrands: ResponseSuccess<BrandModel[]> = await getAllBrands();
                setBrands(responseBrands.data);
            } catch (error) {
                console.log("Error fetching categories or brands: ", error);
            }
        };

        fetchCategoriesAndBrands();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const searchParams = [];
                if (priceMin !== undefined) searchParams.push({ field: 'price', operator: '>=', value: String(priceMin) });
                if (priceMax !== undefined) searchParams.push({ field: 'price', operator: '<=', value: String(priceMax) });

                if (category) searchParams.push({ field: 'category.categoryName', operator: ':', value: category });
                if (brand) searchParams.push({ field: 'brand.brandName', operator: ':', value: brand });

                console.log("Search params: ", searchParams);

                const responseProducts: ResponseSuccess<PageResponse<ProductUserResponse[]>> =
                    await getProductsForUser(pageNo, 20, searchParams, sort ? [{ field: sort.split(':')[0], order: sort.split(':')[1] }] : []);
                console.log("Products: ", responseProducts.data.data);

                setProducts(responseProducts.data.data);
                setTotalPage(responseProducts.data.totalPage);
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchProducts();
    }, [pageNo, priceMin, priceMax, category, brand, sort]);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNo(value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (value === "") {
            if (name === "priceMin") setPriceMin(undefined);
            if (name === "priceMax") setPriceMax(undefined);
        } else {
            if (name === "priceMin") setPriceMin(Number(value));
            if (name === "priceMax") setPriceMax(Number(value));
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    width: '100%',
                    minHeight: '100vh',
                }}
            >
                {/* Bộ lọc */}
                <Box
                    sx={{
                        width: isMobile ? '100%' : '32%',
                        position: isMobile ? 'relative' : 'fixed',
                        top: isMobile ? 0 : 150,
                        left: 0,
                        padding: 2,
                        zIndex: 1,
                        height: isMobile ? 'auto' : `calc(100vh - 150px)`,
                        paddingBottom: isMobile ? 0 : '150px',
                        overflowY: isMobile ? 'visible' : 'auto',
                        mt: isMobile ? 0 : 4
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Bộ lọc</Typography>
                    <Grid item xs={12}>
                        <Typography variant="h6">Danh mục sản phẩm</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Danh mục sản phẩm</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-select"
                                value={category || ""}
                                label="Danh mục sản phẩm"
                                onChange={(e) => setCategory(e.target.value as string)}
                            >
                                <MenuItem key="all" value="">Tất cả</MenuItem>
                                {categories?.map((category: CategoryModel) => (
                                    <MenuItem key={category.id} value={category.categoryName}>{category.categoryName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2 }}>Thương hiệu</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="brand-label">Thương hiệu</InputLabel>
                            <Select
                                labelId="brand-label"
                                id="brand-select"
                                value={brand}
                                label="Thương hiệu"
                                onChange={e => setBrand(e.target.value as string)}
                            >
                                <MenuItem key="all" value="">Tất cả</MenuItem>
                                {brands.map((brand: BrandModel) => (
                                    <MenuItem key={brand.id} value={brand.brandName}>{brand.brandName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Khoảng giá
                        </Typography>

                        <FormControl style={{ width: "50%", marginRight: 3 }}>
                            Từ <Input name="priceMin" type="number" placeholder="Nhập giá sản phẩm" onChange={handlePriceChange} />
                        </FormControl>

                        <FormControl style={{ width: "50%" }}>
                            Đến <Input name="priceMax" type="number" placeholder="Nhập giá sản phẩm" onChange={handlePriceChange} />
                        </FormControl>
                    </Grid>
                </Box>
                {/* Sản phẩm */}
                <Box
                    sx={{
                        marginLeft: isMobile ? 0 : '32%',
                        width: isMobile ? '100%' : '68%',
                        padding: 2,
                        position: 'relative',
                        minHeight: 'calc(100vh - 145px)', // Trừ chiều cao của footer
                    }}
                >
                    <Grid item xs={12}>
                        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>{products?.length} sản phẩm</Typography>
                            <FormControl fullWidth={isMobile} style={{ width: isMobile ? '100%' : '300px' }}>
                                <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sort}
                                    label="Sắp xếp theo"
                                    onChange={(e) => setSort(e.target.value as string)}
                                >
                                    <MenuItem value="ALL">Mặc định</MenuItem>
                                    <MenuItem value="buyQuantity:desc">Sản phẩm bán chạy</MenuItem>
                                    <MenuItem value="createAt:desc">Sản phẩm mới ra mắt</MenuItem>
                                    <MenuItem value="price:asc">Giá từ thấp đến cao</MenuItem>
                                    <MenuItem value="price:desc">Giá từ cao đến thấp</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    {/* Các Sản Phẩm */}
                    <Grid container spacing={2}>
                        {products && products.length > 0 ? (
                            products.map((product: ProductUserResponse, index: number) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={`${product.product.id}-${index}`} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ boxShadow: 2, borderRadius: 2, padding: 1, '&:hover': { boxShadow: 6 }, display: 'flex', alignItems: 'center' }}>
                                        <ProductCard product={product} />
                                    </Box>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="body1" textAlign="center">Không có sản phẩm nào để hiển thị.</Typography>
                            </Grid>
                        )}
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center' }}>
                        <Stack spacing={2}>
                            <Pagination count={totalPage} page={pageNo} variant="outlined" shape="rounded" onChange={handleChange} />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Products;