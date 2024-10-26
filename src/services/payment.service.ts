import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";

export const getVnpPaymentUrl = async (amount: number, bankCode: string = "NCB") : Promise<ResponseSuccess<string>> => {
    try {
        console.log("Đã vào Amount: ", amount);
        
        const response = await requestConfig(
            `payments/vnp?amount=${amount}&bankCode=${bankCode}`,
            Method.GET,
            [],
            ContentType.JSON, 
            true
        );
        console.log("Kết quả: ", response.data);
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getPaymentSuccess = async (queryParams: Record<string, string>): Promise<ResponseSuccess<string>> => {
    try {
        console.log("Query params: ", queryParams);
        
        const response = await requestConfig(
            `payments/payment-success`,
            Method.POST,
            queryParams,
            ContentType.JSON,
            true
        );
        console.log("Kết quả thanh toán ở service: ", response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}