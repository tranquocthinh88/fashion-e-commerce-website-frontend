import { Box, Button, Container, Rating, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { ProductModel } from "../../../models/product.model";
import { useParams } from "react-router-dom";
import { ProductImageModel } from "../../../models/product-image.model";
import { ProductDetailModel } from "../../../models/product-detail.model";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { ColorModel } from "../../../models/color.model";
import { SizeModel } from "../../../models/size.model";
import { ProductResponse } from "../../../dtos/responses/products/product.response";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import QuantityProduct from "../../../components/user/product/QuantityProduct";
import { getProductById, getProductsForUser } from "../../../services/product.service";
import ListImage from "../../../components/user/list/list-image";
import { PageResponse } from "../../../dtos/responses/page.response";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart.reducer";
import { addToCartLocalStorage } from "../../../utils/cart.handle";

const SizeColorBox = ({ text, onClick, selected }: { text: string | number, onClick(): void, selected: boolean }) => {
    return (
        <Box sx={{
            background: selected ? '#0000' : '#cccc',
            color: 'ffff',
            borderRadius: 1,
            pl: 1,
            pr: 1,
            border: selected ? '2px solid red' : '2px solid transparent',
            ':hover': {
                cursor: 'pointer',
                background: '#0000',
                borderColor: 'red',
            },
        }}
            onClick={onClick}
        >
            <Typography>{text}</Typography>
        </Box>
    )
}

const ProductDetail = () => {
    const { id } = useParams();
    const [productResponse, setProductResponse] = useState<ProductModel>();
    const [productImages, setProductImages] = useState<ProductImageModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailModel[]>([]);
    const [productUserResponse, setProductUserResponse] = useState<ProductUserResponse>();
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [selectedColor, setSelectedColor] = useState<ColorModel | null>(null);
    const [selectedSize, setSelectedSize] = useState<SizeModel | null>(null);
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductResponse> = await getProductById(id ?? '');

                setProductResponse(response.data.product);
                setProductImages(response.data.productImage ?? []);
                setProductDetails(response.data.productDetail ?? []);

                const responseProductById: ResponseSuccess<PageResponse<ProductUserResponse[]>> = await getProductsForUser(1, 1, [
                    {
                        field: 'id',
                        operator: '-',
                        value: id || '',
                    }
                ]);

                setProductUserResponse(responseProductById.data.data[0]);

                console.log(responseProductById.data.data);


                let uniqueColors: ColorModel[] = [];
                response.data.productDetail?.forEach((productDetail: ProductDetailModel) => {
                    const filter: ColorModel[] = uniqueColors.filter(
                        (color: ColorModel) => color.id === productDetail.color?.id);
                    if (filter.length <= 0) {
                        uniqueColors.push(productDetail.color)
                    }
                });
                setColors(uniqueColors);

                let uniqueSizes: SizeModel[] = [];
                response.data.productDetail?.forEach((productDetail: ProductDetailModel) => {
                    const filter: SizeModel[] = uniqueSizes.filter(
                        (size: SizeModel) => size.id === productDetail.size?.id);
                    if (filter.length <= 0) {
                        uniqueSizes.push(productDetail.size)
                    }
                })
                setSizes(uniqueSizes);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    useEffect(() => {
        if (selectedColor && selectedSize) {
            const detail = getProductDetailByColorIdAndSizeId();
            productResponse?.totalQuantity && setAvailableQuantity(detail?.quantity ?? 0)
        }
        else {
            productResponse?.totalQuantity && setAvailableQuantity(productResponse.totalQuantity)
        }
    }, [selectedColor, selectedSize, productDetails])

    const setBuyQuantityProp = (value: number) => {
        setBuyQuantity(value);
    }

    const getProductDetailByColorIdAndSizeId = () => {
        const detailFilter = productDetails.filter((productDetail: ProductDetailModel) => {
            return productDetail.color.id === selectedColor?.id && productDetail.size.id === selectedSize?.id;
        });

        if (detailFilter.length > 0) {
            return detailFilter[0];
        }
    }

    const addProductToCart = () => {
        if (!selectedColor || !selectedSize) {
            alert('Vui lòng chọn màu sắc và kích thước');
            return;
        }
        if (buyQuantity > availableQuantity) {
            alert('Số lượng sản phẩm không đủ');
            return;
        }
        const productDetail = getProductDetailByColorIdAndSizeId();
        if (productDetail) {
            addToCartLocalStorage({
                productDetail: productDetail,
                quantity: buyQuantity,
                priceFinal: productUserResponse?.priceFinal ?? 0 
            })
            setAvailableQuantity(availableQuantity - buyQuantity);
            setBuyQuantity(1);
        }
        dispatch(updateCartState())
    }

    return (
        <Container >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                }}
            >
                <ListImage images={productImages} />

                <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: '700' }}>{productResponse?.productName}</Typography>
                    <Typography variant="h6">{productResponse?.provider?.providerName}</Typography>
                    <Box sx={{ display: 'flex', gap: '25px' }}>
                        {
                            productUserResponse?.priceFinal == productUserResponse?.product.price ?
                                <>
                                    <Typography variant="h5" sx={{ color: 'red', fontWeight: '700', }}>{productResponse?.price}</Typography>
                                </>
                                : <>
                                    <Typography variant="h5" sx={{ color: 'red', fontWeight: '700', }}>{productUserResponse?.priceFinal}</Typography>
                                    <Typography variant="h5"
                                        sx={{ color: 'gray', fontWeight: '400', textDecoration: 'line-through' }}>
                                        {productUserResponse?.product?.price}
                                    </Typography>
                                </>
                        }



                    </Box>
                    {productResponse?.avgRating ? <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}> <Rating name="read-only" value={productResponse?.avgRating} readOnly />
                        <Typography>{productResponse.numberOfRating + ' đánh giá'}</Typography>
                    </Box> :
                        <Typography>Chưa có đánh giá</Typography>}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderTop: 2, pt: 2, borderColor: '#f6f6f6' }}>
                        <Box sx={{ display: 'flex', gap: 1, }}>
                            <Typography >Chọn màu sắc: </Typography>
                            {colors.map((color: ColorModel) => (
                                <SizeColorBox
                                    key={color.id}
                                    text={color.colorName ?? ''}
                                    onClick={() => setSelectedColor(color)}
                                    selected={selectedColor?.id === color.id}
                                />
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography >Chọn kích thước: </Typography>

                            {sizes.map((size: SizeModel) => (
                                <SizeColorBox
                                    key={size.id}
                                    text={size.textSize ?? size.numberSize ?? ''}
                                    onClick={() => { setSelectedSize(size) }}
                                    selected={selectedSize?.id === size.id}
                                />
                            ))}
                        </Box>
                        <Typography>Số lượng trong kho: {availableQuantity}</Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Typography >Chọn số lượng: </Typography>
                            <QuantityProduct quantity={buyQuantity} setQuantity={setBuyQuantityProp} maxValue={availableQuantity} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                width: 'auto',
                                height: '48px',
                            }}
                            color="warning"
                            onClick={addProductToCart}
                        > <LocalMallIcon sx={{ mr: 1 }} /> Thêm vào giỏ hàng</Button>
                        <Button
                            variant="contained"
                            sx={{
                                width: 'auto',
                                height: '48px',
                            }}
                            color="success"
                        > <ShoppingCartIcon sx={{ mr: 1 }} />Mua ngay</Button>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Typography variant="h6">MÔ TẢ SẢN PHẨM</Typography>
                    <Box>
                        <Typography>Tổng số sản phẩm trong kho: {productResponse?.totalQuantity}</Typography>
                        <Typography>{productResponse?.description}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6">ĐÁNH GIÁ SẢN PHẨM</Typography>
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                </Box>
            </Box>
            <Box>

            </Box>
        </Container>
    )
}

export default ProductDetail;


