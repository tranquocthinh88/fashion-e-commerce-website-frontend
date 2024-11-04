import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ChatbotRequestDto } from "../dtos/requests/chatbot/chatbot.request.dto";
import { ChatBotResponse } from "../dtos/responses/chatbot/chatbot.response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { MessageChatbotModel } from "../models/chatbot/messages.chatbot";

export const getAllMessageByUserIdAndChatbotId = async (userId: number, chatbotId: string): 
Promise<ResponseSuccess<MessageChatbotModel[]>> => {
    try {
        const response = await requestConfig(
            `/chatbot/messages/${userId}/${chatbotId}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        )
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const sendMessage = async (chatbotRequestDto: ChatbotRequestDto, userId: number): Promise<ResponseSuccess<ChatBotResponse>> => {
    try {
        const response = await requestConfig(
            `chatbot/chat-memory/${userId}`,
            Method.POST,
            chatbotRequestDto,
            ContentType.JSON,
            true
        )
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}