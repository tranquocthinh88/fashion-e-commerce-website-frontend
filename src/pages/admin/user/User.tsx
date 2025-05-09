import { Box, Button, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { bodyAdminColor, newOrderGradient } from "../../../theme";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { UserModel } from "../../../models/user.model";
import { getAllUsers } from "../../../services/user.service";
import { getOrdersByUser } from "../../../services/order.service";
import { OrderModel } from "../../../models/order.model";
import { ConvertPrice } from "../../../utils/convert.price";
import { useNavigate } from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [userInvoices, setUserInvoices] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.log("Failed to fetch users", users);
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, []);
    const fetchUsers = async (keyword: string = "") => {
        try {
            const trimmedKeyword = keyword.trim();
            const response = await getAllUsers();
            const filteredUsers = response.data
                .filter(user => user.role === 'ROLE_USER') // Lọc người dùng có vai trò là "user"
                .filter(user => user.username.toLowerCase().includes(trimmedKeyword.toLowerCase()))
                .map((user, index) => ({ ...user, id: (index + 1) })); // Cập nhật ID của người dùng
            const userWithInvoice = await Promise.all(
                filteredUsers.map(async (user) => {
                    try {
                        const invoices = await getOrdersByUser(user.email);
                        const totalOrders = invoices.data.length; // Tổng số hóa đơn
                        const totalAmount = invoices.data.reduce((sum: number, invoice: OrderModel) => sum + Number(invoice.discountPrice), 0); // Tổng tiền hóa đơn
                        return {
                            ...user,
                            totalOrders,
                            totalAmount,
                        };
                    } catch (error) {
                        console.error(`Failed to fetch invoices for user: ${user.username}`, error);
                        return { ...user, totalOrders: 0, totalAmount: 0 };
                    }
                })
            );

            setUsers(filteredUsers);
            setUserInvoices(userWithInvoice);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword.trim() === "") {
            fetchUsers();
        }
    };

    const handleSearchClick = () => {
        fetchUsers(searchKeyword);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearchClick();
        }
    };

    useEffect(() => {
        document.title = "Quản lý người dùng - Admin";
    }, []);

    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%' }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', ml: 2 }}>Người dùng</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TextField
                    id="standard-textarea"
                    label="Tìm kiếm"
                    placeholder="Nhập tên người dùng..."
                    multiline
                    variant="standard"
                    sx={{ width: 300 }}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <Button type="button" aria-label="search" sx={{ mt: 2 }} onClick={handleSearchClick}>
                    <SearchIcon sx={{ color: 'black' }} />
                </Button>
            </Box>
            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
                <TableContainer sx={{ background: newOrderGradient, height: 520 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead >
                            <TableRow className="sticky-header" sx={{ position: 'sticky', top: 0, zIndex: 2 }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Ngày đăng kí</TableCell>
                                <TableCell>Tổng hóa đơn</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userInvoices.map((data) => (
                                <TableRow key={data.id} sx={{
                                    ':hover': {
                                        background: 'rgba(0, 0, 0, 0.14)',
                                        cursor: 'pointer',
                                    }
                                }} onClick={() => navigate(`/admin/users/user-detail/${data.email}`)}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.username}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.phone}</TableCell>
                                    <TableCell>{new Date(data.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{data.totalOrders}</TableCell>
                                    <TableCell>{ConvertPrice(data.totalAmount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
};
export default User;