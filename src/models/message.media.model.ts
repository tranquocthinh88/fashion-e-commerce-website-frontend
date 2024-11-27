import { MediaType } from "./comment.model";
import { MessageModel } from "./message.model";

export type MessageMediaModel = {
    id: string;
    path: string;
    mediaType: MediaType;
    message: MessageModel;
}