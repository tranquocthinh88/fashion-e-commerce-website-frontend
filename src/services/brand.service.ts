import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { BrandModel } from "../models/brand.model";

export const getAllBrands = async (): Promise<ResponseSuccess<BrandModel[]>> => {
    console.log("đã vào");
    
    try {
        const response = await requestConfig(
            `brands`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}