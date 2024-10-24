import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    Snackbar,
    Alert,
} from "@mui/material";
import { getUserFromLocalStorage } from "../../../services/user.service";
import { UserModel } from "../../../models/user.model";
import { useEffect, useState } from "react";
import { DistrictModel, ProvinceModel, WardModel } from "../../../models/addess.model";
import { getAllProvinces, getDistrictsByProvince, getWardsByDistrict } from "../../../services/address.service";
import { calculateShippingFee } from "../../../services/shipping.service";
import { DeliveryMethod } from "../../../dtos/requests/orders/shipping.dto";
import { ConvertPrice } from "../../../utils/convert.price";
import { CartItemModel } from "../../../models/cart.model";
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { VoucherModel, VoucherType } from "../../../models/voucher.model";
import { applyVoucherOrder, applyVoucherShip, getAllVouchers } from "../../../services/voucher.service";
import { applyVoucherOrderDto, applyVoucherShipDto } from "../../../dtos/requests/orders/voucher.dto";
import { PaymentMethod } from "../../../models/order.model";
import { createOrder } from "../../../services/order.service";
import { OrderDto } from "../../../dtos/requests/orders/order.dto";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart.reducer";
import { useFormik } from "formik";
import * as yup from 'yup';
import CustomTextField from "../../../components/common/TextFieldCustom";

const Payment = () => {

    const user: UserModel | null = getUserFromLocalStorage();
    const cart = useSelector((state: RootState) => state.cart.items);
    const [provinces, setProvinces] = useState<ProvinceModel[]>([]);
    const [districts, setDistricts] = useState<DistrictModel[]>([]);
    const [wards, setWards] = useState<WardModel[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedWard, setSelectedWard] = useState<string>('');
    const [fee, setFee] = useState<number>(0);
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(DeliveryMethod.ECONOMY);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const [vouchers, setVouchers] = useState<VoucherModel[]>([]);
    const [discountOrder, setDiscountOrder] = useState<number>(0);
    const [discountShip, setDiscountShip] = useState<number>(0);
    const [selectedVoucherForProduct, setSelectedVoucherForProduct] = useState<number>(0);
    const [selectedVoucherForDelivery, setSelectedVoucherForDelivery] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [openAlert, setOpenAlert] = useState({ show: false, status: '', message: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showAlert = (status: string, message: string) => {
        setOpenAlert({ show: true, status, message });
    };

    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.priceFinal ?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllProvinces();

                if (Array.isArray(response)) {
                    const provinces: ProvinceModel[] = response.map((provider: any) => ({
                        name: provider.name,
                        code: provider.code,
                        division_type: provider.division_type,
                        codename: provider.codename,
                        phone_code: provider.phone_code,
                        districts: provider.districts,
                    }));
                    setProvinces(provinces);
                } else {
                    console.error("Dữ liệu trả về không hợp lệ.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tỉnh thành: ", error);
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            (async () => {
                const districtsData = await getDistrictsByProvince(selectedProvince);
                setDistricts(districtsData);
            })();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            (async () => {
                const wardsData = await getWardsByDistrict(selectedDistrict);
                setWards(wardsData);
            })();
        }
    }, [selectedDistrict]);

    useEffect(() => {
        const calculateShipping = async () => {
            try {
                const selectedProvinceObj = provinces.find(prov => prov.code === Number(selectedProvince));
                const selectedDistrictObj = districts.find(dist => dist.code === Number(selectedDistrict));

                if (!selectedProvinceObj || !selectedDistrictObj) {
                    throw new Error('Tên tỉnh hoặc huyện không hợp lệ');
                }

                const shippingDto = {
                    pickProvince: 'Thành phố Hồ Chí Minh',
                    pickDistrict: 'Quận 8',
                    province: selectedProvinceObj.name,
                    district: selectedDistrictObj.name,
                    weight: 500,
                    deliveryMethod: deliveryMethod,
                };

                const fee = await calculateShippingFee(shippingDto);
                setFee(fee);
                formilCreateOrder.setFieldValue('deliveryFee', fee);
            } catch (error) {
                console.log("Tính phí vận chuyển lỗi: ", error);
            }
        };

        if (selectedProvince && selectedDistrict && deliveryMethod) {
            calculateShipping();
        }
    }, [selectedProvince, selectedDistrict, deliveryMethod]);

    useEffect(() => {
        (async () => {
            try {
                const responseVoucher: ResponseSuccess<VoucherModel[]> = await getAllVouchers();
                setVouchers(responseVoucher.data);
            } catch (error) {
                console.log("Lỗi : ", error);
            }
        })();
    }, []);

    const [open, setOpen] = useState(false);
    const handleClickOpenDiscount = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectVoucher = (voucher: VoucherModel) => {
        try {
            if (voucher.minOrderAmount > totalMoney) {
                setError("Đơn hàng không đủ điều kiện để sử dụng mã giảm giá.");
                return;
            }
            if (voucher.voucherType === VoucherType.FOR_PRODUCT) {
                setSelectedVoucherForProduct(voucher.id);
            }
            if (voucher.voucherType === VoucherType.FOR_DELIVERY) {
                setSelectedVoucherForDelivery(voucher.id);
            }
            handleCalDiscount(voucher);
            setOpen(false);
        } catch (error) {
            console.log("Lỗi khi chọn mã giảm giá: ", error);
        }
    }

    const handleCalDiscount = async (voucher: VoucherModel) => {
        try {
            const applyOrderDto: applyVoucherOrderDto = {
                originalAmount: totalMoney,
                voucherId: voucher.id,
            }

            const applyShipDto: applyVoucherShipDto = {
                deliveryFee: fee,
                originalAmount: totalMoney,
                voucherId: voucher.id,
            }

            if (voucher.voucherType === VoucherType.FOR_PRODUCT) {
                const responseVoucherOrder = await applyVoucherOrder(applyOrderDto);
                setDiscountOrder(Number(responseVoucherOrder.data));
            }


            if (voucher.voucherType === VoucherType.FOR_DELIVERY) {
                const responseVoucherShip = await applyVoucherShip(applyShipDto);
                setDiscountShip(Number(responseVoucherShip.data));
            }

        } catch (error) {
            console.log("Lỗi áp dụng mã khuyến mãi: ", error);
        }
    }

    const validationOrderSchema = yup.object({
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
        note: yup.string(),
        phoneNumber: yup.string()
            .required("Vui lòng nhập số điện thoại")
            .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
        buyerName: yup.string().required('Vui lòng nhập họ và tên'),
        deliveryMethod: yup.string().required('Vui lòng chọn phương thức vận chuyển'),
        deliveryFee: yup.number().required('Vui lòng chọn phí vận chuyển'),
        address: yup.object({
            city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
            district: yup.string().required('Vui lòng chọn quận/huyện'),
            street: yup.string().required('Vui lòng chọn phường/xã'),
        }),
        addressDetail: yup.string().required('Vui lòng nhập địa chỉ chi tiết'),
        productsOrderDtos: yup.array().of(yup.object({
            productDetailId: yup.string().required('Vui lòng chọn sản phẩm'),
            quantity: yup.number().required('Vui lòng nhập số lượng'),
        })),
        vouchers: yup.array().of(yup.number())

    });

    const formilCreateOrder = useFormik({
        initialValues: {
            email: user?.email ?? '',
            paymentMethod: paymentMethod,
            note: '',
            phoneNumber: user?.phone ?? '',
            buyerName: user?.username ?? '',
            deliveryMethod: deliveryMethod,
            deliveryFee: fee,
            address: {
                city: selectedProvince,
                district: selectedDistrict,
                street: selectedWard
            },
            addressDetail: '',
            productsOrderDtos: cart.map((cartItem: CartItemModel) => ({
                productDetailId: cartItem.productDetail.id ?? '',
                quantity: cartItem.quantity ?? 0,
            })),
            vouchers: [selectedVoucherForProduct, selectedVoucherForDelivery].filter(Boolean)
        },
        validationSchema: validationOrderSchema,
        onSubmit: async (values: OrderDto) => {
            try {
                await createOrder(values);
                showAlert('success', 'Đơn hàng đã được tạo thành công.');
                localStorage.removeItem('cart');
                dispatch(updateCartState());
                setTimeout(() => {
                    navigate('/cart');
                }, 2000);
            } catch (error) {
                setError("Mua hàng thất bại");
                showAlert('error', 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        },
    })

    const handleSubmitOrder1 = () => {

        formilCreateOrder.setFieldValue('address.city', selectedProvince);
        formilCreateOrder.setFieldValue('address.district', selectedDistrict);
        formilCreateOrder.setFieldValue('address.street', selectedWard);

        formilCreateOrder.handleSubmit();
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                {/* Shipping Information Section */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Thông tin giao hàng
                        </Typography>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField label="Người nhận" name="buyerName" type="text" variant="outlined" formik={formilCreateOrder} width="100%" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField label="Email" name="email" type="email" variant="outlined" formik={formilCreateOrder} width="100%" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField label="Số điện thoại" name="phoneNumber" type="text" variant="outlined" formik={formilCreateOrder} width="100%" />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField label="Ghi chú" name="note" type="text" variant="outlined" formik={formilCreateOrder} width="100%" multiline={true} />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField label="Địa chỉ" name="addressDetail" type="text" variant="outlined" formik={formilCreateOrder} width="100%" multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Thành phố</InputLabel>
                                        <Select
                                            value={selectedProvince}
                                            onChange={(e) => setSelectedProvince(e.target.value as string)}
                                        >
                                            {provinces.map((prov) => (
                                                <MenuItem key={prov.code} value={prov.code}>
                                                    {prov.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Quận/Huyện</InputLabel>
                                        <Select
                                            label="Quận/Huyện"
                                            value={selectedDistrict}
                                            onChange={(e) => setSelectedDistrict(e.target.value as string)}
                                        >
                                            {districts.map((district) => (
                                                <MenuItem key={district.code} value={district.code}>
                                                    {district.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Phường/Xã</InputLabel>
                                        <Select label="Phường/Xã"
                                            value={selectedWard}
                                            onChange={(e) => setSelectedWard(e.target.value as string)}
                                        >
                                            {wards.map((ward) => (
                                                <MenuItem key={ward.code} value={ward.code}>
                                                    {ward.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Phương thức vận chuyển
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={formilCreateOrder.values.deliveryMethod}
                                onChange={(e) => {
                                    formilCreateOrder.setFieldValue('deliveryMethod', e.target.value);
                                }}
                            >
                                <FormControlLabel
                                    value={DeliveryMethod.ECONOMY}
                                    control={<Radio />}
                                    label="Giao hàng tiêu chuẩn"
                                    onChange={() => setDeliveryMethod(DeliveryMethod.ECONOMY)}
                                />
                                <FormControlLabel
                                    value={DeliveryMethod.EXPRESS}
                                    control={<Radio />}
                                    label="Giao hàng nhanh"
                                    onChange={() => setDeliveryMethod(DeliveryMethod.EXPRESS)}
                                />
                            </RadioGroup>
                        </FormControl>

                    </Paper>

                    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Phương thức thanh toán
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={formilCreateOrder.values.paymentMethod}
                                onChange={(e) => {
                                    formilCreateOrder.setFieldValue('paymentMethod', e.target.value);
                                }}
                            >
                                <FormControlLabel
                                    value={PaymentMethod.COD}
                                    control={<Radio />}
                                    label="Thanh toán khi giao hàng (COD)"
                                    onChange={() => setPaymentMethod(PaymentMethod.COD)}
                                />
                                <FormControlLabel
                                    value={PaymentMethod.CC}
                                    control={<Radio />}
                                    label="Thẻ ATM/Visa/MasterCard/JCBQR Pay qua ứng dụng VNPAY"
                                    onChange={() => setPaymentMethod(PaymentMethod.CC)}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>
                {/* Order Summary Section */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Tóm tắt đơn hàng
                        </Typography>
                        <List>
                            <ListItem sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                {cart.map((cartItem: CartItemModel, index: number) => (
                                    <ListItemText key={index}
                                        sx={{
                                            width: '100%',
                                            borderBottom: '1px solid #e0e0e0',
                                            pb: '16px',
                                        }}
                                    >
                                        <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
                                            {/* Cột chứa hình ảnh sản phẩm */}
                                            <Grid item xs={3}>
                                                <Box display="flex" justifyContent="center">
                                                    <img
                                                        src={cartItem.productDetail.product?.thumbnail}
                                                        alt={cartItem.productDetail.product?.productName}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} // Hình ảnh căn giữa và có góc bo tròn
                                                    />
                                                </Box>
                                            </Grid>

                                            {/* Cột chứa thông tin sản phẩm */}
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {cartItem.productDetail.product?.productName}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Số lượng: {cartItem.quantity}
                                                </Typography>
                                            </Grid>

                                            {/* Cột chứa giá hoặc các thông tin khác */}
                                            <Grid item xs={3} display="flex" justifyContent="flex-end">
                                                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                                    {ConvertPrice((cartItem.quantity ?? 0) * (cartItem.priceFinal ?? 0))}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItemText>
                                ))}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Button variant="outlined" sx={{ ml: 2 }} onClick={handleClickOpenDiscount}>
                                    Mã giảm giá
                                </Button>
                                <Dialog onClose={handleClose} open={open} sx={{ '& .MuiDialog-paper': { width: '30%' } }} >
                                    <DialogTitle>Danh sách mã giảm giá</DialogTitle>
                                    <List sx={{ pt: 0 }} >
                                        {vouchers.map((item, index) => (
                                            <ListItem component="div" key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontSize: 16 }}>{item.name}</Typography>
                                                    <Typography sx={{ fontSize: 12 }}>Giảm tối đa {ConvertPrice(item.maxDiscountAmount)}</Typography>
                                                    <Typography sx={{ fontSize: 12 }}>Cho đơn tối thiểu {ConvertPrice(item.minOrderAmount)}</Typography>
                                                </Box>
                                                <Button variant="outlined" color="primary" onClick={() => handleSelectVoucher(item)}>
                                                    Áp dụng
                                                </Button>
                                            </ListItem>
                                        ))}
                                        {error && <Typography color="error">{error}</Typography>}
                                    </List>
                                </Dialog>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Tạm tính" />
                                <Typography variant="subtitle1">{ConvertPrice(totalMoney)}</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Phí vận chuyển" />
                                <Typography variant="subtitle1">{ConvertPrice(fee)}</Typography>
                            </ListItem>
                            <ListItem sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                {discountOrder > 0 && (
                                    <>
                                        <Box sx={{ width: "100%", display: 'flex' }}>
                                            <ListItemText primary="Giảm giá đơn hàng" />
                                            <Typography variant="subtitle1">-{ConvertPrice(discountOrder)}</Typography>
                                        </Box>
                                    </>
                                )}
                                {discountShip > 0 && (
                                    <>
                                        <Box sx={{ width: "100%", display: 'flex' }}>
                                            <ListItemText primary="Giảm giá vận chuyển" />
                                            <Typography variant="subtitle1">-{ConvertPrice(discountShip)}</Typography>
                                        </Box>
                                    </>
                                )}
                            </ListItem>

                            <Divider />
                            <ListItem>
                                <ListItemText primary="Tổng cộng" />
                                <Typography variant="h6" color="primary">
                                    {(ConvertPrice(totalMoney + fee - discountOrder - discountShip))}
                                </Typography>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Button variant="contained" color="warning" onClick={() => { navigate('/') }}>
                            Quay về giỏ hàng
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            onClick={handleSubmitOrder1}
                        >
                            Hoàn tất đơn hàng
                        </Button>
                    </Box>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openAlert.show}
                        autoHideDuration={3000}
                        onClose={() => setOpenAlert({ show: false, status: '', message: '' })}
                    >
                        <Alert severity={openAlert.status === 'success' ? 'success' : 'error'} variant="filled">
                            {openAlert.message}
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>

        </Container>
    );
};

export default Payment;
