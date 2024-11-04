import { ConversationModel } from "./conversation";

export type MessageChatbotModel = {
    id?: number;
    conversation: ConversationModel;
    role: string;
    content: string;
    timestamp?: Date;
}