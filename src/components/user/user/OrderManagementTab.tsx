import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { OrderModel } from "../../../models/order.model";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../../../services/user.service";
import { UserModel } from "../../../models/user.model";
import { getOrdersByUser } from "../../../services/order.service";
import OrderItem from "../order/OrderItem";
import { OrderStatus } from "../../../models/enum/order.status";

const OrderManagementTab = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const user: UserModel | null = getUserFromLocalStorage();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");

  const handleStatusChange = (event: SelectChangeEvent<OrderStatus>) => {
    setStatusFilter(event.target.value as OrderStatus);
  };

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  useEffect(() => {
    (async () => {
      const response = await getOrdersByUser(user?.email ?? "");
      setOrders(response.data);
      console.log("Orders: ", response.data);
    })();
  }, [handleStatusChange]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Danh sách đơn hàng</Typography>
        <FormControl variant="standard" sx={{ minWidth: 200, marginTop: 2, ml: 2 }}>
          <InputLabel id="status-filter-label">Trạng thái đơn hàng</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={handleStatusChange}
            label="Trạng thái đơn hàng"
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value={OrderStatus.NOT_PROCESSED_YET}>
              Giao dịch hủy bỏ
            </MenuItem>
            <MenuItem value={OrderStatus.PENDING}>Đang chờ xử lý</MenuItem>
            <MenuItem value={OrderStatus.PROCESSING}>
              Đã xác nhận đơn hàng
            </MenuItem>
            <MenuItem value={OrderStatus.SHIPPING}>Đang vận chuyển</MenuItem>
            <MenuItem value={OrderStatus.DELIVERED}>Đã giao</MenuItem>
            <MenuItem value={OrderStatus.RECEIVED}>Đã nhận</MenuItem>
            <MenuItem value={OrderStatus.CANCELLED}>Đã hủy</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        {filteredOrders.length === 0 ? (
          <Typography>Chưa có đơn hàng nào!</Typography>
        ) : (
          <TableContainer>
            <Table>
              {/* Tiêu đề bảng */}
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Phương thức thanh toán</TableCell>
                  <TableCell>Thành tiền</TableCell>
                  <TableCell>Ngày giao dự kiến</TableCell>
                  <TableCell colSpan={2}>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Hiển thị các đơn hàng */}
                {filteredOrders.map((order) => (
                  <OrderItem key={order.id as React.Key} item={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default OrderManagementTab;
