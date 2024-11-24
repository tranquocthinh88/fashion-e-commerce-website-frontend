import { Box, Grid, IconButton, MenuItem, Paper, Select, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { ArrowUpward } from "@mui/icons-material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueStatistics = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedDate2, setSelectedDate2] = useState<Dayjs | null>(null);
    const [filterOption, setFilterOption] = useState(); // State cho Select
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleSelectChange = (event: any) => {
        setFilterOption(event.target.value); // Cập nhật state khi chọn option
    };

    const handleMonthChange = (event: any) => {
        setSelectedMonth(event.target.value); // Cập nhật state khi chọn tháng
    };

    const handleYearChange = (event: any) => {
        setSelectedYear(event.target.value); // Cập nhật state khi chọn năm
    };

    const dailySalesData = {
        labels: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ],
        datasets: [
            {
                label: 'Doanh thu',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                borderWidth: 1,
                hoverBackgroundColor: '#64B5F6',
                hoverBorderColor: '#0D47A1',
                data: [24, 36, 28, 24, 25, 22, 20, 27, 21, 19, 22, 24, 27, 32, 36, 28, 24, 25, 22, 20, 27, 21, 19, 22, 24, 27, 32, 36, 28, 24, 25]
            }
        ]
    };

    return (
        <Box sx={{ backgroundColor: "white", width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 1.5 }}>
            <Box sx={{ fontSize: 30, fontWeight: 'bold', ml: 2 }}>Doanh Thu</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2, mt: 2, justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1 }}>Lọc doanh thu</Box>
                    <Select
                        value={filterOption} // Giá trị của Select
                        onChange={handleSelectChange} // Hàm xử lý khi chọn
                        sx={{ width: 250, height: 38, ml: 1 }}
                    >
                        <MenuItem value="RevenueStatisticsDay">Doanh thu theo ngày</MenuItem>
                        <MenuItem value="RevenueStatisticsMonth">Doanh thu theo tháng</MenuItem>
                        <MenuItem value="RevenueStatisticsYear">Doanh thu theo năm</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1, mr: 1 }}>Chọn tháng</Box>
                    <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        sx={{ width: 150, height: 38 }}
                        disabled={filterOption !== "RevenueStatisticsMonth"}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 30 * 5, // Giới hạn độ cao, 48px là chiều cao mỗi item
                                    width: 150,
                                },
                            },
                        }}
                    >
                        <MenuItem value="1">Tháng 1</MenuItem>
                        <MenuItem value="2">Tháng 2</MenuItem>
                        <MenuItem value="3">Tháng 3</MenuItem>
                        <MenuItem value="4">Tháng 4</MenuItem>
                        <MenuItem value="5">Tháng 5</MenuItem>
                        <MenuItem value="6">Tháng 6</MenuItem>
                        <MenuItem value="7">Tháng 7</MenuItem>
                        <MenuItem value="8">Tháng 8</MenuItem>
                        <MenuItem value="9">Tháng 9</MenuItem>
                        <MenuItem value="10">Tháng 10</MenuItem>
                        <MenuItem value="11">Tháng 11</MenuItem>
                        <MenuItem value="12">Tháng 12</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 1, mr: 1 }}>Chọn năm</Box>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        sx={{ width: 150, height: 38 }}
                        disabled={filterOption !== "RevenueStatisticsYear"}
                    >
                        <MenuItem value="2022">2022</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Ngày bắt đầu</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedDate2}
                            onChange={(newValue) => setSelectedDate2(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                            disabled={filterOption !== "RevenueStatisticsDay"}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ fontSize: 17, fontWeight: 'bold', mt: 2 }}>Ngày kết thúc</Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Chọn ngày"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{ ml: 2, width: '50%' }}
                            disabled={filterOption !== "RevenueStatisticsDay"}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Grid container spacing={3} justifyContent="center" alignItems="center" marginTop={2}>
                {/* Summary Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6">Tổng doanh thu</Typography>
                        <Typography variant="h4" color="primary">
                            20,200,000 đ
                        </Typography>
                        <Typography variant="subtitle1">2 hóa đơn</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6">Trả hàng</Typography>
                        <Typography variant="h4" color="error">
                            0
                        </Typography>
                        <Typography variant="subtitle1">0 phiếu</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color="success">
                                    <ArrowUpward />
                                </IconButton>
                                <Box ml={1} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">So với hôm qua</Typography>
                                    <Typography variant="h4" color="success">
                                        +4.94%
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton color="success">
                                    <ArrowUpward />
                                </IconButton>
                                <Box ml={1} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">So với cùng kỳ tháng trước</Typography>
                                    <Typography variant="h4" color="success">
                                        +45.37%
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Revenue Chart Section */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Doanh thu theo ngày
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 1000, height: 'auto' }}>
                            <Bar
                                data={dailySalesData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'bottom',
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default RevenueStatistics;