import { MessageChatbotModel } from "../../../models/chatbot/messages.chatbot";

export type ChatbotRequestDto = {
    model: string;
    chatbotId: string;
    messages: MessageChatbotModel[];
}