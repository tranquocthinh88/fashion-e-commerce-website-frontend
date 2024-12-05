import { Avatar, Box, Button, Container, Pagination, Rating, Stack, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import { ProductModel } from "../../../models/product.model";
import { useNavigate, useParams } from "react-router-dom";
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
import { getAllCommentById } from "../../../services/comment.service";
import { CommentResponse } from "../../../dtos/responses/user/comment.response";
import { connect, disconnect, subscribe } from "../../../configs/websocket";
import ProductCard from "../../../components/user/product/ProductCard";
import CustomArrow from "../../../components/user/customs/CustomArrow ";
import Slider from "react-slick";
import { isLoginAccount } from "../../../services/user.service";

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
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageNo, setPageNo] = useState<number>(1);
    const [relatedProducts, SetRelatedProducts] = useState<ProductUserResponse[]>([]);
    const navigate = useNavigate();
    const login = isLoginAccount();

    const isMobile = useMediaQuery('(max-width:600px)');

    const settings = {
        dots: true, // Hiển thị nút chỉ báo trang
        infinite: false, // Không cuộn vô hạn
        speed: 500, // Tốc độ chuyển đổi slide
        slidesToShow: isMobile ? 1 : 5, // Số lượng sản phẩm trên mỗi trang
        slidesToScroll: isMobile ? 1 : 5, // Số sản phẩm khi cuộn mỗi lần
        prevArrow: <CustomArrow type="prev" />,
        nextArrow: <CustomArrow type="next" />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

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

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNo(value);
    };
    useEffect(() => {
        const fetchComments = async () => {
            const response = await getAllCommentById(pageNo, 10, id);
            setComments(response.data.data);
            setTotalPage(response.data.totalPage);
            setPageNo(response.data.pageNo);
        };

        fetchComments();

        const onConnected = () => {
            console.log("Connected to WebSocket server for product detail");
            subscribe(`/topic/product/${id}`, onMessageReceived);
        };

        const onError = () => {
            console.log("Error connecting to WebSocket server");
        };

        const onMessageReceived = (message: any) => {
            const newComment = JSON.parse(message.body);
            setComments((prevComments) => [newComment, ...prevComments]);
            // Update productUserResponse if needed
            setProductUserResponse((prevResponse) => {
                if (!prevResponse) return prevResponse;
                return {
                    ...prevResponse,
                    product: {
                        ...prevResponse.product,
                        numberOfRating: (prevResponse.product.numberOfRating ?? 0) + 1,
                        avgRating: Number((calculateNewAvgRating(prevResponse.product.avgRating ?? 0, newComment.comment.rating, prevResponse.product.numberOfRating ?? 0)).toFixed(1))
                    }
                };
            });
        };

        connect(onConnected, onError);

        return () => {
            disconnect();
        };
    }, [id, pageNo]);

    const calculateNewAvgRating = (currentAvg: number, newRating: number, totalRatings: number) => {
        return ((currentAvg * totalRatings) + newRating) / (totalRatings + 1);
    };

    useEffect(() => {
        if (productResponse?.category?.categoryName) {
            (async () => {
                try {
                    const response: ResponseSuccess<PageResponse<ProductUserResponse[]>>
                        = await getProductsForUser(1, 10, [{
                            field: 'category.categoryName',
                            operator: ':',
                            value: productResponse.category?.categoryName ?? '',
                        }], []);
                    console.log("Sản phẩm liên quan: ", response.data.data);
                    console.log("Sản phẩm hiện tại: ", productResponse);

                    SetRelatedProducts(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [productResponse?.category?.categoryName]);

    const handleBuyNow = () => {
        if (login) {
            const productDetail = getProductDetailByColorIdAndSizeId();
            if (!productDetail) {
                alert('Vui lòng chọn màu sắc và kích thước trước khi mua hàng');
                return;
            }
            addProductToCart();
            navigate("/payment", { state: { selectedItems: [{ productDetail: productDetail, quantity: buyQuantity, priceFinal: productUserResponse?.priceFinal ?? 0 }] } });
        }
        else {
            navigate('/login', { state: { from: `/products/${id}` } });
        }
    }

    return (
        <Container >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    mt: 3
                }}
            >
                {/* <Box sx={{width: isMobile ? '250%' : '100%'}}> */}
                <ListImage images={productImages} />
                {/* </Box> */}
                <Box sx={{ width: isMobile ? '100%' : '60%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: '700' }}>{productResponse?.productName}</Typography>
                    <Typography variant="h6">{productResponse?.brand?.brandName}</Typography>
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
                    {productUserResponse ? (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                            <Rating name="half-rating-read" value={productUserResponse.product.avgRating ?? 0} precision={0.5} readOnly />
                            <Typography>{productUserResponse.product.numberOfRating ? `${productUserResponse.product.numberOfRating} đánh giá` : 'Chưa có đánh giá'}</Typography>
                        </Box>
                    ) : (
                        <Typography>Đang tải đánh giá...</Typography>
                    )}
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
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button
                            variant="contained"
                            sx={{
                                width: 'auto',
                                height: '48px',
                                fontSize: '12px',
                            }}
                            color="warning"
                            onClick={addProductToCart}
                        > <LocalMallIcon /> Thêm vào giỏ hàng</Button>
                        <Button
                            variant="contained"
                            sx={{
                                width: 'auto',
                                height: '48px',
                                fontSize: '12px',
                            }}
                            color="success"
                            onClick={handleBuyNow}
                        > <ShoppingCartIcon />Mua ngay</Button>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Typography variant="h6" sx={{ mt: 2 }}>MÔ TẢ SẢN PHẨM</Typography>
                    <Box>
                        <Typography>Tổng số sản phẩm trong kho: {productResponse?.totalQuantity}</Typography>
                        <Typography sx={{ whiteSpace: 'pre-line' }}>{productResponse?.description}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6">ĐÁNH GIÁ SẢN PHẨM</Typography>
                    <Box sx={{ borderBottom: '1px solid #cccccc' }}>
                        <Typography>Tổng số đánh giá: {productUserResponse?.product.numberOfRating}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography>Đánh giá trung bình: {productUserResponse?.product.avgRating ?? '0'}/5</Typography>
                            {productUserResponse?.product.avgRating ? (
                                <Rating
                                    name="half-rating-read"
                                    value={productUserResponse.product.avgRating}
                                    precision={0.5}
                                    readOnly
                                />
                            ) : (
                                <Typography>Chưa có đánh giá</Typography>
                            )}
                        </Box>
                    </Box>
                    {comments.map((comment: CommentResponse, commentIndex) => (
                        <Box key={comment.comment.id ?? commentIndex} sx={{ display: 'flex', borderBottom: '1px solid #cccccc', p: '5px 15px' }}>
                            <Box sx={{ mr: 2 }}>
                                <Avatar alt="" src={comment.comment.user.avatarUrl} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <Typography sx={{ fontSize: '14px' }}>{comment.comment.user.username}</Typography>
                                    <Typography sx={{ fontSize: '14px' }}>
                                        {new Date(comment.comment.commentDate ?? '').toLocaleDateString()} {new Date(comment.comment.commentDate ?? '').toLocaleTimeString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Rating size="small" name="read-only" value={comment.comment.rating} readOnly />
                                </Box>
                                <Typography>{comment.comment.textContent}</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    {comment.commentMedia?.map((media, mediaIndex) => (
                                        <Box key={media.id ?? mediaIndex}>
                                            {media.mediaType === 'IMAGE' ? (
                                                <img src={media.path} alt="Comment Image" style={{ width: 150, height: 150, border: '1px solid #cccccc', marginLeft: 1 }} />
                                            ) : (
                                                <video src={media.path} style={{ width: 150, height: 150, border: '1px solid #cccccc', marginLeft: 1 }} controls />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Stack spacing={2}>
                            <Pagination count={totalPage} page={pageNo} variant="outlined" shape="rounded" onChange={handleChange} />
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="h6">SẢN PHẨM LIÊN QUAN</Typography>
                    <Slider {...settings}>
                        {relatedProducts.map((relatedProduct: ProductUserResponse) => (
                            <Box key={relatedProduct.product.id} sx={{ width: '100%', maxWidth: '250px', margin: '0 10px' }}>
                                <ProductCard product={relatedProduct} />
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Box>
        </Container>
    )
}

export default ProductDetail;
