
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { applyVoucherOrderDto, applyVoucherShipDto, voucherDto } from "../dtos/requests/orders/voucher.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { VoucherModel } from "../models/voucher.model";
export const getAllVouchers = async (): Promise<ResponseSuccess<VoucherModel[]>> => {
    try {      
        const response = await requestConfig(
            `vouchers`,
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

export const applyVoucherOrder = async (applyVoucherOrderDto: applyVoucherOrderDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `vouchers/apply/for-order`,
            Method.POST,
            applyVoucherOrderDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}


export const applyVoucherShip = async (applyVoucherShipDto: applyVoucherShipDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `vouchers/apply/for-delivery`,
            Method.POST,
            applyVoucherShipDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export const createVoucher = async (voucherDto: voucherDto): Promise<ResponseSuccess<VoucherModel>> => {
    try {
        console.log('dữ liệu vào: ',voucherDto );
        const response = await requestConfig(
            `vouchers`,
            Method.POST,
            voucherDto,
            ContentType.JSON,
            true
        );
        console.log('dữ liệu ra: ',response.data);
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteVoucher = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `vouchers/${id}`,
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