import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AccountInfoTab from '../../../components/user/user/AccountInfoTab';
import OrderManagementTab from '../../../components/user/user/OrderManagementTab';

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
    const [value, setValue] = useState(0);
    const [openAlert, setOpenAlert] = useState({ show: false, status: '', message: '' });

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const showAlert = (status: string, message: string) => {
        setOpenAlert({ show: true, status, message });
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
