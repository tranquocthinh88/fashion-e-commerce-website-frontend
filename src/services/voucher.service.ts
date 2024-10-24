
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { applyVoucherOrderDto, applyVoucherShipDto } from "../dtos/requests/orders/voucher.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { VoucherModel } from "../models/voucher.model";
export const getAllVouchers = async (): Promise<ResponseSuccess<VoucherModel[]>> => {
    try {
        const response = await requestConfig(
            `vouchers`,
            Method.GET,
            [],
            ContentType.JSON
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