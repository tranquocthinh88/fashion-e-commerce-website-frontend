import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { BrandDto } from "../dtos/requests/admin/brand.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { BrandModel } from "../models/brand.model";

export const getAllBrands = async (): Promise<ResponseSuccess<BrandModel[]>> => {
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

export const createBrand = async (brandDto: BrandDto): Promise<ResponseSuccess<BrandModel>> => {
    try {
        const response = await requestConfig(
            `brands`,
            Method.POST,
            brandDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateBrand = async (id: string, brandDto : BrandDto): Promise<ResponseSuccess<BrandModel>> => {
    try {
        const response = await requestConfig(
            `brands/${id}`,
            Method.PUT,
            brandDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteBrand = async (id: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `brands/${id}`,
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