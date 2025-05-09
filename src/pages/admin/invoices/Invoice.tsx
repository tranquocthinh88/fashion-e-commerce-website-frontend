import { Box, FormControl, MenuItem, Select, TextField, InputLabel, Stack, Pagination, Button, Dialog, DialogTitle, DialogContent, Typography, Divider, DialogActions } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { bodyAdminColor, navbarHover } from "../../../theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { ConvertPrice } from "../../../utils/convert.price";
import { PageResponse } from "../../../dtos/responses/page.response";
import { useLocation, useNavigate } from "react-router-dom";
import { InvoiceModel } from "../../../models/invoice.model";
import { getInvoicesForAdmin } from "../../../services/invoice.service";
import { OrderDetailsModel } from "../../../models/order.details.model";
import { getOrderDetailsByOrderId } from "../../../services/order.service";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo from '../../../assets/logo.png';

const Invoice = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<InvoiceModel[]>([]);
    const [sort, setSort] = useState<string>("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [totalPage, setTotalPage] = useState(1);
    const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
    const [pageNoState, setPageNoState] = useState(pageNo);
    const [status, setStatus] = useState<string>("");
    const [orderDateFrom, setOrderDateFrom] = useState<Dayjs | null>(null);
    const [orderDateTo, setOrderDateTo] = useState<Dayjs | null>(null);
    const [search, setSearch] = useState<string>("");
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<InvoiceModel | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderDetailsModel[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const searchParams: Array<{ field: string; operator: string; value: string }> = [];
            if (orderDateFrom) {
                searchParams.push({
                    field: 'invoiceDate',
                    operator: '>=',
                    value: orderDateFrom.format('YYYY-MM-DD'),
                });
            }

            if (orderDateTo) {
                searchParams.push({
                    field: 'invoiceDate',
                    operator: '<=',
                    value: orderDateTo.format('YYYY-MM-DD'),
                });
            }

            if (status) {
                searchParams.push({
                    field: 'status',
                    operator: '-',
                    value: status,
                });
            }

            if (search) {
                searchParams.push({
                    field: 'buyerName',
                    operator: ':',
                    value: search,
                });
            }

            console.log("Search params: ", searchParams);
            const response: ResponseSuccess<PageResponse<InvoiceModel[]>> = await getInvoicesForAdmin(pageNoState, 10, searchParams,
                sort ? [{ field: sort.split(':')[0], order: sort.split(':')[1] }] : []);

            setOrders(response.data.data);
            setTotalPage(response.data.totalPage);
        };
        fetchProducts();
        const queryParams = new URLSearchParams();

        queryParams.append("pageNo", pageNoState.toString());
        if (sort) queryParams.append("sort", sort);
        if (search) queryParams.append("search", search);
        if (status) queryParams.append("status", status);
        if (orderDateFrom) queryParams.append("orderDateFrom", orderDateFrom.format('YYYY-MM-DD'));
        if (orderDateTo) queryParams.append("orderDateTo", orderDateTo.format('YYYY-MM-DD'));

        navigate(`?${queryParams.toString()}`, { replace: true });
    }, [search, status, orderDateFrom, orderDateTo, sort, pageNoState]);


    useEffect(() => {
        handleNavigate(pageNoState);
    }, [pageNoState]);


    const handleNavigate = (pageNoState: number) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("pageNo", pageNoState.toString());
        navigate(`?${queryParams.toString()}`);
    };



    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNoState(value);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
        const sort = queryParams.get("sort") || "";
        const search = queryParams.get("search") || "";
        const status = queryParams.get("status") || "";
        const orderDateFrom = queryParams.get("orderDateFrom") ? dayjs(queryParams.get("orderDateFrom")) : null;
        const orderDateTo = queryParams.get("orderDateTo") ? dayjs(queryParams.get("orderDateTo")) : null;

        setPageNoState(pageNo);
        setSort(sort);
        setSearch(search);
        setStatus(status);
        setOrderDateFrom(orderDateFrom);
        setOrderDateTo(orderDateTo);
    }, [location.search]);

    const fetchOrderDetails = async (orderId: string) => {
        try {
            const response = await getOrderDetailsByOrderId(orderId); // Gọi API
            setOrderDetails(response.data); // Lưu thông tin chi tiết vào state
            const selected = orders.find(order => order.order.id.toString() === orderId) || null;
            setSelectedOrder(selected);
            setOpenOrderDialog(true);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết hóa đơn:", error);
        }
    };

    const handleExportPDF = async () => {
        const element = document.getElementById("pdf-content");

        if (!element) {
            console.error("Không tìm thấy nội dung để xuất!");
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.setFont("Times New Roman", "normal");
        const pdfWidth = 210; // A4 rộng 210mm

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("hoa_don.pdf");
    };

    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ display: 'flex', width: '90%', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 4, display: 'flex', alignItems: 'center' }}>Lọc theo ngày:
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Từ ngày"
                                value={orderDateFrom}
                                onChange={(newValue) => setOrderDateFrom(newValue)}
                                sx={{ ml: 2, mr: 2 }}
                            />
                            <DatePicker
                                label="Đến ngày"
                                value={orderDateTo}
                                onChange={(newValue) => setOrderDateTo(newValue)}
                            />
                        </LocalizationProvider>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%', }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            id="standard-textarea"
                            label="Tìm kiếm"
                            placeholder="Nhập tên người mua hoặc mã hóa đơn..."
                            multiline
                            variant="standard"
                            sx={{ width: 300 }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <FormControl style={{ width: "300px", }}>
                            <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sắp xếp theo"
                                onChange={(e) => setSort(e.target.value as string)}
                            >
                                <MenuItem value="ALL">Mặc định</MenuItem>
                                <MenuItem value="invoiceDate:desc">Ngày mới nhất</MenuItem>
                                <MenuItem value="invoiceDate:asc">Ngày cũ nhất</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', height: '100vh', mt: 2 }}>
                <TableContainer sx={{ height: '90%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead >
                            <TableRow className="sticky-header" sx={{ position: 'sticky', top: 0, zIndex: 2 }}>
                                <TableCell>Mã hóa đơn</TableCell>
                                <TableCell>Người mua</TableCell>
                                <TableCell>Ngày lập hóa đơn</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Phương thức thanh toán</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id.toString()}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }, position: 'relative',
                                        ':hover': { background: navbarHover, color: 'white', cursor: 'pointer' }
                                    }}
                                    onClick={() => fetchOrderDetails(order.order.id.toString())}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell>{order.buyerName}</TableCell>
                                    <TableCell>{new Date(order.invoiceDate).toLocaleDateString()} {new Date(order.invoiceDate).toLocaleTimeString()}</TableCell>
                                    <TableCell>{ConvertPrice(Number(order.discountPrice))}</TableCell>
                                    <TableCell>{order?.paymentMethod == "CC" ? "Thanh toán VNPay (Đã thanh toán)" : "Thanh toán tiền mặt"}</TableCell>
                                    {/* <TableCell>
                                        <Button
                                            variant="contained"
                                        >
                                            Xuất hóa đơn
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                        <Dialog
                            open={openOrderDialog}
                            onClose={() => setOpenOrderDialog(false)}
                            maxWidth="md"
                            fullWidth
                        >
                            <Box>
                                <div id="pdf-content">
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "10px" }}>
                                        <img src={logo} style={{ width: '80px', height: '80px' }} />
                                        <Typography color="red"
                                            gutterBottom
                                            style={{
                                                fontFamily: 'cursive',
                                                fontWeight: 'bold',
                                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                                fontSize: '20px'
                                            }}>
                                            Cửa hàng thời trang TOTAL TRENDSETTER
                                        </Typography>
                                    </Box>
                                    <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
                                        HÓA ĐƠN THANH TOÁN
                                    </DialogTitle>
                                    <DialogContent sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>

                                        {selectedOrder && (
                                            <Box sx={{ marginBottom: "20px" }}>
                                                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                                                    Mã hóa đơn: <span style={{ fontWeight: "bold" }}>{selectedOrder.id}</span>
                                                </Typography>
                                                <Typography sx={{ marginBottom: "10px" }}>
                                                    Người lập hóa đơn: <span style={{ fontWeight: "bold" }}>Admin</span>
                                                </Typography>
                                                <Typography sx={{ marginBottom: "10px" }}>
                                                    Tên người mua: <span style={{ fontWeight: "bold" }}>{selectedOrder.buyerName}</span>
                                                </Typography>
                                                <Typography sx={{ marginBottom: "10px" }}>
                                                    Số điện thoại: <span style={{ fontWeight: "bold" }}>{selectedOrder.phoneNumber}</span>
                                                </Typography>
                                                <Typography sx={{ marginBottom: "10px" }}>
                                                    Ngày lập hóa đơn: <span style={{ fontWeight: "bold" }}>{new Date(selectedOrder.invoiceDate).toLocaleString()}</span>
                                                </Typography>
                                                <Typography sx={{ marginBottom: "10px" }}>
                                                    Phương thức thanh toán:{" "}
                                                    <span style={{ fontWeight: "bold", color: selectedOrder?.paymentMethod === "CC" ? "#2e7d32" : "#d32f2f" }}>
                                                        {selectedOrder?.paymentMethod === "CC"
                                                            ? "Thanh toán VNPay (Đã thanh toán)"
                                                            : "Thanh toán tiền mặt"}
                                                    </span>
                                                </Typography>
                                                <Divider sx={{ marginY: "20px" }} />
                                            </Box>
                                        )}

                                        <Typography variant="h6" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
                                            Chi tiết hóa đơn:
                                        </Typography>

                                        {orderDetails.length > 0 ? (
                                            <TableContainer sx={{ marginBottom: "20px", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
                                                <Table>
                                                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                                                        <TableRow>
                                                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tên sản phẩm</TableCell>
                                                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Kích thước</TableCell>
                                                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Màu sắc</TableCell>
                                                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Số lượng</TableCell>
                                                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Đơn giá</TableCell>
                                                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Thành tiền</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {orderDetails.map((detail) => (
                                                            <TableRow key={detail.productDetail?.id} sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}>
                                                                <TableCell>{detail.productDetail?.product?.productName}</TableCell>
                                                                <TableCell>{detail.productDetail?.size.textSize || detail.productDetail?.size.numberSize}</TableCell>
                                                                <TableCell>{detail.productDetail?.color?.colorName}</TableCell>
                                                                <TableCell>{detail.quantity}</TableCell>
                                                                <TableCell>{ConvertPrice(Number(detail.priceAtCreateOrder))}</TableCell>
                                                                <TableCell>
                                                                    {ConvertPrice(Number(detail.quantity) * Number(detail.priceAtCreateOrder))}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        ) : (
                                            <Typography>Không có dữ liệu chi tiết hóa đơn.</Typography>
                                        )}

                                        <Box sx={{ textAlign: "right", marginTop: "20px", fontWeight: "bold" }}>
                                            <Typography>Tổng tiền: {ConvertPrice(Number(selectedOrder?.originalAmount))}</Typography>
                                            <Typography>Phí vận chuyển: {ConvertPrice(Number(selectedOrder?.deliveryFee))}</Typography>
                                            <Typography>Giảm giá: {ConvertPrice(Number(selectedOrder?.discountAmount))}</Typography>
                                            <Typography sx={{ fontSize: "1.2rem", color: "#d32f2f" }}>
                                                Tổng tiền thanh toán: {ConvertPrice(Number(selectedOrder?.discountPrice))}
                                            </Typography>
                                        </Box>
                                    </DialogContent>
                                </div>
                            </Box>

                            <DialogActions sx={{ padding: "10px 20px" }}>
                                <Button
                                    onClick={() => setOpenOrderDialog(false)}
                                    sx={{ backgroundColor: "#d32f2f", color: "#fff", "&:hover": { backgroundColor: "#b71c1c" } }}
                                >
                                    Đóng
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
                                    onClick={handleExportPDF}
                                >
                                    Xuất hóa đơn PDF
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Table>
                </TableContainer>
                <Box sx={{
                    display: 'flex', alignItems: 'center',
                    width: '100%', justifyContent: 'center',
                    mt: 2, mb: 2
                }}>
                    <Stack spacing={2}>
                        <Pagination count={totalPage} page={pageNoState} variant="outlined" color={"primary"} onChange={handleChange} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
};
export default Invoice;