import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchInput from "../../../components/common/search/SearchInput";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { PageResponse } from "../../../dtos/responses/page.response";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import { getPageProducts, getProductById } from "../../../services/product.service";
import { parse } from 'date-fns';
import { ProductModel } from "../../../models/product.model";
import { ProductDetailModel } from "../../../models/product-detail.model";
import { subMonths, format } from 'date-fns';

const columns: GridColDef[] = [
    {
        field: 'thumbnail',
        headerName: 'Hình ảnh',
        width: 100,
        renderCell: (params) => <img src={params.value} alt="" style={{ width: 60, height: 60 }} />,
    },
    { field: 'id', headerName: 'Mã sản phẩm', width: 150 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 320 },
    {
        field: 'importDate', headerName: 'Ngày nhập', type: 'date', width: 120,
        valueGetter: (params: { row: ProductModel }) => {
            const importDate = params;
            if (!importDate) {
                return new Date();
            }
            try {
                return parse(importDate.toString(), 'yyyy-MM-dd HH:mm:ss', new Date());
            } catch (e) {
                console.error("Error parsing importDate: ", importDate);
                return new Date();
            }
        }
    },
    { field: 'totalQuantity', headerName: 'Tồn kho', type: 'number', width: 120 },
    { field: 'buyQuantity', headerName: 'Số lượng bán', type: 'number', width: 120 },
    { field: 'inputPrice', headerName: 'Giá nhập', type: 'number', width: 150 },
    {
        field: 'action',
        headerName: 'Thao tác',
        width: 150,
        renderCell: () => (
            <Button variant="contained" color="success">
                Xả kho
            </Button>
        ),
    },
];

const detailColumns: GridColDef[] = [
    { field: 'id', headerName: 'Mã chi tiết', width: 150 },
    { field: 'color', headerName: 'Màu', width: 220 },
    { field: 'size', headerName: 'Kích thước', type: 'string', width: 120 },
    { field: 'quantity', headerName: 'Số lượng tồn kho', type: 'number', width: 150 },
    { field: 'importDate', headerName: 'Ngày nhập', type: 'date', width: 120,
        valueGetter: (params: { row: ProductDetailModel }) => {
            const importDate = params;
            if (!importDate) {
                return new Date();
            }
            try {
                return parse(importDate.toString(), 'yyyy-MM-dd HH:mm:ss', new Date());
            } catch (e) {
                console.error("Error parsing importDate: ", importDate);
                return new Date();
            }
        }
    },
];

const useStyles = makeStyles({
    dataGridBox: {
        width: '93%',
    },
});

const Stoke = () => {
    const [products, setProducts] = useState<ProductUserResponse[]>([]);
    const [productDetails, setProductDetails] = useState<{ [key: string]: ProductDetailModel[] }>({});
    const [selectedProductDetails, setSelectedProductDetails] = useState<ProductDetailModel[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const threeMonthsAgo = subMonths(new Date(), 1);
                const formattedDate = format(threeMonthsAgo, 'yyyy-MM-dd');

                const filters = [
                    {
                        field: 'createdAt',
                        operator: '<=',
                        value: formattedDate,
                    },
                    {
                        field: 'totalQuantity',
                        operator: '>',
                        value: '0',
                    }
                ];

                const response: ResponseSuccess<PageResponse<ProductUserResponse[]>> = await getPageProducts(
                    1,
                    15,
                    filters,
                    [
                        {
                            field: 'createdAt',
                            order: 'asc',
                        },
                    ]
                );
                setProducts(response.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const fetchProductDetail = async (id: string) => {
        try {
            const response = await getProductById(id);
            const { productDetail } = response.data;
            if (!productDetail || !Array.isArray(productDetail)) {
                console.error('Dữ liệu không hợp lệ:', response.data);
                return;
            }
            setProductDetails((prevState) => ({
                ...prevState,
                [id]: productDetail,
            }));

            // Cập nhật chi tiết sản phẩm được chọn
            setSelectedProductDetails(productDetail);
        } catch (e) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', e);
        }
    };

    const transformProducts = (products: ProductUserResponse[]) => {
        return products.map((item) => {
            if (!item.product.id) {
                console.error('Product missing id:', item);
            }
            return {
                id: item.product.id,
                productName: item.product.productName,
                thumbnail: item.product.thumbnail,
                importDate: item.product.importDate,
                totalQuantity: item.product.totalQuantity,
                buyQuantity: item.product.buyQuantity,
                inputPrice: item.product.inputPrice,
            };
        });
    };

    const transformedProducts = transformProducts(products);

    const transformedProductDetails = (productId: string) => {
        const details = productDetails[productId] || [];
        console.log('Sản phẩm được chọn: ', selectedProductDetails);
        

        return Array.isArray(details)
            ? details.map((detail) => ({
                id: detail.id,
                color: detail.color.colorName,
                size: detail.size?.numberSize || detail.size?.textSize,
                quantity: detail.quantity,
                importDate: detail.importDate,
            }))
            : [];
    };

    const handleRowClick = (id: string) => {
        setSelectedProductId(id);
        if (!productDetails[id]) {
            fetchProductDetail(id);
        } else {
            setSelectedProductDetails(productDetails[id]);
        }
    };

    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 1, width: '100%' }}>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h5" gutterBottom>
                    Quản lý kho
                </Typography>
            </Box>
            <Box sx={{ width: '25%', mt: 2, mb: 2 }}>
                <SearchInput placeHolder={'Nhập tên sản phẩm'} />
            </Box>
            <Box className={classes.dataGridBox}>
                <DataGrid
                    rows={transformedProducts}
                    columns={columns}
                    onRowClick={(param) => {
                        handleRowClick(param.id.toString());
                    }}
                    autoHeight
                />
            </Box>
            {selectedProductId && (
                <Box sx={{ mt: 2, width: '93%' }}>
                    <Typography variant="h6">Chi tiết sản phẩm: {selectedProductId} </Typography>
                    <DataGrid
                        rows={transformedProductDetails(selectedProductId)}
                        columns={detailColumns}
                        autoHeight
                    />
                </Box>
            )}
        </Box>
    );
};

export default Stoke;
