import { Box, Button, Input, Typography } from "@mui/material";
import { useState } from "react";
import { CartItemModel } from "../../../models/cart.model";
import Grid from '@mui/material/Grid2';
import { ConvertPrice } from "../../../utils/convert.price";
import DialogFeedback from "../../../components/user/dialogs/DialogFeedback";
import { useNavigate } from "react-router-dom";

type Props = {
    item: CartItemModel,
    status: string
}

const OrderItemCard = ({ item, status }: Props) => {
    const [quantity] = useState<number>(item.quantity);
    const [openDialogFeedback, setOpenDialogFeedback] = useState(false);
    const [isEvaluate, setIsEvaluate] = useState<boolean>(localStorage.getItem(`isEvaluate_${item.productDetail.product?.id}`) === "true");
    const navigate = useNavigate();

    const handleCloseDialogFeedback = () => {
        setOpenDialogFeedback(false);
    }

    const handleSetIsEvaluate = (value: boolean) => {
        setIsEvaluate(value);
        localStorage.setItem(`isEvaluate_${item.productDetail.product?.id}`, value.toString());
    }

    return (
        <Box sx={{
            cursor: 'pointer',
            border: '1px solid #f0f0f0',
            mb: 1,
            minHeight: '98px',
            borderRadius: '4px',
            ":hover": {
                backgroundColor: '#f0f0f0',
            }
        }}
        onClick={() => navigate(`/products/${item.productDetail.product?.id}`)}
        >
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Grid size={1} >
                    <img
                        src={item.productDetail.product?.thumbnail ?? ""}
                        alt={item.productDetail.product?.productName ?? ""}
                        width={"100%"}
                        height={"100%"}
                        style={{ objectFit: 'contain', borderRadius: '4px' }}
                    />
                </Grid>
                <Grid size={3} >
                    <Typography sx={{
                        minHeight: '48px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        pl: 1, pr: 1
                    }}>{item.productDetail.product?.productName}</Typography>
                </Grid>
                <Grid size={2} >
                    <Box>
                        <Typography>Màu sắc: {item.productDetail.color.colorName}</Typography>
                    </Box>
                    <Box>
                        <Typography>Kích thước: {item.productDetail.size.numberSize ?? item.productDetail.size.textSize}</Typography>
                    </Box>
                </Grid>
                <Grid size={1} >
                    <Typography>{ConvertPrice(item.priceFinal)}</Typography>
                </Grid>
                <Grid size={2} >
                    <Input type="number" value={quantity} disabled />
                </Grid>
                <Grid size={2} >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography>{ConvertPrice((item.priceFinal ?? 0) * (item.quantity ?? 0))}</Typography>
                    </Box>
                </Grid>
                <Grid size={1} >
                    {status === "DELIVERED" || status === "RECEIVED" ? (
                        isEvaluate ? (
                            <Typography variant="subtitle1" color="success">
                                Đã đánh giá
                            </Typography>
                        ) : (
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setOpenDialogFeedback(true)}
                            >
                                Đánh giá
                            </Button>
                        )
                    ) : (
                        <Typography variant="body1" color="warning">
                            Chưa nhận hàng
                        </Typography>
                    )}
                    {
                        openDialogFeedback &&
                        <DialogFeedback
                            open={openDialogFeedback}
                            onClose={handleCloseDialogFeedback}
                            item={item}
                            isEvaluate={isEvaluate}
                            setIsEvaluate={handleSetIsEvaluate}
                        />
                    }

                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderItemCard;