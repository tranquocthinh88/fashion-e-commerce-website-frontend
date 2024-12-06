import { Box, FormControl, MenuItem, Select, TextField, InputLabel, Stack, Pagination } from "@mui/material";
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
import { OrderModel } from "../../../models/order.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getOrdersForAdmin, updateStatusForAdmin } from "../../../services/order.service";
import { ConvertPrice } from "../../../utils/convert.price";
import { PageResponse } from "../../../dtos/responses/page.response";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderStatus } from "../../../models/order.model";
import DialogOrderDetails from "../../../components/user/dialogs/DialogOrderDetails";


const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.NOT_PROCESSED_YET]: "Giao dịch hủy bỏ",
    [OrderStatus.PENDING]: "Đang chờ xử lý",
    [OrderStatus.PROCESSING]: "Đã xác nhận đơn hàng", // ~ Đã xác nhận
    [OrderStatus.SHIPPING]: "Đang vận chuyển",
    [OrderStatus.DELIVERED]: "Đã giao",
    [OrderStatus.RECEIVED]: "Đã nhận",
    [OrderStatus.CANCELLED]: "Đã hủy"
};

const Invoice = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<OrderModel[]>([]);
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
    const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const searchParams: Array<{ field: string; operator: string; value: string }> = [];
            if (orderDateFrom) {
                searchParams.push({
                    field: 'orderDate',
                    operator: '>=',
                    value: orderDateFrom.format('YYYY-MM-DD'),
                });
            }

            if (orderDateTo) {
                searchParams.push({
                    field: 'orderDate',
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
            const response: ResponseSuccess<PageResponse<OrderModel[]>> = await getOrdersForAdmin(pageNoState, 10, searchParams,
                sort ? [{ field: sort.split(':')[0], order: sort.split(':')[1] }] : []);

            console.log(response.data);
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

    const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
        try {
            const response = await updateStatusForAdmin(orderId, { orderStatus: newStatus });
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

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


    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ display: 'flex', width: '90%', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2, display: 'flex', }}>Lọc theo ngày:
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Từ ngày"
                                value={orderDateFrom}
                                onChange={(newValue) => setOrderDateFrom(newValue)}
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
                                <MenuItem value="orderDate:desc">Ngày mới nhất</MenuItem>
                                <MenuItem value="orderDate:asc">Ngày cũ nhất</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl style={{ width: "300px", }}>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select
                                label="Trạng thái"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="">Tất cả</MenuItem>
                                <MenuItem value="PENDING">Đang chờ xử lý</MenuItem>
                                <MenuItem value="PROCESSING">Đã được xác nhận</MenuItem>
                                <MenuItem value="SHIPPING">Đang vận chuyển</MenuItem>
                                <MenuItem value="DELIVERED">Đã giao</MenuItem>
                                <MenuItem value="RECEIVED">Đã nhận</MenuItem>
                                <MenuItem value="CANCELLED">Đã hủy</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            id="standard-textarea"
                            label="Tìm kiếm"
                            placeholder="Nhập tên người mua..."
                            multiline
                            variant="standard"
                            sx={{ width: 300 }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
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
                                <TableCell>Ngày mua</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Phương thức thanh toán</TableCell>
                                <TableCell>Trạng thái hóa đơn</TableCell>
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
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setOpenOrderDialog(true);
                                        // navigate(`/order-details/${order.id}`, {
                                        //     state: {
                                        //         pageNoState,
                                        //         sort,
                                        //         search,
                                        //         status,
                                        //         orderDateFrom: orderDateFrom ? orderDateFrom.format('YYYY-MM-DD') : null,
                                        //         orderDateTo: orderDateTo ? orderDateTo.format('YYYY-MM-DD') : null,
                                        //     }
                                        // });
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell>{order.buyerName}</TableCell>
                                    <TableCell>{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}</TableCell>
                                    <TableCell>{ConvertPrice(Number(order.discountPrice))}</TableCell>
                                    <TableCell>{order?.paymentMethod == "CC" ? "Thanh toán VNPay" : "Thanh toán tiền mặt"}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={order.status}
                                            onChange={(e) => {
                                                const newStatus = e.target.value as OrderStatus;
                                                handleUpdateStatus(order.id.toString(), newStatus);
                                            }}

                                            disabled={(order.status as OrderStatus) === OrderStatus.NOT_PROCESSED_YET ||
                                                (order.status as OrderStatus) === OrderStatus.CANCELLED
                                            }
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        >
                                            {Object.entries(orderStatusMap)
                                                .map(([key, label]) => (
                                                    <MenuItem key={key} value={key}
                                                        onMouseDown={(e) => {
                                                            e.stopPropagation();  // Ngăn sự kiện MouseDown bọt lên thẻ Card
                                                        }}
                                                        disabled={key === OrderStatus.NOT_PROCESSED_YET}
                                                    >
                                                        {label}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {openOrderDialog && selectedOrder && (
                            <DialogOrderDetails
                                open={openOrderDialog}
                                onClose={() => setOpenOrderDialog(false)}
                                order={selectedOrder}
                            />
                        )}
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