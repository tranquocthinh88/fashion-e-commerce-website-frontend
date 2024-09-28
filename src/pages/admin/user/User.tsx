import { Box, Button, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { bodyAdminColor, newOrderGradient } from "../../../theme";
import SearchIcon from '@mui/icons-material/Search';

function createData(
    id: string,
    username: string,
    email: string,
    totalPrice: number = 0
) {
    return { id, username, email, totalPrice };
}

const rows = [
    createData('001', 'Frozen yoghurt', 'tranthinh@gmail.com'),
    createData('002', 'Ice cream sandwich', 'tranthinh@gmail.com'),
    createData('003', 'Eclair', 'tranthinh@gmail.com'),
    createData('004', 'Cupcake', 'tranthinh@gmail.com'),
    createData('005', 'Gingerbread', 'tranthinh@gmail.com'),
    createData('006', 'Gingerbread', 'tranthinh@gmail.com'),
    createData('007', 'Gingerbread', 'tranthinh@gmail.com'),
    createData('008', 'Gingerbread', 'tranthinh@gmail.com'),
    createData('009', 'Gingerbread', 'tranthinh@gmail.com'),
    createData('010', 'Gingerbread', 'tranthinh@gmail.com'),
];

const User = () => {
    
    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%' }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', ml: 2 }}>Users</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TextField
                    id="standard-textarea"
                    label="Tìm kiếm"
                    placeholder="Nhập tên người dùng..."
                    multiline
                    variant="standard"
                    sx={{ width: 300 }}
                />
                <Button type="button" aria-label="search" sx={{ mt: 2 }}><SearchIcon sx={{ color: 'black' }} /></Button>
            </Box>
            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
                <TableContainer sx={{ background: newOrderGradient, height: 520 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead >
                            <TableRow className="sticky-header" sx={{ position: 'sticky', top: 0, zIndex: 2}}>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Total Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, position: 'relative' }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.totalPrice}</TableCell>
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