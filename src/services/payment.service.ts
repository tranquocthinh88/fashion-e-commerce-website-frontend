import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";

export const getVnpPaymentUrl = async (amount: number, bankCode: string, orderId: String) : Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `payments/vnp?amount=${amount}&bankCode=${bankCode}&orderId=${orderId}`,
            Method.GET,
            [],
            ContentType.JSON, 
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getPaymentSuccess = async (queryParams: Record<string, string>): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `payments/payment-success`,
            Method.POST,
            queryParams,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}