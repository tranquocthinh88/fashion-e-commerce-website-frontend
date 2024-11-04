import { MessageChatbotModel } from "../../../models/chatbot/messages.chatbot";

export type ChatBotResponse = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
}

export type Choice = {
    index: number;
    message: MessageChatbotModel;
    logprobs: Object;
    finish_reason: string;
}

export type Usage = {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    completion_tokens_details: CompletionTokensDetails;
}

export type CompletionTokensDetails = {
    reasoning_tokens: number;
}