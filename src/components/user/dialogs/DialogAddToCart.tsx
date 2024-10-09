import { Box, Button, Dialog, DialogContent, Typography, useMediaQuery, } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import QuantityProduct from "../product/QuantityProduct";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import { ColorModel } from "../../../models/color.model";
import { SizeModel } from "../../../models/size.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { ProductResponse } from "../../../dtos/responses/products/product.response";
import { getProductById } from "../../../services/product.service";
import { ProductModel } from "../../../models/product.model";
import { ProductDetailModel } from "../../../models/product-detail.model";

type Props = {
    open: boolean;
    handleClose: () => void;
    product: ProductUserResponse;
}


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
    );
};

const DiaLogAddToCart = ({ open, handleClose, product }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [selectedColor, setSelectedColor] = useState<ColorModel | null>(null);
    const [selectedSize, setSelectedSize] = useState<SizeModel | null>(null);
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [productResponse, setProductResponse] = useState<ProductModel>();
    const [productDetails, setProductDetails] = useState<ProductDetailModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductResponse> = await getProductById(product.product.id ?? '');

                setProductResponse(response.data.product);
                setProductDetails(response.data.productDetail ?? []);

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

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: "60%",
                    height: "auto",
                    maxWidth: "60%",
                    background: "white",
                }
            }}
        >
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: "40%", background: "gray", height: 400, resizeMode: 'contain' }}>  Hình ảnh
                        <img src="{product.product?.thumbnail}" alt="product" style={{ width: "100%", height: "100%" }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}> {/* Chi tiết*/}
                        <Typography
                            sx={{
                                fontWeight: '500',
                                minHeight: '32px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                                fontSize: 20
                            }}
                        >{product?.product?.productName}</Typography>
                        <Typography
                            sx={{
                                fontSize: 14
                            }}
                        >Thương hiệu: {product.product?.provider?.providerName}</Typography>
                        <Box sx={{
                            background: "#e4e4e4",
                            p: 1, display: 'flex',
                            gap: '25px',
                            alignItems: "center",
                            borderRadius: 1,
                        }}>
                            <Typography
                                sx={{
                                    fontSize: 18
                                }}
                            >Giá: </Typography>
                            <Typography variant="h5" sx={{ color: 'red', fontWeight: '600', }}>{product.priceFinal}</Typography>
                            <Typography variant="h5" sx={{ color: 'gray', fontWeight: '300', textDecoration: 'line-through' }}>{product.product?.price}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", minHeight: "36px", mb: 2, mt: 2 }}> {/* Màu sắc */}
                            <Typography sx={{ width: "100px", mr: 2 }}>Màu sắc: </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                                {colors.map((color: ColorModel) => (
                                    <SizeColorBox
                                        key={color.id}
                                        text={color.colorName ?? ''}
                                        onClick={() => setSelectedColor(color)}
                                        selected={selectedColor?.id === color.id}
                                    />
                                ))}
                            </Box>
                        </Box>
                        {/* Kích thước */}
                        <Box sx={{ display: "flex", flexDirection: "row", minHeight: "36px", mb: 2 }}>
                            <Typography sx={{ width: "100px", mr: 2 }}>Kích thước: </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                                {sizes.map((size: SizeModel) => (
                                    <SizeColorBox
                                        key={size.id}
                                        text={size.textSize ?? size.numberSize ?? ''}
                                        onClick={() => { setSelectedSize(size) }}
                                        selected={selectedSize?.id === size.id}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ width: "200px", mr: 2 }}>Số lượng trong kho: {availableQuantity}</Typography>
                        </Box>
                        <Box > {/* Hành động */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Typography sx={{ width: "100px", mr: 2 }}>Số lượng: </Typography>
                                <QuantityProduct quantity={buyQuantity} setQuantity={setBuyQuantityProp} maxValue={availableQuantity} />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                <Button sx={{
                                    width: "60%",
                                    ':hover': {
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        color: 'white',
                                    },
                                }} variant="contained">Thêm vào giỏ hàng
                                    <AddShoppingCartIcon sx={{ ml: 1 }} />
                                </Button>
                            </Box>
                        </Box>
                        <Link to={`/products/${product.product.id}`} 
                        style={{ textDecoration: 'none', color: 'blue', marginTop: '8px', display: 'block' }}>
                         Xem chi tiết sản phẩm</Link>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DiaLogAddToCart;