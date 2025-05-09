import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { MessageRequestDto } from "../dtos/requests/message.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { MessageModel } from "../models/message.model";

export const send = async (messageRequestDto: MessageRequestDto): Promise<ResponseSuccess<MessageModel>> => {
    try {
        const response = await requestConfig(
            `messages/send`,
            Method.POST,
            messageRequestDto,
            ContentType.FORM_DATA,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getMessageByRoomId = async (roomId: String): Promise<ResponseSuccess<MessageModel[]>> => {
    try {
        const response = await requestConfig(
            `messages/${roomId}`,
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

