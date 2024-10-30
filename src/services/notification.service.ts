import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { NotificationModel } from "../models/notification.model";

export const getAllNotificationsByUserId = async (userId: number): Promise<ResponseSuccess<NotificationModel[]>> => {
    try {
        const response = await requestConfig(
            `notifications/user/${userId}`,
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