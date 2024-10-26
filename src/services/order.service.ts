import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { OrderDto } from "../dtos/requests/orders/order.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { OrderModel } from "../models/order.model";

export const createOrder = async (orderDto: OrderDto): Promise<ResponseSuccess<OrderModel>> => {
    try {
        console.log("Đã gọi API tạo đơn hàng");
        
        const response = await requestConfig(
            `orders/user/create`,
            Method.POST,
            orderDto,
            ContentType.JSON,
            true
        );
        console.log("API tạo đơn hàng thành công");
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}