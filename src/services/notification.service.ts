import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { NotificationModel } from "../models/notification.model";
import { NotificationUserModel } from "../models/notification.user.model";

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


export const getNotificationsByUserId = async (userId: number): Promise<ResponseSuccess<NotificationUserModel[]>> => {
    try {
        const response = await requestConfig(
            `notifications/notifications/user/${userId}`,
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

export const markNotificationAsRead = async ( notificationId: number, userId: number,): Promise<ResponseSuccess<NotificationUserModel[]>> => {
    try {
        const response = await requestConfig(
            `notifications/mark-as-read/${notificationId}/user/${userId}`,
            Method.PUT,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const deleteNotificationUser = async ( notificationId: number, userId: number,): Promise<ResponseSuccess<string[]>> => {
    try {
        const response = await requestConfig(
            `notifications/delete/${notificationId}/user/${userId}`,
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


export const deleteAllNotificationsUser = async ( userId: number,): Promise<ResponseSuccess<string[]>> => {
    try {
        const response = await requestConfig(
            `notifications/delete-all/user/${userId}`,
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