export type MessageRequestDto = {
    sender: string;
    receiver: string;
    content: string;
    messageTime: string;
    roomChatId: number;
}