import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { RoomChatModel } from "../models/roomchat.model";

export const getAllRoomChat = async () : Promise<ResponseSuccess<RoomChatModel[]>> => {
    try {
        const response = await requestConfig(
            `room-chats`,
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