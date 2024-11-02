import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AccountInfoTab from '../../../components/user/user/AccountInfoTab';
import OrderManagementTab from '../../../components/user/user/OrderManagementTab';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TabPanel = (props: { children?: React.ReactNode, index: number, value: number }) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const UserDetail = () => {
    const { email } = useParams<{ email: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState({ show: false, status: '', message: '' });

    const showAlert = (status: string, message: string) => {
        setOpenAlert({ show: true, status, message });
    };

    useEffect(() => {
        if (location.pathname.includes('/info')) setValue(0);
        else if (location.pathname.includes('/orders')) setValue(1);
    }, [location.pathname]);

    // Điều chỉnh URL khi tab thay đổi
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(newValue === 0 ? `/user/${email}/info` : `/user/${email}/orders`);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
                <Tab label="Quản lý đơn hàng" {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <AccountInfoTab showAlert={showAlert} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <OrderManagementTab />
            </TabPanel>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert.show}
                autoHideDuration={3000}
                onClose={() => setOpenAlert({ show: false, status: '', message: '' })}
            >
                <Alert severity={openAlert.status === 'success' ? 'success' : 'error'} variant="filled">
                    {openAlert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserDetail;
