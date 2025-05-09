import { NotificationModel } from "./notification.model";
import { UserModel } from "./user.model"

export type NotificationUserModel = {
    notification: NotificationModel;
    user: UserModel;
    isRead: boolean;
}