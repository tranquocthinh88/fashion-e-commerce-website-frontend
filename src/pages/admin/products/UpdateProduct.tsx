import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    FormControl,
    ImageList,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { ProviderModel } from "../../../models/provider.model";
import { CategoryModel } from "../../../models/category.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getAllProviders } from "../../../services/provider.service";
import { SizeModel } from "../../../models/size.model";
import { ColorModel } from "../../../models/color.model";
import { getAllSizes } from "../../../services/size.service";
import { getAllColors } from "../../../services/color.service";
import * as yup from 'yup';
import { useFormik } from "formik";
import { getProductById, updateProduct } from "../../../services/product.service";
import AlertCustom from "../../../components/common/AlertCustom";
import { useParams } from "react-router-dom";
import { ProductImageModel } from "../../../models/product-image.model";
import { ProductDetailModel } from "../../../models/product-detail.model";
import { createProductDetail, updateProductDetail } from "../../../services/product-detail.service";
import { ProductResponse } from "../../../dtos/responses/products/product.response";
import { ProductPriceModel } from "../../../models/product-price.model";
import { createProductPrice, deleteProductPrice, getAllProductPricesByProductId } from "../../../services/product-price.service";
import { ProductDto } from "../../../dtos/requests/admin/product.dto";
import { ProductPriceDto } from "../../../dtos/requests/admin/product-price.dto";
import { ProductDetailDto } from "../../../dtos/requests/admin/product-detail.dto";
import { getAllCategories } from "../../../services/category.service";
import { Status } from "../../../models/enum/status.enum";
import ProductImage from "../../../components/admin/product/ProductImage";
import { BrandModel } from "../../../models/brand.model";
import { getAllBrands } from "../../../services/brand.service";
import { format } from 'date-fns';

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
    weight: yup.number().min(1, 'Trọng lượng phải lớn hơn 0').required('Vui lòng nhập trọng lượng')
});

const validationProductPriceSchema = yup.object({
    discount: yup.number().required("Vui lòng nhập phần trăm giảm giá").min(1, "Tối thiểu 1%").max(100, "Tối đa 100%"),
    expiredDate: yup.date().required("Vui lòng nhập hạn giảm giá").min(new Date(), "Ngày hết hạn phải lớn hơn ngày và giờ bắt đầu giảm giá"),
    issueDate: yup.date().required("Vui lòng nhập ngày bắt đầu giảm giá").min(new Date(), "Ngày bắt đầu phải lớn hơn ngày và giờ hiện tại")
});




const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();

    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [productDetail, setProductDetail] = useState<ProductDetailModel[]>([]);
    const [images, setIamges] = useState<File[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<number>(0);
    const [product, setProduct] = useState<ProductResponse>();
    const [productPrices, setProductPrices] = useState<ProductPriceModel[]>([]);
    const [brands, setBrands] = useState<BrandModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductResponse> = await getProductById(id ?? '');
                setProduct(response.data);
                const productImages: ProductImageModel | any = response.data.productImage;
                const productDetails: ProductDetailModel | any = response.data.productDetail;
                if (productDetails) {
                    setProductDetail(productDetails);
                }
                if (productImages) {
                    setUrls(productImages.map((url: ProductImageModel) => url.path));
                    setThumbnail(productImages.findIndex((image: ProductImageModel) => image.path === response.data.product.thumbnail));
                }

            } catch (error) {
                console.log(error);
            }

        })();
    }, [id]);

    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const formik = useFormik({
        initialValues: {
            productName: product ? product.product.productName : "",
            price: product ? product.product.price : 0,
            categoryId: product ? product.product.category?.id : "",
            providerId: product ? product.product.provider?.id : "",
            description: product ? product.product.description : "",
            status: product ? product.product.productStatus : Status.ACTIVE,
            brandId: product ? product.product.brand.id ?? "" : "",
        },
        enableReinitialize: true,
        validationSchema: validationProductSchema,
        onSubmit: async (values: ProductDto) => {
            setOpenBackdrop(true);
            try {
                await updateProduct(Number(id), {
                    productName: values.productName || "",
                    price: values.price || 0,
                    categoryId: Number(values.categoryId) || 0,
                    providerId: Number(values.providerId) || 0,
                    description: values.description || "",
                    status: values.status || Status.ACTIVE,
                    thumbnail: urls[thumbnail],
                    brandId: String(values.brandId) || "",
                });
                setOpenBackdrop(false);
                setOpenAlert(
                    {
                        show: true,
                        status: 'success',
                        message: 'Cập nhật thành công'
                    }
                )
            } catch (error) {
                setOpenBackdrop(false);
                setOpenAlert(
                    {
                        show: true,
                        status: 'error',
                        message: 'Cập nhật thất bại'
                    }
                )
                console.log(error);
            }
        },
    });



    const formikProductPrice = useFormik({
        initialValues: {
            productId: id ?? '',
            discount: 0,
            issueDate: new Date(),
            expiredDate: new Date(),
            note: ""
        },
        validationSchema: validationProductPriceSchema,
        onSubmit: async (values: ProductPriceDto, { resetForm }) => {
            try {
                const formattedValues = {
                    ...values,
                    issueDate: new Date(format(values.issueDate, 'yyyy-MM-dd HH:mm:ss')),
                    expiredDate: new Date(format(values.expiredDate, 'yyyy-MM-dd HH:mm:ss')),
                };

                const response: ResponseSuccess<ProductPriceModel> = await createProductPrice(formattedValues);
                setProductPrices(prev => [...prev, response.data]);
                resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    })

    const addProductPrice = () => {
        formikProductPrice.submitForm();
    }

    const formikProductDetail = useFormik({
        initialValues: {
            productId: '',
            sizeId: '',
            colorId: '',
            quantity: 0,
            weight: 0,
        },
        validationSchema: validationProductDetailSchema,
        onSubmit: async (values: ProductDetailDto, { resetForm }) => {
            values.productId = id ?? '';
            setOpenBackdrop(true);
            try {
                const response: ResponseSuccess<ProductDetailModel> = await createProductDetail(values);

                setProductDetail(prev => {
                    const index: number = prev.findIndex(p => p.id === response.data.id);
                    if (index !== -1) {
                        prev[index] = response.data;
                    } else {
                        prev.push(response.data);
                    }
                    return prev;
                });
                resetForm();
                setOpenBackdrop(false);
                setOpenAlert(
                    {
                        show: true,
                        status: 'success',
                        message: 'Thành công'
                    }
                )
            } catch (error) {
                setOpenBackdrop(false);
                setOpenAlert(
                    {
                        show: true,
                        status: 'error',
                        message: 'Thất bại'
                    }
                )
                console.log(error);
            }
        },
    });

    // const deleteProductDetail = async (productDetailModel: ProductDetailModel) => {
    //     try {
    //         setOpenBackdrop(true);
    //         await removeProductDetail(Number(productDetailModel.id) || 0);
    //         setProductDetail(prev => {
    //             const index: number = prev.findIndex(p => p.id === productDetailModel.id);
    //             if (index !== -1) {
    //                 prev.splice(index, 1);
    //             }
    //             return prev;
    //         })
    //         setOpenBackdrop(false);
    //         setOpenAlert(
    //             {
    //                 show: true,
    //                 status: 'success',
    //                 message: 'Xóa thành công'
    //             }
    //         )
    //     } catch (error) {
    //         setOpenBackdrop(false);
    //         setOpenAlert(
    //             {
    //                 show: true,
    //                 status: 'error',
    //                 message: 'Xóa thất bại'
    //             }
    //         )
    //         console.log(error);
    //     }
    // }


    useEffect(() => {
        (async () => {
            try {
                const responseProvider: ResponseSuccess<ProviderModel[]> = await getAllProviders();
                setProviders(responseProvider.data);
                const responseCategory: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(responseCategory.data);
                console.log(responseCategory.data);
                const responseSizes: ResponseSuccess<SizeModel[]> = await getAllSizes();
                setSizes(responseSizes.data);
                const responseColors: ResponseSuccess<ColorModel[]> = await getAllColors();
                setColors(responseColors.data);
                const responseBrand: ResponseSuccess<BrandModel[]> = await getAllBrands();
                setBrands(responseBrand.data);
                const responseProductPrice: ResponseSuccess<ProductPriceModel[]> = await getAllProductPricesByProductId(id ?? '');
                setProductPrices(responseProductPrice.data.filter(price => new Date(price.expiredDate) > new Date()) ? responseProductPrice.data : []);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    // cleanup
    useEffect(() => {
        return () => {
            urls.forEach(url => {
                URL.revokeObjectURL(url);
            });
        }
    }, [urls]);



    const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setIamges([...images, ...Array.from(files)]);
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setUrls(prev => [...prev, ...imageUrls]);
        }
    }

    // const addProductDetail = () => {
    //     formikProductDetail.handleSubmit();
    // }
    const addProductDetail = async () => {
        const existingProductDetail = productDetail.find(
            (detail) =>
                detail.color.id === formikProductDetail.values.colorId &&
                detail.size.id === formikProductDetail.values.sizeId
        );

        if (existingProductDetail) {
            // Update the quantity of the existing product detail
            const updatedQuantity = formikProductDetail.values.quantity ?? 0;
            try {
                setOpenBackdrop(true);
                const response: ResponseSuccess<string> = await updateProductDetail(existingProductDetail.id!, { quantity: updatedQuantity });
                console.log("Dữ liệu update: ", response.data);
                setProductDetail((prev) =>
                    prev.map((detail) =>
                        detail.id === existingProductDetail.id
                            ? { ...detail, quantity: (detail.quantity ?? 0) + updatedQuantity }
                            : detail
                    )
                );
                setOpenBackdrop(false);
                setOpenAlert({
                    show: true,
                    status: 'success',
                    message: 'Cập nhật thành công',
                });
            } catch (error) {
                setOpenBackdrop(false);
                setOpenAlert({
                    show: true,
                    status: 'error',
                    message: 'Cập nhật thất bại',
                });
                console.log(error);
            }
        } else {
            // Create a new product detail
            formikProductDetail.handleSubmit();
        }
    };

    const handleSubmit = () => {
        formik.handleSubmit();
    }

    const removeImage = (index: number) => {
        URL.revokeObjectURL(urls[index]);
        setUrls(prev => {
            const newUrls = prev.filter(url => url !== prev[index]);
            return newUrls;
        });
        setIamges(prev => {
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

    const handleDeleteProductPrice = async (productPrice: ProductPriceModel) => {
        setOpenBackdrop(true);
        try {
            await deleteProductPrice(productPrice.id);
            setProductPrices(prev => prev.filter(p => p.id !== productPrice.id));
            setOpenBackdrop(false);
            setOpenAlert(
                {
                    show: true,
                    status: 'success',
                    message: 'Xóa thành công'
                }
            )
        } catch (error) {
            setOpenBackdrop(false);
            setOpenAlert(
                {
                    show: true,
                    status: 'error',
                    message: 'Xóa thất bại'
                }
            )
            console.log(error);
        }
    }

    const handleRowClick = (productDetail: ProductDetailModel) => {
        formikProductDetail.setValues({
            colorId: productDetail.color.id,
            sizeId: productDetail.size.id,
            quantity: productDetail.quantity,
            weight: productDetail.weight,
        });
    };

    return <Box
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
            Cập nhật sản phẩm
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
                gap: '35px'

            }}>
                <FormControl sx={{
                    flexBasis: '180px',
                    display: 'flex',
                    flexGrow: 1
                }}>
                    <InputLabel id="categoriesLabel">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="categoriesLabel"
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
                    flexBasis: '180px',
                    display: 'flex',
                    flexGrow: 1
                }}>
                    <InputLabel id="providersLabel">Nhà cung cấp</InputLabel>
                    <Select
                        labelId="providersLabel"
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
                    <InputLabel id="statusLabel">Trạng thái</InputLabel>
                    <Select
                        labelId="statusLabel"
                        label="Trạng thái"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >

                        <MenuItem value={Status.ACTIVE}>Hoạt động</MenuItem>
                        <MenuItem value={Status.INACTIVE}>Ngưng hoạt động</MenuItem>
                    </Select>
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
                    label="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    multiline
                    rows={4}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained" color="success" onClick={handleSubmit}>Cập nhật</Button>
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
                gap: '30px'

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
                    <InputLabel id="sizesIdLabel">Kích thước</InputLabel>
                    <Select
                        labelId="sizesIdLabel"
                        label="Kích thước"
                        name="sizeId"
                        value={formikProductDetail.values.sizeId}
                        onChange={formikProductDetail.handleChange}
                        onBlur={formikProductDetail.handleBlur}
                        error={formikProductDetail.touched.sizeId && Boolean(formikProductDetail.errors.sizeId)}
                    >
                        {sizes.map((size: SizeModel) => (
                            <MenuItem key={size.id} value={size.id}>{size.numberSize ?? size.textSize}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                p: 2, pl: 2, display: 'flex',
                flexWrap: 'wrap',
                gap: '15px'
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

            {/* Product detail */}
            <TableContainer component={Paper} sx={{ p: 2 }}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Màu sắc</TableCell>
                            <TableCell >Kích thước</TableCell>
                            <TableCell >Số lượng</TableCell>
                            <TableCell >Khối lượng</TableCell>
                            {/* <TableCell align="center">Thao tác</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productDetail.map((productDetailModel: ProductDetailModel, index: number) => (
                            <TableRow key={index} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}
                                onClick={() => handleRowClick(productDetailModel)}
                            >
                                <TableCell >{colors.filter(color => productDetailModel.color.id === color.id)[0]?.colorName}</TableCell>
                                <TableCell >{sizes.filter(size => productDetailModel.size.id === size.id)[0]?.numberSize ??
                                    sizes.filter(size => productDetailModel.size.id === size.id)[0]?.textSize
                                }</TableCell>
                                <TableCell>{productDetailModel.quantity}</TableCell>
                                <TableCell>{productDetailModel.weight}</TableCell>
                                {/* <TableCell align="center">
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                        deleteProductDetail(productDetailModel)
                                    }} >Xóa</Button>
                                </TableCell> */}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Box sx={{ mt: 3 }}>
            {/* Product price */}

            <Typography component="span" sx={{ flexGrow: 1, pl: 3 }}>
                Giảm giá
            </Typography>
            <Box sx={{
                p: 2, display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <TextField
                    sx={{ flex: 1 }}
                    label="Phần trăm giảm giá"
                    type="number"
                    name="discount"
                    value={formikProductPrice.values.discount}
                    onChange={formikProductPrice.handleChange}
                    onBlur={formikProductPrice.handleBlur}
                    error={formikProductPrice.touched.discount && Boolean(formikProductPrice.errors.discount)}
                    helperText={formikProductPrice.touched.discount && formikProductPrice.errors.discount}
                />
                <TextField
                    sx={{ flex: 1 }}
                    label="Ngày bắt đầu"
                    type="date"
                    name="issueDate"
                    value={formikProductPrice.values.issueDate}
                    onChange={formikProductPrice.handleChange}
                    onBlur={formikProductPrice.handleBlur}
                    error={formikProductPrice.touched.issueDate && Boolean(formikProductPrice.errors.issueDate)}
                    helperText={formikProductPrice.touched.issueDate && formikProductPrice.errors.issueDate ? String(formikProductPrice.errors.issueDate) : undefined}
                />
            </Box>
            <Box sx={{
                p: 2, display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <TextField
                    sx={{ flex: 1 }}
                    label="Ngày kết thúc"
                    type="date"
                    name="expiredDate"
                    value={formikProductPrice.values.expiredDate}
                    onChange={formikProductPrice.handleChange}
                    onBlur={formikProductPrice.handleBlur}
                    error={formikProductPrice.touched.expiredDate && Boolean(formikProductPrice.errors.expiredDate)}
                    helperText={formikProductPrice.touched.expiredDate && formikProductPrice.errors.expiredDate ? String(formikProductPrice.errors.expiredDate) : undefined}
                />
            </Box>
            <Box sx={{ p: 2, display: 'flex' }}>
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    label="Ghi chú"
                    name="note"
                    value={formikProductPrice.values.note}
                    onChange={formikProductPrice.handleChange}
                    onBlur={formikProductPrice.handleBlur}
                    multiline
                    rows={4}
                />
            </Box>
            <Box sx={{ p: 2, pl: 3 }}>
                <Button variant="contained" onClick={addProductPrice}>Thêm</Button>
            </Box>
            <TableContainer component={Paper} sx={{ p: 2 }}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Giảm giá</TableCell>
                            <TableCell >Ngày bắt đầu</TableCell>
                            <TableCell >Ngày hết hạn</TableCell>
                            <TableCell >Ghi chú</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productPrices && productPrices.map((productPrice: ProductPriceModel, index: number) => (
                            <TableRow key={index} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{`${productPrice.discount}%`}</TableCell>
                                <TableCell >{productPrice.issueDate.toString()}</TableCell>
                                <TableCell>{productPrice.expiredDate.toString()}</TableCell>
                                <TableCell>{productPrice.note}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => handleDeleteProductPrice(productPrice)}>Xóa</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
}
export default UpdateProduct;