import { Box, Button, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { bodyAdminColor, navbarHover, newOrderGradient } from "../../../theme";
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

function createData(
    id: string,
    username: string,
    purchaseDate: string,
    totalPrice: number = 0,
    paymentMethod: string
) {
    return { id, username, purchaseDate, totalPrice, paymentMethod, };
}

const rows = [
    createData('001', 'Frozen yoghurt', '4/10/2024', 100, 'tranthinh@gmail.com'),
    createData('002', 'Ice cream sandwich', '4/10/2024', 200, 'tranthinh@gmail.com'),
    createData('003', 'Eclair', '4/10/2024', 150, 'tranthinh@gmail.com'),
    createData('004', 'Cupcake', '4/10/2024', 120, 'tranthinh@gmail.com'),
    createData('005', 'Gingerbread', '4/10/2024', 180, 'tranthinh@gmail.com'),
    createData('006', 'Gingerbread', '4/10/2024', 180, 'tranthinh@gmail.com'),
    createData('007', 'Gingerbread', '4/10/2024', 180, 'tranthinh@gmail.com'),
    createData('008', 'Gingerbread', '4/10/2024', 180, 'tranthinh@gmail.com'),
    createData('009', 'Gingerbread', '4/10/2024', 180, 'tranthinh@gmail.com'),
    createData('010', 'Gingerbread', '4/10/2024', 180, 'tranthinh@gmail.com'),
];

const Invoice = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%' }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', ml: 2 }}>Hóa đơn</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Lọc theo ngày</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="standard-textarea"
                        label="Tìm kiếm"
                        placeholder="Nhập tên sản phẩm..."
                        multiline
                        variant="standard"
                        sx={{ width: 300 }}
                    />
                    <Button type="button" aria-label="search" sx={{ mt: 2 }}><SearchIcon sx={{ color: 'black' }} /></Button>
                </Box>
            </Box>
            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
                <TableContainer sx={{ background: newOrderGradient, height: 520 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead >
                            <TableRow className="sticky-header" sx={{ position: 'sticky', top: 0, zIndex: 2 }}>
                                <TableCell>Mã hóa đơn</TableCell>
                                <TableCell>Người mua</TableCell>
                                <TableCell>Ngày mua</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Phương thức thanh toán</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }, position: 'relative',
                                        ':hover': { background: navbarHover, color: 'white' }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.purchaseDate}</TableCell>
                                    <TableCell>{row.totalPrice}</TableCell>
                                    <TableCell>{row.paymentMethod}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
};
export default Invoice;