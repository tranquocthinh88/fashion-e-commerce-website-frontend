import { Box, Button, Pagination, Stack } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import SearchInput from "../../../components/common/search/SearchInput";
import { useState } from "react";

const Discount = () => {
    const [totalPage, setTotalPage] = useState(1);
    const queryParams = new URLSearchParams(location.search);
    const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
    const [pageNoState, setPageNoState] = useState(pageNo);
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
                    >
                    Thêm voucher
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: "25%" }}>
                    <SearchInput placeHolder={"Nhập tên tên voucher"}
                    />
                </Box>
            </Box>
            {/* <Box sx={{
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
                                inputPrice={item.product.inputPrice ?? 0}
                                productPrice={item.product.price ?? 0}
                                productPriceFinal={item.priceFinal ?? 0}
                                fNavigate={fNavigate}
                                thumbnail={item.product.thumbnail ?? ''}
                                totalQuantity={item.product.totalQuantity ?? 0}
                            />
                        </Box>
                    </Box>
                ))}
            </Box> */}
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
};
export default Discount;