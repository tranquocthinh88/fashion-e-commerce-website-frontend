
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { SizeDto } from "../dtos/requests/admin/size.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { SizeModel } from "../models/size.model";
export const getAllSizes = async (): Promise<ResponseSuccess<SizeModel[]>> => {
    try {
        const response = await requestConfig(
            'sizes',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createSize = async (sizeDto: SizeDto): Promise<ResponseSuccess<SizeDto>> => {
    try {
        const response = await requestConfig(
            `sizes`,
            Method.POST,
            sizeDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteSize = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `sizes/${id}`,
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