
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ProviderDto } from "../dtos/requests/admin/provider.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProviderModel } from "../models/provider.model";

export const getAllProviders = async (): Promise<ResponseSuccess<ProviderModel[]>> => {
    try {
        const response = await requestConfig(
            `providers`,
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
export const create = async (providerDto: ProviderDto): Promise<ResponseSuccess<ProviderModel>> => {
    try {
        console.log('du lieu vao : ', providerDto);
        
        const response = await requestConfig(
            `providers`,
            Method.POST,
            providerDto,
            ContentType.JSON,
            true
        );
        console.log('them provider: ',response.data); 
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const deleteProvider = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `providers/${id}`,
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
export const updateProvider = async (id: number = -1, providerDto: ProviderDto): Promise<ResponseSuccess<ProviderModel>> => {
    try {
        const response = await requestConfig(
            `providers/${id}`,
            Method.PUT,
            providerDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}