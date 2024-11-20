import { Box, Button, MenuItem, Pagination, Select, Stack, useMediaQuery } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCardAdmin from "../../../components/admin/cards/ProductCardAdmin";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { ProviderModel } from "../../../models/provider.model";
import { CategoryModel } from "../../../models/category.model";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import { getAllProviders } from "../../../services/provider.service";
import { getAllCategories } from "../../../services/category.service";
import { PageResponse } from "../../../dtos/responses/page.response";
import { getPageProducts } from "../../../services/product.service";
import SearchInput from "../../../components/common/search/SearchInput";



const Product = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [totalPage, setTotalPage] = useState(1);
    const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
    const [pageNoState, setPageNoState] = useState(pageNo);
    const [search, setSearch] = useState<{
        field: string,
        value: string,
        operator: string
    }[]>([]);
    const [status, setStatus] = useState<string>("ALL");
    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [categoryName, setCategoryName] = useState<string>("ALL");
    const [providerName, setProviderName] = useState<string>("ALL");
    const fNavigate = (id: string) => {
        navigate('update/' + id);
    }
    const handleSearch = (text: string) => {
        if (text) {
            const searchParams = [{
                field: "productName",
                value: text,
                operator: ":"
            }];
            setSearch(searchParams);
        } else {
            setSearch([]);
        }
    }
    const [products, setProducts] = useState<ProductUserResponse[]>([]);

    useEffect(() => {
        handleNavigate(pageNoState, search);
    }, [pageNoState, search]);

    const [filterOption, setFilterOption] = useState<string>('ALL'); // State cho Select

    const handleNavigate = (pageNoState: number, searchParams: any[]) => {
        let appendSearch: string = "";
        if (searchParams.length > 0) {
            const searchString: string = searchParams.map(param => `${param.field}${param.operator}${param.value}`).join(',');
            appendSearch = "&search=" + encodeURIComponent(searchString);
        }
        navigate(`?pageNo=${pageNoState}${appendSearch}`);
    }

    useEffect(() => {
        const searchParamString = queryParams.get("search");
        if (searchParamString) {
            const searchArray: {
                field: string,
                operator: string,
                value: string;
            }[] = searchParamString.split(',').map(param => {
                const [field, operatorValue] = param.split(/[:\-]/);
                const operator = param.includes(':') ? ':' : '-';
                const value = operatorValue.split('or')[0];
                return { field, operator, value };
            });
            if (search.length > 0) {
                for (let i = 0; i < searchArray.length; i++) {
                    if (searchArray[i].field.startsWith("category")) {
                        setCategoryName(searchArray[i].value);
                    } else if (searchArray[i].field.startsWith("provider")) {
                        setProviderName(searchArray[i].value);
                    } else if (searchArray[i].field.startsWith("status")) {
                        setStatus(searchArray[i].value);
                    }
                }
            } else {
                setCategoryName("ALL");
                setProviderName("ALL");
                setStatus("ALL");
            }
            setSearch(searchArray);
        }
    }, [location.search]);
    useEffect(() => {
        (async () => {
            try {
                const responseProvider: ResponseSuccess<ProviderModel[]> = await getAllProviders();
                setProviders(responseProvider.data);
                const responseCategory: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(responseCategory.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<PageResponse<ProductUserResponse[]>> = await getPageProducts(pageNoState, 15, search);
                setProducts(response.data.data);
                setTotalPage(response.data.totalPage);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [pageNoState, search]);

    const handleSelectChange = (event: any) => {
        // setFilterOption(event.target.value); // Cập nhật state khi chọn option
        const selectedCategory = event.target.value;
        setFilterOption(selectedCategory); // Cập nhật state khi chọn option
        setCategoryName(selectedCategory); // Cập nhật categoryName
        if (selectedCategory !== "ALL") {
            setSearch([{ field: "category.categoryName", value: selectedCategory, operator: "-" }]);
        } else {
            setSearch([]);
        }
    };

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNoState(value);
    };

    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold' }}>Sản phẩm !</Box>
            <Box sx={{
                width: 170,
                mt: 2, mb: 2, transition: "transform 0.3s ease-in-out", '&:hover': {
                    transform: "scale(1.1)",
                }
            }}>
                <Button variant="contained" sx={{ backgroundColor: '#c0fd05', color: '#f511cc' }}
                    onClick={() => navigate("/admin/products/createProducts")}>
                    Thêm sản phẩm
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 0.5, ml: 2, whiteSpace: 'nowrap' }}>Lọc sản phẩm</Box>
                    <Select
                        value={filterOption ?? 'ALL'} // Giá trị của Select
                        onChange={handleSelectChange} // Hàm xử lý khi chọn
                        sx={{ width: 150, height: 38, ml: 2 }}
                    >
                        <MenuItem value="ALL">Tất cả</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.categoryName} sx={{ color: 'red' }}>
                                {category.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: "25%" }}>
                    <SearchInput placeHolder={"Nhập tên sản phẩm"}
                        handleSearch={handleSearch}
                    />
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                p: 0.5
            }}>
                {products.map((item: ProductUserResponse, index: number) => (
                    <Box sx={{ width: '270px' }} key={index}>
                        <Box sx={{ width: isMobile ? '150px' : '270px' }} key={index}>
                            <ProductCardAdmin
                                productId={item.product.id ?? ''}
                                productName={item.product.productName ?? ''}
                                productPrice={item.product.price ?? 0}
                                productPriceFinal={item.priceFinal ?? 0}
                                fNavigate={fNavigate}
                                thumbnail={item.product.thumbnail ?? ''}
                                totalQuantity={item.product.totalQuantity ?? 0}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center',
                width: '100%', justifyContent: 'flex-end',
                mt: 2
            }}>
                <Stack spacing={2}>
                    <Pagination count={totalPage} page={pageNoState} variant="outlined" color={"primary"} onChange={handleChange} />
                </Stack>
            </Box>
        </Box>
    )
}
export default Product;