import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { OrderDto, OrderUpdateDto } from "../dtos/requests/orders/order.dto";
import { PageResponse } from "../dtos/responses/page.response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { OrderDetailsModel } from "../models/order.details.model";
import { OrderModel } from "../models/order.model";

export const createOrder = async (orderDto: OrderDto): Promise<ResponseSuccess<OrderModel>> => {
    try {
        const response = await requestConfig(
            `orders/user/create`,
            Method.POST,
            orderDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export const updateOrderStatusPending = async (orderId: string): Promise<ResponseSuccess<OrderModel>> => {
    try {
        const response = await requestConfig(
            `orders/user/update/pending/${orderId}`,
            Method.PUT,
            {},
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const revokeQuantityByOrderId = async (orderId: string): Promise<ResponseSuccess<OrderModel>> => {
    try {
        const response = await requestConfig(
            `orders/user/revoke/${orderId}`,
            Method.PUT,
            {},
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getOrdersByUser = async (email: string): Promise<ResponseSuccess<OrderModel[]>> => {
    try {
        const response = await requestConfig(
            `orders/user/${email}/all`,
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

export const getOrdersForAdmin = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<OrderModel[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        console.log("Search: ", searchResult);
        
        const response = await requestConfig(
            `orders/admin?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
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

export const updateStatusForAdmin = async (orderId: string, orderUpdateDto: OrderUpdateDto): Promise<ResponseSuccess<OrderModel>> => {
    try {
        console.log("Update status: ", orderUpdateDto);
        
        const response = await requestConfig(
            `orders/admin/update/${orderId}`,
            Method.PUT,
            orderUpdateDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}