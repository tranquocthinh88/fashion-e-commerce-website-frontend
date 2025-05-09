import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { UserVoucherModel } from "../models/user.voucher.model";

export const getUserVoucherByUserId = async (userId: number): Promise<ResponseSuccess<UserVoucherModel[]>> => {
    try {
        const response = await requestConfig(
            `user-vouchers/user/${userId}`,
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