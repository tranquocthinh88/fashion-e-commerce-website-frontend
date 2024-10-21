import { Box, Button, FormControl, InputLabel, Select, styled, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper, MenuItem, useMediaQuery, TableBody, Backdrop, CircularProgress, ImageList } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as yup from 'yup';
import { ProviderModel } from "../../../models/provider.model";
import { CategoryModel } from "../../../models/category.model";
import { SizeModel } from "../../../models/size.model";
import { ColorModel } from "../../../models/color.model";
import { useEffect, useState } from "react";
import { ProductDetailDto } from "../../../dtos/requests/admin/product-detail.dto";
import { useFormik } from "formik";
import { ProductDto } from "../../../dtos/requests/admin/product.dto";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { createProduct } from "../../../services/product.service";
import { createProductDetail } from "../../../services/product-detail.service";
import { ProductModel } from "../../../models/product.model";
import { getAllProviders } from "../../../services/provider.service";
import { getAllCategories } from "../../../services/category.service";
import { getAllSizes } from "../../../services/size.service";
import { getAllColors } from "../../../services/color.service";
import AlertCustom from "../../../components/common/AlertCustom";
import ProductImage from "../../../components/admin/product/ProductImage";
import { BrandModel } from "../../../models/brand.model";
import { getAllBrands } from "../../../services/brand.service";

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

const validationProductSchema = yup.object({
    productName: yup.string().required('Vui lòng nhập tên sản phẩm'),
    price: yup.number().min(1, 'Giá phải lớn hơn 0').required('Vui lòng nhập giá'),
    categoryId: yup.string().required('Vui lòng chọn loại sản phẩm'),
    providerId: yup.string().required('Vui lòng chọn nhà cung cấp'),
    brandId: yup.string().required('Vui lòng chọn thương hiệu')
});

const validationProductDetailSchema = yup.object({
    colorId: yup.string().required('Vui lòng chọn màu sắc'),
    sizeId: yup.string().required('Vui lòng chọn kích thước'),
    quantity: yup.number().min(1, 'Số lượng phải lớn hơn 0').required('Vui lòng nhập số lượng'),
    weight: yup.number().min(1, 'Khối lượng phải lớn hơn 0').required('Vui lòng nhập khối lượng'),
});

const CreateProduct = () => {
    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [productDetailDtos, setProductDetailDtos] = useState<ProductDetailDto[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [thumbnail, setThumbnail] = useState<number>(0);
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const formik = useFormik({
        initialValues: {
            productName: '',
            price: 0,
            categoryId: '',
            providerId: '',
            description: '',
            brandId: ''
        },
        validationSchema: validationProductSchema,
        onSubmit: async (values: ProductDto, { resetForm }) => {
            setOpenBackdrop(true);
            const formData = new FormData();
            formData.append('productName', values.productName ? values.productName : '');
            formData.append('thumbnail', thumbnail.toString());
            formData.append('price', values.price ? values.price.toString() : '0');
            formData.append('description', values.description ? values.description : '');
            formData.append('categoryId', values.categoryId ? values.categoryId.toString() : '0');
            formData.append('providerId', values.providerId ? values.providerId.toString() : '0');
            formData.append('brandId', values.brandId ? values.brandId.toString() : '0');

            images.forEach((image) => {
                formData.append(`images`, image, image.name);
            });

            try {
                const response: ResponseSuccess<ProductModel> = await createProduct(formData);
                const productId = (response.data.id);
                const productDetails = productDetailDtos.map((dto: ProductDetailDto) => {
                    return { ...dto, productId: productId };
                })
                for (const productDetailDto of productDetails) {
                    await createProductDetail(productDetailDto);
                }
                resetForm();
                setImages([]);
                setUrls([]);
                setProductDetailDtos([]);
                setOpenBackdrop(false);
                setOpenAlert(
                    {
                        show: true,
                        status: 'success',
                        message: 'Thêm sản phẩm thành công'
                    }
                )
            } catch (error) {
                setOpenBackdrop(false);
                setOpenAlert(
                    {
                        show: true,
                        status: 'error',
                        message: 'Thêm sản thất bại'
                    }
                )
                console.log(error);
            }
        },
    });



    const formikProductDetail = useFormik({
        initialValues: {
            productId: '', // or any default value
            sizeId: '',
            colorId: '',
            quantity: 0,
            weight: 0
        },
        validationSchema: validationProductDetailSchema,
        onSubmit: (values: ProductDetailDto, { resetForm }) => {
            setProductDetailDtos(prev => {
                const productDto: ProductDetailDto | undefined = prev.find((dto: ProductDetailDto) => {
                    return dto.sizeId === values.sizeId && dto.colorId === values.colorId;
                });
                if (productDto) {
                    productDto.quantity = (productDto?.quantity ?? 0) + (values?.quantity ?? 0);
                } else {
                    prev.push(values);
                }
                return prev;
            });
            resetForm();
        },
    });

    const deleteProductDetail = (productDetailDto: ProductDetailDto) => {
        setProductDetailDtos(prev => {
            const newPrev = prev.filter((dto: ProductDetailDto) => dto !== productDetailDto);
            return newPrev;
        })
    }

    useEffect(() => {
        (async () => {
            try {
                const responseProvider: ResponseSuccess<ProviderModel[]> = await getAllProviders();
                setProviders(responseProvider.data);
                const responseBrand: ResponseSuccess<BrandModel[]> = await getAllBrands();
                setBrands(responseBrand.data);
                const responseCategory: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(responseCategory.data);
                const responseSizes: ResponseSuccess<SizeModel[]> = await getAllSizes();
                setSizes(responseSizes.data);
                const responseColors: ResponseSuccess<ColorModel[]> = await getAllColors();
                setColors(responseColors.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImages([...images, ...Array.from(files)]);
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setUrls(prev => [...prev, ...imageUrls]);
        }
    }

    const addProductDetail = () => {
        formikProductDetail.handleSubmit();
    }

    const handleSubmit = () => {
        formik.handleSubmit();
    }

    const removeImage = (index: number) => {
        setUrls(prev => {
            const newUrls = prev.filter(url => url !== prev[index]);
            return newUrls;
        });
        setImages(prev => {
            const newImages = prev.filter(img => img !== prev[index]);
            return newImages;
        });
    }
    const setThumbnailImage = (index: number) => {
        setThumbnail(index);
    }
    const colseAlert = () => {
        setOpenAlert(
            {
                show: false,
                status: '',
                message: ''
            }
        )
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                p: 2
            }}
            noValidate
            autoComplete="off"
        >
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}
            {openBackdrop && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
            <Typography component="span" sx={{ flexGrow: 1 }}>
                Thêm sản phẩm
            </Typography>

            <Box sx={{ mt: 2, }}>

                <Typography component="span" sx={{ flexGrow: 1, pl: 3 }}>
                    Thông tin sản phẩm
                </Typography>
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <TextField
                        sx={{
                            flexBasis: '200px',
                            display: 'flex',
                            flexGrow: 1
                        }}
                        id="product-name"
                        label="Tên sản phẩm"
                        name="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.productName && Boolean(formik.errors.productName)}
                        helperText={formik.touched.productName && formik.errors.productName}
                    />
                    <TextField
                        sx={{
                            flexBasis: '200px',
                            display: 'flex',
                            flexGrow: 1
                        }}
                        id="product-price"
                        label="Giá"
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
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
                        <InputLabel id="categories">Loại sản phẩm</InputLabel>
                        <Select
                            labelId="categories"
                            id="categories"
                            label="Loại sản phẩm"
                            name="categoryId"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                        >
                            {categories.map((category: CategoryModel) => (
                                <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.categoryId && formik.errors.categoryId && (
                            <Typography color="error">{formik.errors.categoryId}</Typography>
                        )}
                    </FormControl>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="providers">Nhà cung cấp</InputLabel>
                        <Select
                            labelId="providers"
                            id="providers"
                            label="Nhà cung cấp"
                            name="providerId"
                            value={formik.values.providerId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.providerId && Boolean(formik.errors.providerId)}
                        >
                            {providers.map((provider: ProviderModel) => (
                                <MenuItem key={provider.id} value={provider.id}>{provider.providerName}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.providerId && formik.errors.providerId && (
                            <Typography color="error">{formik.errors.providerId}</Typography>
                        )}
                    </FormControl>
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
                        <InputLabel id="brands">Thương hiệu</InputLabel>
                        <Select
                            labelId="brands"
                            id="brands"
                            label="Thương hiệu"
                            name="brandId"
                            value={formik.values.brandId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.brandId && Boolean(formik.errors.brandId)}
                        >
                            {brands.map((brand: BrandModel) => (
                                <MenuItem key={brand.id} value={brand.id}>{brand.brandName}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.brandId && formik.errors.brandId && (
                            <Typography color="error">{formik.errors.brandId}</Typography>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <TextField
                        sx={{
                            flexBasis: '200px',
                            display: 'flex',
                            flexGrow: 1
                        }}
                        id="outlined-multiline-static"
                        label="Mô tả"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                    >
                        Upload ảnh
                        <VisuallyHiddenInput type="file" accept={"image/*"} multiple onChange={handleChangeImages} />
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    p: 2,
                    flexWrap: 'wrap',
                    gap: 12
                }}>
                    <ImageList cols={isMobile ? 2 : 4}>
                        {urls.map((url: string, index: number) => (
                            <ProductImage key={index} url={url} index={index}
                                removeImage={removeImage}
                                setThumbnailImage={setThumbnailImage}
                                isThumbnail={index === thumbnail}
                            />
                        ))}
                    </ImageList>
                </Box>
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
                        <InputLabel id="colors">Màu sắc</InputLabel>
                        <Select
                            labelId="colors"
                            id="colors"
                            label="Màu sắc"
                            name="colorId"
                            value={formikProductDetail.values.colorId}
                            onChange={formikProductDetail.handleChange}
                            onBlur={formikProductDetail.handleBlur}
                            error={formikProductDetail.touched.colorId && Boolean(formikProductDetail.errors.colorId)}
                        >
                            {colors.map((color: ColorModel) => (
                                <MenuItem key={color.id} value={color.id}>{color.colorName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="sizes">Kích thước</InputLabel>
                        <Select
                            labelId="sizes"
                            id="sizes"
                            label="Kích thước"
                            name="sizeId"
                            value={formikProductDetail.values.sizeId}
                            onChange={formikProductDetail.handleChange}
                            onBlur={formikProductDetail.handleBlur}
                            error={formikProductDetail.touched.sizeId && Boolean(formikProductDetail.errors.sizeId)}
                        >
                            {sizes.map((size: SizeModel) => (
                                <MenuItem key={size.id} value={size.id}>{size.textSize ?? size.numberSize}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    p: 2, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <TextField
                        sx={{ flex: 1 }}
                        id="product-price"
                        label="Số lượng"
                        type="number"
                        name="quantity"
                        value={formikProductDetail.values.quantity}
                        onChange={formikProductDetail.handleChange}
                        onBlur={formikProductDetail.handleBlur}
                        error={formikProductDetail.touched.quantity && Boolean(formikProductDetail.errors.quantity)}
                        helperText={formikProductDetail.touched.quantity && formikProductDetail.errors.quantity}
                    />
                    <TextField
                        sx={{ flex: 1 }}
                        id="product-weight"
                        label="Khối lượng"
                        type="number"
                        name="weight"
                        value={formikProductDetail.values.weight}
                        onChange={formikProductDetail.handleChange}
                        onBlur={formikProductDetail.handleBlur}
                        error={formikProductDetail.touched.weight && Boolean(formikProductDetail.errors.weight)}
                        helperText={formikProductDetail.touched.weight && formikProductDetail.errors.weight}
                    />
                </Box>
                <Box sx={{ p: 2, pl: 3 }}>
                    <Button variant="contained" onClick={addProductDetail}>Thêm</Button>
                </Box>

                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Màu sắc</TableCell>
                                <TableCell >Kích thước</TableCell>
                                <TableCell >Số lượng</TableCell>
                                <TableCell >Cân nặng(g)</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
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
                                    <TableCell>{productDetailDto.weight}</TableCell>
                                    <TableCell align="center">
                                        <Button sx={{
                                            width: '80px',
                                            height: '20px',
                                            fontSize: '9px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            ml: 1
                                        }} color={'success'} variant="contained" onClick={() => {
                                        }}>Cập nhật</Button>
                                        <Button sx={{
                                            width: '70px',
                                            height: '20px',
                                            fontSize: '9px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            ml: 1
                                        }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                            deleteProductDetail(productDetailDto)
                                        }} >Xóa</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained" color="success" onClick={handleSubmit}>Hoàn tất</Button>
            </Box>
        </Box>
    )
}
export default CreateProduct;