export type MessageRequestDto = {
    sender: string;
    receiver: string;
    content?: string;
    mediaPath?: File;
    messageTime: Date;
}