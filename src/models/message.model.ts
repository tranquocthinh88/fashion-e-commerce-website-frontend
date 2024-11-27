import { MessageType } from "./enum/message-type.enum";
import { RoomChatModel } from "./roomchat.model";

export type MessageModel = {
    id?: string;
    sender: string;
    receiver: string;
    content: string;
    messageTime: string;
    roomChat: RoomChatModel;
    path?: string;
    messageType?: MessageType;
}
