import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ProductPriceDto } from "../dtos/requests/admin/product-price.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProductPriceModel } from "../models/product-price.model";

export const getAllProductPricesByProductId = async (productId : string): Promise<ResponseSuccess<ProductPriceModel[]>> => {
    try {
        const response = await requestConfig(
            `productPrices/${productId}`,
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

export const createProductPrice = async (productPriceDto: ProductPriceDto): Promise<ResponseSuccess<ProductPriceModel>> => {
    try {
        console.log("Giá trị gửi: ", productPriceDto);
        
        const response = await requestConfig(
            'productPrices',
            Method.POST,
            productPriceDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteProductPrice = async (id: number): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `productPrices/${id}`,
            Method.DELETE,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateProductPrice = async (id: number, productPriceDto: ProductPriceDto): Promise<ResponseSuccess<ProductPriceModel>> => {
    try {
        const response = await requestConfig(
            `product-prices/${id}`,
            Method.PUT,
            productPriceDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}