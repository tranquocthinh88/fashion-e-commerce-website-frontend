import { Box, Button, FormControl, InputLabel, Select, styled, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { bodyAdminColor, navbarHover } from "../../../theme";

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateProduct = () => {
    return (
        <Box sx={{ background: bodyAdminColor }}>
            <Box sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Thêm sản phẩm !</Box>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                ml: 1
            }}>
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    label="Tên sản phẩm"
                    name="productName"

                />
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    label="Giá"
                    type="number"
                    name="price"

                />
            </Box>
            <Box sx={{
                p: 2, pl: 3, display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'

            }}>
                <FormControl sx={{
                    flexBasis: '200px',
                    display: 'flex',
                    flexGrow: 1
                }}>
                    <InputLabel id="categoriesLabel">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="categoriesLabel"
                        label="Loại sản phẩm"
                    >
                        <option value="1">Áo</option>
                        <option value="2">Quần</option>
                        <option value="3">Giày</option>
                        <option value="4">Phụ kiện</option>
                    </Select>
                </FormControl>
                <FormControl sx={{
                    flexBasis: '200px',
                    display: 'flex',
                    flexGrow: 1
                }}>
                    <InputLabel id="providersLabel">Nhà cung cấp</InputLabel>
                    <Select
                        labelId="providersLabel"
                        label="Nhà cung cấp"
                    >
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ p: 2, display: 'flex', ml: 1 }}>
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    label="Mô tả"
                    name="description"
                    multiline
                    rows={4}
                />
            </Box>
            <Box sx={{ p: 2, pl: 3 }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        ':hover': {
                            background: navbarHover,
                            color: 'white'
                        },
                        backgroundColor: '#E6B9DB'
                    }}
                >
                    Upload ảnh
                    <VisuallyHiddenInput type="file" accept={"image/*"} multiple />
                </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography component="span" sx={{ flexGrow: 1, pl: 3 }}>
                    Chi tiết sản phẩm
                </Typography>
                <Box sx={{
                    p: 2, pl: 3, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'

                }}>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="colorsLabel">Màu sắc</InputLabel>
                        <Select
                            labelId="colorsLabel"
                            id="colors"
                            label="Màu sắc"
                            name="colorId"
                        ></Select>
                    </FormControl>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="sizesIdLabel">Kích thước</InputLabel>
                        <Select
                            labelId="sizesIdLabel"
                            label="Kích thước"
                            name="sizeId"
                        ></Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    p: 2, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    ml: 1
                }}>
                    <TextField
                        sx={{ flex: 1 }}
                        label="Số lượng"
                        type="number"
                        name="quantity"
                    />
                </Box>
                <Box sx={{ p: 2, pl: 3 }}>
                    <Button variant="contained"
                        sx={{
                            ':hover': {
                                background: navbarHover,
                                color: 'white'
                            },
                            backgroundColor: '#E6B9DB'
                        }}>Thêm</Button>
                </Box>

                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table size={'small'} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Màu sắc</TableCell>
                                <TableCell >Kích thước</TableCell>
                                <TableCell >Số lượng</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            {productDetailDtos.map((productDetailDto: ProductDetailDto, index: number) => (
                                <TableRow key={index} sx={{
                                    ':hover': {
                                        backgroundColor: 'secondary.main'
                                    }
                                }}>
                                    <TableCell >{colors.filter(color => productDetailDto.colorId === color.id)[0].colorName}</TableCell>
                                    <TableCell >{sizes.filter(size => productDetailDto.sizeId === size.id)[0].numberSize ??
                                        sizes.filter(size => productDetailDto.sizeId === size.id)[0].textSize
                                    }</TableCell>
                                    <TableCell>{productDetailDto.quantity}</TableCell>
                                    <TableCell align="center">
                                        <Button sx={{
                                            width: '70px',
                                            height: '20px',
                                            fontSize: '9px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                        }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                            deleteProductDetail(productDetailDto)
                                        }} >Xóa</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
export default CreateProduct;