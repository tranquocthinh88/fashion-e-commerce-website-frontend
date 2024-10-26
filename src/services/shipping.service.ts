import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ShippingDto } from "../dtos/requests/orders/shipping.dto";

export const calculateShippingFee = async (shippingDto: ShippingDto): Promise<number> => {
    try {
        const response = await requestConfig(
            `shipping/fee`,
            Method.POST,
            shippingDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}