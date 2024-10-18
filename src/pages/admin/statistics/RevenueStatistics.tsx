import { Box, MenuItem, Select } from "@mui/material";
import { bodyAdminColor } from "../../../theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

const RevenueStatistics = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedDate2, setSelectedDate2] = useState<Dayjs | null>(null);
    const [filterOption, setFilterOption] = useState(); // State cho Select

    const handleSelectChange = (event : any) => {
        setFilterOption(event.target.value); // Cập nhật state khi chọn option
    };

    return (
        <Box sx={{ background: bodyAdminColor, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', ml: 2 }}>Doanh Thu</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2, mt: 1 }}>
                <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1 }}>Lọc doanh thu</Box>
                <Select
                    value={filterOption} // Giá trị của Select
                    onChange={handleSelectChange} // Hàm xử lý khi chọn
                    sx={{ width: '17%', height: 38, ml: 1 }}
                >
                    <MenuItem value="RevenueStatisticsDay">Doanh thu theo ngày</MenuItem>
                    <MenuItem value="RevenueStatisticsMonth">Doanh thu theo tháng</MenuItem>
                    <MenuItem value="RevenueStatisticsYear">Doanh thu theo năm</MenuItem>
                </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Ngày bắt đầu</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedDate2}
                            onChange={(newValue) => setSelectedDate2(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Ngày kết thúc</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
        </Box>
    );
}
export default RevenueStatistics;