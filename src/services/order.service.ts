import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { OrderDto } from "../dtos/requests/orders/order.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { OrderDetailsModel } from "../models/order.details.model";
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

export const updateOrderStatusPending = async (orderId: string): Promise<ResponseSuccess<OrderModel>> => {
    try {
        console.log("Đã gọi API cập nhật trạng thái đơn hàng");
        
        const response = await requestConfig(
            `orders/user/update/pending/${orderId}`,
            Method.PUT,
            {},
            ContentType.JSON,
            true
        );
        console.log("API cập nhật trạng thái đơn hàng thành công");
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const revokeQuantityByOrderId = async (orderId: string): Promise<ResponseSuccess<OrderModel>> => {
    try {
        console.log("Đã gọi API hủy số lượng sản phẩm");
        
        const response = await requestConfig(
            `orders/user/revoke/${orderId}`,
            Method.PUT,
            {},
            ContentType.JSON,
            true
        );
        console.log("API hủy số lượng sản phẩm thành công");
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getOrdersByUser = async (email: string): Promise<ResponseSuccess<OrderModel[]>> => {
    try {
        console.log("Đã gọi API lấy danh sách đơn hàng");
        
        const response = await requestConfig(
            `orders/user/${email}/all`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        console.log("API lấy danh sách đơn hàng thành công");
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const getOrderDetailsByOrderId = async (orderId: string): Promise<ResponseSuccess<OrderDetailsModel[]>> => {
    try {
        const response = await requestConfig(
            `order-details/${orderId}`,
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

export const getOrderById = async (orderId: string): Promise<ResponseSuccess<OrderModel>> => {
    try {
        const response = await requestConfig(
            `orders/user/${orderId}`,
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