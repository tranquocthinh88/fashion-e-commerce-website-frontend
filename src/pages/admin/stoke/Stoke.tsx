import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { PageResponse } from "../../../dtos/responses/page.response";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import { getPageProducts, getProductById } from "../../../services/product.service";
import { parse } from 'date-fns';
import { ProductModel } from "../../../models/product.model";
import { ProductDetailModel } from "../../../models/product-detail.model";
import { subMonths, format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';

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

    const navigate = useNavigate();

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
            renderCell: (params) => (
                <Button variant="contained" color="success"
                    onClick={() => navigate(`/admin/products/update/${params.row.id}`)}
                >
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
        {
            field: 'importDate', headerName: 'Ngày nhập', type: 'date', width: 120,
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

    useEffect(() => {
        (async () => {
            try {
                const threeMonthsAgo = subMonths(new Date(), 2);
                const formattedDate = format(threeMonthsAgo, 'yyyy-MM-dd');

                const filters = [
                    {
                        field: 'importDate',
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
                    150,
                    filters,
                    [
                        {
                            field: 'importDate',
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
                buyQuantity: item.product.buyQuantity ?? 0,
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
                quantity: detail.quantity ?? 0,
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

    const handleExportToExcel = async () => {
        const dataToExport = transformedProducts.map((item) => ({
            "Mã sản phẩm": item.id,
            "Tên sản phẩm": item.productName,
            "Ngày nhập": item.importDate
                ? new Date(item.importDate).toLocaleDateString("vi-VN")
                : "N/A",
            "Tồn kho": item.totalQuantity,
            "Số lượng bán": item.buyQuantity,
            "Giá nhập": item.inputPrice,
        }));

        const totalRows = dataToExport.length;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Danh sách sản phẩm tồn kho');

        // Thêm tiêu đề và ngày xuất
        worksheet.mergeCells('A1:H1');
        worksheet.getCell('A1').value = "Báo cáo danh sách sản phẩm tồn kho";
        worksheet.getCell('A1').font = { bold: true, size: 14 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:H2');
        worksheet.getCell('A2').value = `Ngày xuất: ${new Date().toLocaleDateString("vi-VN")} - ${new Date().toLocaleTimeString("vi-VN")}`;
        worksheet.getCell('A2').font = { italic: true, size: 12 };
        worksheet.getCell('A2').alignment = { horizontal: 'center' };

        // Thêm header cho các cột
        const headerRow = [
            "Mã sản phẩm",
            "Tên sản phẩm",
            "Ngày nhập",
            "Tồn kho",
            "Số lượng bán",
            "Giá nhập",
        ];
        worksheet.addRow(headerRow);

        const header = worksheet.getRow(3);
        header.font = { bold: true };
        header.alignment = { horizontal: 'center' };

        // Thêm dữ liệu từ `dataToExport`
        dataToExport.forEach((data) => {
            worksheet.addRow([
                data["Mã sản phẩm"],
                data["Tên sản phẩm"],
                data["Ngày nhập"],
                data["Tồn kho"],
                data["Số lượng bán"],
                data["Giá nhập"],
            ]);
        });

        // Thêm tổng số dòng ở cuối dữ liệu
        worksheet.addRow([]);
        worksheet.addRow([`Tổng số mẫu sản phẩm tồn kho: ${totalRows}`]);
        const totalRow = worksheet.getRow(worksheet.lastRow?.number ?? 0);
        totalRow.font = { bold: true };

        // Xuất file Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'danh-sach-san-pham-ton-kho.xlsx';
        link.click();
    };

    useEffect(() => {
        document.title = "Quản lý tồn kho - Admin";
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 1, width: '100%' }}>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h5" gutterBottom>
                    Quản lý tồn kho
                </Typography>
            </Box>
            {/* <Box sx={{ width: '25%', mt: 2, mb: 2 }}>
                <SearchInput placeHolder={'Nhập tên sản phẩm'} />
            </Box> */}
            <Box className={classes.dataGridBox}>
                <DataGrid
                    rows={transformedProducts}
                    columns={columns}
                    onRowClick={(param) => {
                        handleRowClick(param.id.toString());
                    }}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                />
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={handleExportToExcel}>
                    Xuất Excel (Danh sách sản phẩm)
                </Button>
            </Box>
            {selectedProductId && (
                <Box sx={{ mt: 2, width: '93%' }}>
                    <Typography variant="h6">Chi tiết sản phẩm: {selectedProductId} </Typography>
                    <DataGrid
                        rows={transformedProductDetails(selectedProductId)}
                        columns={detailColumns}
                        autoHeight
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Stoke;
