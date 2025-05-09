
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ColorDto } from "../dtos/requests/admin/color.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ColorModel } from "../models/color.model";

export const getAllColors = async (): Promise<ResponseSuccess<ColorModel[]>> => {
    try {
        const response = await requestConfig(
            'colors',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createColor = async (colorDto: ColorDto): Promise<ResponseSuccess<ColorModel>> => {
    try {
        const response = await requestConfig(
            `colors`,
            Method.POST,
            colorDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteColor = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `colors/${id}`,
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