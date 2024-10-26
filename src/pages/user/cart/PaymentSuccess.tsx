import { useLocation } from 'react-router-dom';
import { getPaymentSuccess } from '../../../services/payment.service';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const queryParams: Record<string, string> = {};
        new URLSearchParams(location.search).forEach((value, key) => {
            queryParams[key] = value;
        });
        const fetchPaymentStatus = async () => {
            console.log("Query params ở đây: ", queryParams);
            
            try {
                const result = await getPaymentSuccess(queryParams);
                console.log("Kết quả thanh toán: ", result);
                
                if (result.status === 200) {
                    setPaymentStatus(result.data); // "Thanh toán thành công"
                } else {
                    setPaymentStatus(`Thanh toán thất bại: ${result.message}`);
                }
            } catch (error) {
                setPaymentStatus('Đã xảy ra lỗi trong quá trình thanh toán');
                console.error(error);
            } finally {
                setLoading(false); // Kết thúc quá trình loading
            }
        };

        fetchPaymentStatus();
    }, [location.search]);

    if (loading) {
        return <div>Đang kiểm tra trạng thái thanh toán...</div>;
    }

    return (
        <div>
            <h1>{paymentStatus}</h1>
            {paymentStatus.includes("thành công") && <p>Thanh toán của bạn đã được xử lý thành công.</p>}
            {paymentStatus.includes("thất bại") && <p>Đã có vấn đề xảy ra với thanh toán của bạn. Vui lòng thử lại.</p>}
        </div>
    );
};

export default PaymentSuccess;
