import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { Button, Rating, TextField, Typography } from '@mui/material';
import { CartItemModel } from '../../../models/cart.model';
import { useFormik } from "formik";
import * as yup from 'yup';
import { CommentDto } from '../../../dtos/requests/comment.dto';
import { createComment } from '../../../services/comment.service';
import { getUserFromLocalStorage } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';

type Props = {
    open: boolean;
    onClose: () => void;
    item: CartItemModel;
    isEvaluate: boolean;
    setIsEvaluate: (value: boolean) => void;
}

const validationFeedbackSchema = yup.object({
    rating: yup.number().required('Vui lòng chọn số sao đánh giá'),
    textContent: yup.string(),
});


export const DialogFeedback = ({ open, onClose, item, setIsEvaluate }: Props) => {

    const [medias, setMedias] = React.useState<File[]>([]);
    const user: UserModel | null = getUserFromLocalStorage();

    const formik = useFormik({
        initialValues: {
            email: user?.email || '',
            content: '',
            rating: 0,
            productId: item.productDetail.product?.id || '',
            medias: [],
        },
        validationSchema: validationFeedbackSchema,
        onSubmit: async (values: CommentDto, { resetForm }) => {
            const formData = new FormData();
            console.log("Values: ", values);

            formData.append('email', values.email);
            formData.append('content', values.content);
            formData.append('rating', values.rating ? values.rating.toString() : '0');
            formData.append('productId', values.productId);

            medias.forEach((file) => {
                formData.append(`media`, file, file.name);
            });

            (values.medias || []).forEach((file) => {
                formData.append('media', file, file.name);
            });

            try {
                await createComment(formData);
                resetForm();
                setMedias([]);
                formik.setFieldValue('medias', []);
                setIsEvaluate(true);
                onClose();
            } catch (error) {
                console.log(error);
            }
        },
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        formik.setFieldValue('medias', files); 
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width: "60%",
                        minHeight: "60%",
                        maxWidth: "60%",
                        background: "white",
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h5' fontWeight={500}>Đánh giá sản phẩm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.productDetail.product?.thumbnail} alt={item.productDetail.product?.productName}
                            style={{ width: "60px", height: "60px" }}
                        />
                        <Box sx={{ pl: 1 }}>
                            <Typography>{item.productDetail.product?.productName}</Typography>
                            <Typography>Loại sản phẩm: {item.productDetail.product?.category?.categoryName}</Typography>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Typography>Bạn thấy chất lượng sản phẩm thế nào?</Typography>
                        <Rating
                            name="rating"
                            value={formik.values.rating}
                            onChange={(_, newValue) => {
                                formik.setFieldValue("rating", newValue);
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="content"
                            label="Đánh giá của bạn"
                            multiline
                            rows={4}
                            placeholder="Viết đánh giá tại đây..."
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            sx={{ width: "100%", mb: 2 }}
                            error={formik.touched.content && Boolean(formik.errors.content)}
                            helperText={formik.touched.content && formik.errors.content}
                        />
                        <Typography>Tải lên hình ảnh hoặc video</Typography>
                        <input type="file" multiple onChange={handleFileChange} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="warning" onClick={onClose}>Hủy</Button>
                        <Button variant="contained" color="primary" onClick={formik.submitForm}>Gửi đánh giá</Button>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}

export default DialogFeedback;