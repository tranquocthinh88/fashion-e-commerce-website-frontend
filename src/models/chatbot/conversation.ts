import { MessageChatbotModel } from "./messages.chatbot";

export type ConversationModel = {
    userId: number;
    chatbotId: string;
    messages: MessageChatbotModel[];
}