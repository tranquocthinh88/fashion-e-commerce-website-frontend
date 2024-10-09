import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Slide from "../../../components/Slide";
import ProductCard from "../../../components/user/product/ProductCard";
import { getProductsDiscount, getProductsNewCreatedAt, getProductsSold } from "../../../services/product.service";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import CustomArrow from "../../../components/user/customs/CustomArrow ";

const Home = () => {
    const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);
    const [productNews, setProductNews] = useState<ProductUserResponse[]>([]);
    const [productSolds, setProductSolds] = useState<ProductUserResponse[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    const settings = {
        dots: true, // Hiển thị nút chỉ báo trang
        infinite: false, // Không cuộn vô hạn
        speed: 500, // Tốc độ chuyển đổi slide
        slidesToShow: 5, // Số lượng sản phẩm trên mỗi trang
        slidesToScroll: 5, // Số sản phẩm khi cuộn mỗi lần
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
        const interval = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await getProductsDiscount(1, 40, [], [])
                setProductSales(response.data.data);
                const response1 = await getProductsNewCreatedAt(1, 20, [], [])
                setProductNews(response1.data.data);
                const response2 = await getProductsSold(1, 20, [], [])
                setProductSolds(response2.data.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    return (
        <Box>
            <Slide />
            <Box sx={{
                width: "100%",
                background: "white",
                pt: 2,
                pb: 2,
            }}>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm khuyến mãi</Typography>
                    <Container>
                        <Slider {...settings}>
                            {productSales.map((productSale: ProductUserResponse) => (
                                <Box key={productSale.product.id} sx={{ width: '100%', maxWidth: '250px', margin: '0 10px' }}>
                                    <ProductCard product={productSale} />
                                </Box>
                            ))}
                        </Slider>
                    </Container>
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                background: "white",
                pt: 2,
                pb: 2,
            }}>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm bán chạy</Typography>
                    <Container>
                    <Slider {...settings}> 
                            {productSolds.map((productSold: ProductUserResponse) => (
                                <Box key={productSold.product.id} sx={{ width: '100%', maxWidth: '250px', margin: '0 10px', textAlign: 'left' }}>
                                    <ProductCard product={productSold} />
                                </Box>
                            ))}
                        </Slider>
                    </Container>
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                background: "white",
                pt: 2,
                pb: 2,
            }}>
                <Box sx={{
                    background: "rgba(255, 0, 188, 0.07)",
                    borderRadius: 4,
                }}>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 1,
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Sản phẩm mới về</Typography>
                    <Container>
                    <Slider {...settings}>
                            {productNews.map((productNew: ProductUserResponse) => (
                                <Box key={productNew.product.id} sx={{ width: '100%', maxWidth: '250px', margin: '0 10px' }}>
                                    <ProductCard product={productNew} />
                                </Box>
                            ))}
                        </Slider>
                    </Container>
                </Box>
            </Box>
        </Box >
    );
}
export default Home;